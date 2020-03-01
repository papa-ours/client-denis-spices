import { Injectable } from '@angular/core';
import * as p5 from 'p5';
import { Spice } from './spice';
import { SERVER } from './server';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

interface Preview {
  safeUrl: SafeUrl;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class CircleGeneratorService {
  public rowCount: number;
  public colCount: number;
  public leftPadding: number;
  public topPadding: number;
  public circleLeftDistance: number;
  public circleTopDistance: number;
  public itemWidth: number;
  public itemHeight: number;
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
  public shape: number;
  public spices: Spice[];
  
  constructor(
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
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
    this.itemWidth = 117;
    this.itemHeight = 117;
    this.imageSize = 40;
    this.width = 612;
    this.height = 792;
    this.loading = false;
    this.currentPage = 0;
    this.previewData = [];
    this.qualityWarning = false;
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

  public async generate(spices: Spice[], clientP5: p5, offset: number): Promise<Preview[]> {
    this.indexOffset = offset;
    this.p5 = clientP5;
    this.spices = spices;
    await this.getMask();
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
    
    return this.previewData;
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

  private async getRoundImage(_id: string): Promise<p5.Image> {
    return new Promise((resolve, reject) => {
      this.p5.loadImage(
        `${SERVER}spice/image/content/${_id}`,
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
    this.p5.ellipse(pos.x, pos.y, this.itemWidth, this.itemHeight);
  }

  private async drawImage(pos: {x: number, y: number}, _id: string): Promise<void> {
    this.p5.imageMode(this.p5.CENTER);
    try {
      this.p5.fill(255);
      const imageY: number = pos.y + this.itemHeight / 4;
      this.p5.ellipse(pos.x, imageY, this.imageSize, this.imageSize);
      const image: p5.Image = await this.getRoundImage(_id);
      this.p5.image(image, pos.x, imageY, this.imageSize, this.imageSize);
    } catch {
      throw Error();
    }
  }

  private async drawSpicyLevel(pos: {x: number, y: number}, level: number | undefined): Promise<void> {
    return new Promise((resolve) => {
      if (level !== undefined) {
        this.p5.fill(255);
        this.p5.loadImage("../assets/icon/pepper-hot-solid.svg", (image: p5.Image) => {
          this.p5.image(image, pos.x + 5, pos.y - (this.itemHeight / 2 - 15), 10, 10);
          this.p5.textSize(10);
          this.p5.text(level.toString(), pos.x - 8, pos.y - (this.itemHeight / 2 - 15));
          resolve();
        });
      }
    });
  }

  private async drawLabel(pos: {x: number, y: number}, label: string, imageAdded: boolean): Promise<void> {
    this.p5.fill(255);
    this.p5.rectMode(this.p5.CENTER);
    this.p5.textSize(label.length > 30 ? 10 : label.length > 20 ? 12 : 14);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    const textYPosition: number = imageAdded ? pos.y - this.itemHeight / 6 : pos.y;
    this.p5.text(label, pos.x, textYPosition, this.itemWidth - 30, this.itemHeight - 30);
  }

  private async drawSpice(spice: Spice, index: number): Promise<void> {
    const pos: {x: number, y: number} = this.getPosition(index);
    await this.drawEllipse(pos, spice.type.color); 
    let imageAdded: boolean = true;
    try {
      await this.drawImage(pos, spice._id);   
    } catch {
      imageAdded = false;
    }
    this.drawLabel(pos, spice.label, imageAdded);
    if (spice.type.value === 6) {
      await this.drawSpicyLevel(pos, spice.spicyLevel);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
