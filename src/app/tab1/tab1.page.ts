import { Component, OnInit } from '@angular/core';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SPICE_TYPES } from '../spice-types';
import { EditComponent } from '../edit/edit.component';
import { ModalController, ToastController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
import { PrintComponent } from '../print/print.component';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public readonly SPICE_PER_PAGE: number = 24;
  public sortColumn: string;
  public sortDirection: number;
  public spices: Spice[];
  public pageCount: number;
  public currentPage: number;
  public loading: boolean;

  constructor(
    private service: SpiceService,
    private router: Router,
    private modalCtrl: ModalController,
    public filterService: FilterService,
    private toastController: ToastController,
  ) {
    this.spices = [];
    this.sortColumn = "label";
    this.sortDirection = 1;
    this.initPages();
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getSpices();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      () => this.getSpices()
    );
  }

  public initPages(): void {
    this.currentPage = 0;
    this.getPageCount();
  }

  public getPageCount(): void {
    this.service.getSpiceCount().subscribe((count: number) => this.pageCount = Math.ceil(count / this.SPICE_PER_PAGE));
  }

  public changePage(change: number): void {
    this.currentPage += change;
    if (this.currentPage === this.pageCount) {
      this.currentPage = this.pageCount;
    }
    if (this.currentPage < 0) {
      this.currentPage = 0;
    }
    this.getSpices();
  }

  public setSort(column: string): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === -1 ? 1 : -1;
    this.sortSpices();
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

  private sortSpices(): void {
    this.spices.sort((spice1: Spice, spice2: Spice) => {
      const val1: string = (this.sortColumn === 'label' ? spice1.label : spice1.type.label).replace('É', 'E');
      const val2: string = (this.sortColumn === 'label' ? spice2.label : spice2.type.label).replace('É', 'E');

      if (this.sortDirection === -1) {
        return val1 < val2 ? 1 : -1;
      } else {
        return val1 < val2 ? -1 : 1 ;
      }
    });
  }

  public async addSpice(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditComponent,
      keyboardClose: true,
      componentProps: {
        isAdd: true,
        spice: {
          label: "",
          type: SPICE_TYPES[0],
        },
      },
      cssClass: 'custom-modal',
    });
    modal.present();
    const {data} = await modal.onDidDismiss();
    if (data && data.updated) {
      this.getSpices();
    }
  }

  public getSpices(): void {
    this.spices = [];
    this.loading = true;
    this.service.getSpices(this.currentPage * this.SPICE_PER_PAGE, this.SPICE_PER_PAGE).subscribe((spices: Spice[]) => {
      const oldSpices: Spice[] = this.spices;
      this.spices = spices;
      this.spices.forEach((spice: Spice) => {
        const oldSpice: Spice | undefined = oldSpices.find((s: Spice) => s.label === spice.label);
        if (oldSpice) {
          spice.selected = oldSpice.selected;
        }
      });
      this.sortSpices();
      this.loading = false;
    });
  }

  public async showFilterOptions(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data && !data.isCancel) {
      this.getSpices();
      this.initPages();
    }
  }

  public async showPrintPage(): Promise<void> {
    if (!this.numberOfSelectedSpices) {
      this.showToast("Vous devez sélectionner au moins une épice.");
      return;
    }

    const modal = await this.modalCtrl.create({
      component: PrintComponent,
      componentProps: {
        spices: this.selectedSpices,
      },
    });
    await modal.present();
  }

  public goToAddView(): void {
    this.router.navigateByUrl("/tabs/new");
  }

  public get allSelected(): boolean {
    return this.spices.length > 0 && this.numberOfSelectedSpices === this.spices.length;
  }

  public get numberOfSelectedSpices(): number {
    return this.selectedSpices.length;
  }

  public get selectedSpices(): Spice[] {
    return this.spices.filter((spice: Spice) => spice.selected);
  }

  public setAll(selected: boolean): void {
    this.spices.forEach((spice: Spice) => spice.selected = selected);
  }

  public gotImage(image: string, index: number): void {
    this.spices[index].image = image;
  }
}
