import { Component, OnInit, Input } from '@angular/core';
import * as p5 from 'p5';
import { Spice } from '../spice';
import { SERVER } from '../server';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Preview {
  safeUrl: SafeUrl;
  data: string;
}

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit {
  @Input() public spices: Spice[];

  public rowCount: number;
  public colCount: number;
  public leftPadding: number;
  public topPadding: number;
  public circleLeftDistance: number;
  public circleTopDistance: number;
  public circleDiameter: number;
  public imageSize: number;
  public width: number;
  public height: number;
  public indexOffset: number;
  public ready: boolean;
  public mask: p5.Image;
  public loading: boolean;
  private p5: p5;
  public previewData: Preview[];
  public currentPage: number;
  
  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.spices = [];
    this.ready = false;
    this.rowCount = 6;
    this.colCount = 4;
    this.indexOffset = 0;
    this.leftPadding = 90;
    this.topPadding = 94.5;
    this.circleLeftDistance = 144;
    this.circleTopDistance = 120;
    this.circleDiameter = 117;
    this.imageSize = 40;
    this.width = 612;
    this.height = 792;
    this.loading = false;
    this.currentPage = 0;
    this.previewData = [];
  }

  ngOnInit() {
    this.p5 = new p5((p5: p5) => this.sketch(p5), document.getElementById("preview-canvas"));
    this.getMask();
  }

  public changePage(change: number): void {
    this.currentPage += change;
    if (this.currentPage === this.numberOfPages) {
      this.currentPage = this.numberOfPages;
    }
    if (this.currentPage < 0) {
      this.currentPage = 0;
    }
  }
  
  public get max(): number {
    return this.colCount * this.rowCount;
  }

  public get numberOfPages(): number {
    return Math.ceil((this.spices.length + this.indexOffset) / this.max);
  }

  public async generate(): Promise<void> {
    let page: number = 0;
    this.loading = true;

    while (page < this.numberOfPages) {
      const index: number = page === 0 ? -1 : this.max - this.indexOffset + (page - 1) * this.max;
      const spices: Spice[] = page === 0 ?
                              this.spices.slice(0, this.max - this.indexOffset) :
                              this.spices.slice(index, index + this.max);
      const startIndex: number = page === 0 ? this.indexOffset : 0;
      this.previewData[page] = await this.generatePage(spices, startIndex);
      page++;
    }

    this.loading = false;
    this.ready = true;
  }

  public save(page: number): void {
    this.p5.loadImage(this.previewData[page].data, (image: p5.Image) => {
      this.p5.save(image, "epice-" + page + ".png");
    })
  }

  public async generatePage(spices: Spice[], startIndex: number): Promise<Preview> {
    this.p5.clear();
    await this.drawSpices(spices, startIndex);
    return this.getPreview();
  }

  public async getPreview(): Promise<Preview> {
    return new Promise((resolve) => {
      this.p5.saveFrames('f', 'png', 1, 1, (data: any[]) => {
        resolve({
          safeUrl: this.sanitizer.bypassSecurityTrustUrl(data[0].imageData),
          data: data[0].imageData,
        });
      });
    });
  }

  private async getMask(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.p5.loadImage(
        `${SERVER}mask`,
        (image: p5.Image) => {
          this.mask = image;
          resolve();
        },
        () => reject(),
      )
    });
  }

  private async drawSpices(spices: Spice[], startIndex: number): Promise<void> {
    let index: number = 0;
    while (index < spices.length) {
      await this.drawSpice(spices[index], startIndex + index);
      index++;
    }
  }

  private sketch(p5: p5): void {
    p5.setup = () => {
      p5.createCanvas(this.width, this.height);
    }
  }

  private async getRoundImage(label: string): Promise<p5.Image> {
    return new Promise((resolve, reject) => {
      this.p5.loadImage(
        `${SERVER}spice/image/content/${label}`,
        (image: p5.Image) => {
          image.mask(this.mask);
          resolve(image);
        },
        () => reject(),
      )
    });
  }

  private getPosition(index: number): {x: number, y: number} {
    return {
      x: (index % this.colCount) * this.circleLeftDistance + this.leftPadding,
      y: Math.floor(index / this.colCount) * this.circleTopDistance + this.topPadding,
    };
  }

  private async drawSpice(spice: Spice, index: number): Promise<void> {
    const {x, y} = this.getPosition(index);
    this.p5.fill(spice.type.color);
    this.p5.ellipseMode(this.p5.CENTER);
    this.p5.noStroke();
    this.p5.ellipse(x, y, this.circleDiameter);

    this.p5.fill(255);
    this.p5.rectMode(this.p5.CENTER);
    this.p5.textSize(10);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text(spice.label, x, y - this.circleDiameter / 5, this.circleDiameter - 30, this.circleDiameter - 30);

    this.p5.imageMode(this.p5.CENTER);
    const image: p5.Image = await this.getRoundImage(spice.label);
    this.p5.image(image, x, y + this.circleDiameter / 4, this.imageSize, this.imageSize);
  }
}
