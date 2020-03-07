import { Component, OnInit, Input } from '@angular/core';
import * as p5 from 'p5';
import { Spice } from '../spice';
import { SERVER } from '../server';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController, Platform } from '@ionic/angular';
import { CircleGeneratorService } from '../circle-generator.service';
import { RectangleGeneratorService } from '../rectangle-generator.service';
import { Preview } from '../preview';
import { SpiceService } from '../spice.service';

enum Shape {
  RECT = "rect",
  CIRCLE = "circle",
}

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit {
  @Input() public spices: Spice[];

  public width: number;
  public height: number;
  public indexOffset: number;
  public ready: boolean;
  public font: p5.Font;
  public loading: boolean;
  private p5: p5;
  public previewData: Preview[];
  public currentPage: number;
  public qualityWarning: boolean;
  public shape: Shape;
  
  constructor(
    private modalController: ModalController,
    private circleGenerator: CircleGeneratorService,
    private rectangleGenerator: RectangleGeneratorService,
    private platform: Platform,
    private service: SpiceService,
  ) {
    this.spices = [];
    this.ready = false;
    this.indexOffset = 0;
    this.loading = false;
    this.width = 612;
    this.height = 792;
    this.currentPage = 0;
    this.previewData = [];
    this.qualityWarning = false;
    this.shape = Shape.CIRCLE;
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
  
  public get numberOfPages(): number {
    return this.previewData.length;
  }

  public async generate(): Promise<void> {
    this.currentPage = 0;
    this.loading = true;
    if (this.shape === Shape.CIRCLE) {
      this.previewData = await this.circleGenerator.generate(this.spices, this.p5, this.indexOffset);
    } else if (this.shape === Shape.RECT) {
      this.previewData = await this.rectangleGenerator.generate(this.spices, this.p5, this.indexOffset);
    }
    this.loading = false;
    this.ready = true;
  }

  public save(page: number): void {
    const preview: Preview = this.previewData[page];
    this.p5.loadImage(preview.data, (image: p5.Image) => {
      this.p5.save(image, "epice-" + this.shape.toString() + page + ".png");

      preview.spices.forEach((spice: Spice) => {  
        const shapeIndex: number = this.shape === Shape.CIRCLE ? 0 : 1;
        const values: string[] = spice.printed.split("");
        values[shapeIndex] = "1";
        spice.printed = values.join("");

        this.service.updateSpice(spice._id, spice, "").subscribe();
      });
    })
  }

  private sketch(p5: p5): void {
    p5.preload = () => {
      this.font = p5.loadFont("../../assets/font/Gobold Regular.otf");
    }

    p5.setup = () => {
      p5.textFont(this.font);
      p5.createCanvas(this.width, this.height);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss();
  }
}
