import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpiceService } from '../spice.service';
import { Spice } from '../spice';
import { SPICE_TYPES } from '../spice-types';
import { SpiceType } from '../spice-type';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() public spice: Spice;
  @Input() public isAdd: boolean;
  public readonly spiceTypes: SpiceType[] = SPICE_TYPES;
  public imageSources: string[];
  public loading: boolean;
  public noResults: boolean;
  public selectedImage: string;
  private startLabel: string;

  constructor(private toastController: ToastController, private service: SpiceService, private modalCtrl: ModalController) {
    this.spice = {
      label: "",
      type: SPICE_TYPES[0],
    }
    this.imageSources = [];
    this.loading = false;
    this.noResults = false;
    this.selectedImage = "";
  }

  public ngOnInit(): void {
    this.startLabel = this.spice.label;
    if (this.spice.label) {
      this.loadImages();
    }
  }

  private async showToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: message,
      duration: 2200,
      position: 'bottom',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'OK',
    });

    toast.present();
  }

  public onSubmit() {
    this.spice.label = this.spice.label.trim();
    if (this.spice.label === "") {
      this.showToast('Le nom ne doit pas être vide');
      return;
    }

    if (this.selectedImage === "") {
      this.showToast('Veuillez sélectionner une image');
      return;
    }

    this.isAdd ? this.addSpice() : this.updateSpice();
  }

  private updateSpice(): void {
    this.service.updateSpice(this.startLabel, this.spice, this.selectedImage).subscribe(async () => {
      this.spice = {
        label: "",
        type: SPICE_TYPES[0],
      }
      this.imageSources = [];
      this.dismiss(true);
    });
  }

  private addSpice(): void {
    this.service.createSpice(this.spice, this.selectedImage).subscribe(() => {
      this.spice = {
        label: "",
        type: SPICE_TYPES[0],
      }
      this.imageSources = [];
      this.dismiss(true);
    });
  }

  public updateLabel($event: CustomEvent) {
    this.spice.label = $event.detail.value;
  }

  private dismiss(updated: boolean = false): void {
    this.modalCtrl.dismiss({updated});
  }

  public updateType($event: CustomEvent) {
    this.spice.type = this.spiceTypes[$event.detail.value];
  }

  public loadImages(): void {
    this.loading = true;
    this.service.loadImages(this.spice.label).subscribe((paths: string[]) => {
      this.imageSources = paths.filter((path: string) => path !== '');
      this.noResults = this.imageSources.length === 0;
      this.loading = false;
    });
  }

  public parseSourceToImageLabel(source: string): string {
    source = source.replace(".jpg", "");
    return source.substr(source.lastIndexOf("/") + 1).split("-").join(" ");
  }
}

