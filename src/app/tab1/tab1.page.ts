import { Component, OnInit } from '@angular/core';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SPICE_TYPES } from '../spice-types';
import { EditComponent } from '../edit/edit.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public sortColumn: string;
  public sortDirection: number;
  public spices: Spice[];

  constructor(private service: SpiceService, private router: Router, private modalCtrl: ModalController) {
    this.spices = [];
    this.sortColumn = "label";
    this.sortDirection = 1;
  }

  public ngOnInit(): void {
    this.getSpices();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      () => this.getSpices()
    );
  }

  public setSort(column: string): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === -1 ? 1 : -1;
    this.sortSpices();
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
    if (data.updated) {
      this.getSpices();
    }
  }

  private getSpices(): void {
    this.service.getAllSpices().subscribe((spices: Spice[]) => {
      this.spices = spices;
      this.sortSpices();
    });
  }

  public goToAddView(): void {
    this.router.navigateByUrl("/tabs/new");
  }
}
