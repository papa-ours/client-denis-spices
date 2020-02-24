import { Component, OnInit, Input } from '@angular/core';
import * as p5 from 'p5';
import { Spice } from '../spice';
import { SERVER } from '../server';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController, Platform } from '@ionic/angular';
import { SpiceService } from '../spice.service';

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
  public qualityWarning: boolean;
  
  constructor(
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private service: SpiceService,
    private platform: Platform,
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
    this.qualityWarning = false;
  }

  ngOnInit() {
    this.p5 = new p5((p5: p5) => this.sketch(p5), document.getElementById("preview-canvas"));

    this.platform.ready().then(() => {
      if (this.platform.is("desktop")) {
        this.p5.pixelDensity(6);
      } else {
        this.qualityWarning = true;
      }
    });
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

  private async drawSpices(spices: Spice[], startIndex: number): Promise<void[]> {
    return Promise.all(
      spices.map((spice: Spice, index: number) => this.drawSpice(spice, startIndex + index)),
    );
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
      );
    });
  }

  private getPosition(index: number): {x: number, y: number} {
    return {
      x: (index % this.colCount) * this.circleLeftDistance + this.leftPadding,
      y: Math.floor(index / this.colCount) * this.circleTopDistance + this.topPadding,
    };
  }

  private async drawEllipse(pos: {x: number, y: number}, color: string): Promise<void> {
    this.p5.fill(color);
    this.p5.ellipseMode(this.p5.CENTER);
    this.p5.noStroke();
    this.p5.ellipse(pos.x, pos.y, this.circleDiameter);
  }

  private async drawImage(pos: {x: number, y: number}, label: string): Promise<void> {
    this.p5.imageMode(this.p5.CENTER);
    try {
      const image: p5.Image = await this.getRoundImage(label);
      this.p5.image(image, pos.x, pos.y + this.circleDiameter / 4, this.imageSize, this.imageSize);
    } catch {
      throw Error();
    }
  }

  private async drawLabel(pos: {x: number, y: number}, label: string, imageAdded: boolean): Promise<void> {
    this.p5.fill(255);
    this.p5.rectMode(this.p5.CENTER);
    this.p5.textSize(label.length > 30 ? 10 : label.length > 20 ? 12 : 14);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    const textYPosition: number = imageAdded ? pos.y - this.circleDiameter / 6 : pos.y;
    this.p5.text(label, pos.x, textYPosition, this.circleDiameter - 30, this.circleDiameter - 30);
  }

  private async drawSpice(spice: Spice, index: number): Promise<void> {
    const pos: {x: number, y: number} = this.getPosition(index);
    await this.drawEllipse(pos, spice.type.color); 
    let imageAdded: boolean = true;
    try {
      await this.drawImage(pos, spice.label);   
    } catch {
      imageAdded = false;
    }
    this.drawLabel(pos, spice.label, imageAdded);
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
