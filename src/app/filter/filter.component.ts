import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SPICE_TYPES } from '../spice-types';
import { SpiceType } from '../spice-type';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public labelFilter: string;
  public selectedTypes: number[];
  public readonly spiceTypes: SpiceType[] = SPICE_TYPES;
  public nonPrinted: boolean;

  constructor(private modalCtrl: ModalController, private service: FilterService, private toastController: ToastController) {
    this.labelFilter = JSON.parse(JSON.stringify(this.service.label));
    this.selectedTypes = JSON.parse(JSON.stringify(this.service.types));
    this.nonPrinted = JSON.parse(JSON.stringify(this.service.nonPrinted));
  }

  public ngOnInit(): void {
  }

  public selectAll(): void {
    this.selectedTypes = SPICE_TYPES.map((type: SpiceType) => type.value);
  }

  public deselectAll(): void {
    this.selectedTypes = [];
  }

  public get allSelected(): boolean {
    return this.selectedTypes.length === SPICE_TYPES.length;
  }

  public isSelected(value: number): boolean {
    return this.selectedTypes.indexOf(value) !== -1;
  }

  public toggleType(value: number): void {
    if (this.isSelected(value)) {
      this.selectedTypes.splice(this.selectedTypes.indexOf(value), 1);
    } else {
      this.selectedTypes.push(value);
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
    if (!this.selectedTypes.length) {
      this.showToast("Vous devez choisir au moins un type");
      return;
    }

    this.service.label = this.labelFilter;
    this.service.types = this.selectedTypes;
    this.service.nonPrinted = this.nonPrinted;

    this.dismiss(false);
  }

  public dismiss(isCancel: boolean = true): void {
    this.modalCtrl.dismiss({
      isCancel: isCancel, 
    });
  }
}
