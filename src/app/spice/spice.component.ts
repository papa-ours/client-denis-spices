import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpiceType } from '../spice-type';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { AlertController } from '@ionic/angular';
import { SPICE_TYPES } from '../spice-types';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-spice',
  templateUrl: './spice.component.html',
  styleUrls: ['./spice.component.scss'],
})
export class SpiceComponent implements OnInit, Spice {

  @Input() public label: string;
  @Input() public type: SpiceType;
  @Output() public editEvent: EventEmitter<void>;
  public imageSource: string;

  public constructor(private service: SpiceService, private alertCtrl: AlertController) {
    this.imageSource = "-1";
    this.editEvent = new EventEmitter<void>();
  }

  public ngOnInit(): void {
    this.service.getImageForSpice(this.label).pipe(first()).subscribe((source: string) => this.imageSource = source);
  }

  public async showAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Modifier',
      subHeader: this.label + ' (' + this.type.label + ')',
      inputs: [{
        name: 'label',
        type: 'text',
        value: this.label,
      }],
      buttons: [
        {
          text: 'SUPPRIMER',
          handler: () => {
            this.showDeleteConfirm();
          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.service.updateSpice(this.label, data.label, "").subscribe(() => this.editEvent.emit());
          }
        }
      ]
    });
    await alert.present();
  }

  public async showDeleteConfirm(): Promise<void> {
    const modal = await this.alertCtrl.create({
      header: 'Supprimer',
      subHeader: this.label + '?',
      buttons: [
        {
          text: 'NON',
        }, {
          text: 'OUI',
          handler: () => {
            this.service.deleteSpice(this.label).subscribe(() => this.editEvent.emit());
          }
        }
      ]
    })
    modal.present();
  }
}
