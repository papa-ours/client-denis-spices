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

  public spice: any;
  public spiceTypes: SpiceType[] = SPICE_TYPES;
  public imageSources: string[];
  public loading: boolean;
  public noResults: boolean;
  public selectedImage: string;

  constructor(private toastController: ToastController, private service: SpiceService, private router: Router) {
    this.spice = {
      label: "",
      type: 0,
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
    if (this.spice.label === "") {
      this.showToast('Le nom ne doit pas être vide');
      return;
    }

    if (this.selectedImage === "") {
      this.showToast('Veuillez sélectionner une image');
      return;
    }

    this.service.createSpice(this.spice, this.selectedImage).subscribe(async () => {
      this.service.getAllSpices();
      this.spice = {
        label: "",
        type: 0,
      }
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
    this.spice.type = $event.detail.value;
  }

  public loadImages(): void {
    this.loading = true;
    this.service.loadImages(this.spice.label).subscribe((paths: string[]) => {
      this.imageSources = paths.filter((path: string) => path !== '');
      this.noResults = this.imageSources.length === 0;
      this.loading = false;
    });
  }
}
