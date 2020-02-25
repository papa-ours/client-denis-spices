import { Component } from '@angular/core';
import { Spice } from '../spice';
import { SPICE_TYPES } from '../spice-types';
import { SpiceType } from '../spice-type';
import { ToastController } from '@ionic/angular';
import { SpiceService } from '../spice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public spice: Spice;
  public readonly spiceTypes: SpiceType[] = SPICE_TYPES;
  public imageSources: string[];
  public loading: boolean;
  public noResults: boolean;
  public selectedImage: string;

  constructor(private toastController: ToastController, private service: SpiceService, private router: Router) {
    this.spice = {
      label: "",
      type: SPICE_TYPES[0],
    }
    this.imageSources = [];
    this.loading = false;
    this.noResults = false;
    this.selectedImage = "";
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

  public onSubmit(changeView: boolean = false) {
    this.spice.label = this.spice.label.trim();
    if (this.spice.label === "") {
      this.showToast('Le nom ne doit pas être vide');
      return;
    }

    if (this.selectedImage === "") {
      this.showToast('Veuillez sélectionner une image');
      return;
    }

    this.service.createSpice(this.spice, this.selectedImage).subscribe(async () => {
      this.service.getSpices(0, 0);
      this.spice = {
        label: "",
        type: SPICE_TYPES[0],
      }
      this.imageSources = [];
      if (changeView) {
        this.router.navigateByUrl("/tabs/all");
      } else {
        const toast: HTMLIonToastElement = await this.toastController.create({
          message: 'Épice ajoutée',
          duration: 2200,
          position: 'bottom',
          color: 'success',
          showCloseButton: true,
          closeButtonText: 'OK',
        });
    
        toast.present();
      }
    });
  }

  public updateLabel($event: CustomEvent) {
    this.spice.label = $event.detail.value;
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
