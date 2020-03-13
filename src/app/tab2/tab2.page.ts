import { Component, OnInit, HostListener } from '@angular/core';
import { TemplateParams } from '../template-params';
import * as p5 from 'p5';
import { Shape } from '../shape';
import { Preview } from '../preview';
import { CircleGeneratorService } from '../circle-generator.service';
import { RectangleGeneratorService } from '../rectangle-generator.service';
import { Spice } from '../spice';
import { SPICE_TYPES } from '../spice-types';
import { SpiceType } from '../spice-type';
import { TemplateService } from '../template.service';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private readonly fields: string[][] = [
    [
      "name",
      "rowCount",
      "colCount",
      "leftPadding",
      "topPadding",
      "itemLeftDistance",
      "itemTopDistance",
      "itemWidth",
      "itemHeight",
    ], 
    [
      "fontSize",
      "labelOffsetX",
      "labelOffsetY",
      "imageSize",
      "imageOffsetX",
      "imageOffsetY",
      "shape",
    ],
  ];
  private p5: p5;
  private width: number;
  private height: number;
  public font: p5.Font;
  public ready: boolean;
  public previewData: Preview;
  public loading: boolean;
  public templates: TemplateParams[];
  public templateNames: string[];
  public selectedTemplateIndex: number;
  public selectedName: string;
  private screenWidth: number;

  public constructor(
    private circleGenerator: CircleGeneratorService,
    private rectangleGenerator: RectangleGeneratorService,
    private toastController: ToastController,
    private alertController: AlertController,
    private service: TemplateService,
    private platform: Platform,
  ) {
    this.width = 612;
    this.height = 792;
    this.loading = false;
    this.selectedTemplateIndex = -1;
  }
  
  public ngOnInit(): void {
    this.initP5().then(() => {
      this.getTemplates();
    });
    this.screenWidth = this.platform.width();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.screenWidth = this.platform.width();
  }

  public get flatFields(): string[] {
    return this.fields[0].concat(this.fields[1]);
  }

  private async initP5(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.p5 = new p5(async (p5: p5) => {
        await this.sketch(p5);
        resolve();
      });
    });
  }

  public getTemplates(): void {
    this.service.getTemplates().subscribe((templates: TemplateParams[]) => {
      this.templates = templates;
      this.templateNames = templates.map((template: TemplateParams) => template.name.value);
      if (this.templates.length) {
        if (this.selectedName) {
          this.selectedTemplateIndex = this.templateNames.findIndex((name: string) => name === this.selectedName);
        }
        if (this.selectedTemplateIndex === undefined || this.selectedTemplateIndex < 0) {
          this.selectedTemplateIndex = 0;
        }
        this.generate();
      }
    });
  }

  private async sketch(p5: p5): Promise<void> {
    return new Promise<void>((resolve) => {
      p5.preload = () => {
        this.font = p5.loadFont("../../assets/font/Gobold Regular.otf");
      }
  
      p5.setup = () => {
        p5.textFont(this.font);
        p5.createCanvas(this.width, this.height);
        p5.fill(255);
        resolve();
      }
    });
  }

  private get numberOfSpices(): number {
    return this.params.colCount.value * this.params.rowCount.value;
  }

  private getRandomSpiceType(): SpiceType {
    return SPICE_TYPES[Math.floor(Math.random() * SPICE_TYPES.length)];
  }

  private getMockSpices(): Spice[] {
    const spices: Spice[] = [];
    for (let i = 0; i < this.numberOfSpices; i++) {
      const spice: Spice = {
        _id: "-1",
        label: (Math.random() > 0.33 ? Math.random() > 0.66 ? "Long nom d'épice #" : "Très très long nom pour l'épice #" : "Épice #") + (i + 1),
        type: this.getRandomSpiceType(),
      };

      if (spice.type.value === 6) {
        spice.spicyLevel = Math.floor(Math.random() * 10);
      }
      spices.push(spice);
    }

    return spices;
  }

  public get params(): TemplateParams {
    return this.templates[this.selectedTemplateIndex];
  }

  public async generate(): Promise<void> {
    this.loading = true;
    try {
      if (this.params.shape.value == Shape.CIRCLE) {
        this.previewData = (await this.circleGenerator.generate(this.getMockSpices(), this.p5, 0, this.params))[0];
      } else if (this.params.shape.value == Shape.RECT) {
        this.previewData = (await this.rectangleGenerator.generate(this.getMockSpices(), this.p5, 0, this.params))[0];
      }
    } catch (error) {
      console.error(error.message);
    }
    this.loading = false;
    this.ready = true;
  }

  public async confirmUpdate(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Écraser",
      message: this.params.name.value,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.update();
            this.alertController.dismiss();
          }
        }
      ]
    });
  
    await alert.present();
  }

  public async submit(): Promise<void> {
    if (this.params.name.value === "") {
      this.showToast("Le gabarit doit avoir un nom", "danger");
    } else if (this.templateNames.includes(this.params.name.value)) {
      this.confirmUpdate();
    } else {
      this.save();
    }
  }

  public async update(): Promise<void> {
    this.service.updateTemplate(this.params).subscribe(async () => {
      this.selectedName = this.params.name.value;
      this.getTemplates();
    });
  }

  public async showSavedToast(): Promise<void> {
    this.showToast("Gabarit sauvegardé avec succès", "success");
  }

  public async showToast(message: string, color: string = "primary") {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: message,
      duration: 2200,
      position: 'bottom',
      color: color,
      showCloseButton: true,
      closeButtonText: 'OK',
    });

    toast.present();
  }

  public async save(): Promise<void> {
    this.service.saveTemplate(this.params).subscribe(async () => {
      this.selectedName = this.params.name.value;
      this.getTemplates();
    });
  }

  public async delete(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Supprimer",
      message: this.params.name.value,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.service.deleteTemplate(this.params._id).subscribe(() => this.getTemplates());
            this.alertController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
