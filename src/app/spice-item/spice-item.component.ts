import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpiceType } from '../spice-type';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { ModalController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-spice-item',
  templateUrl: './spice-item.component.html',
  styleUrls: ['./spice-item.component.scss'],
})
export class SpiceItemComponent implements OnInit, Spice {

  @Input() public label: string;
  @Input() public type: SpiceType;
  @Input() public printed: boolean;
  @Input() public selected: boolean;
  @Output() public editEvent: EventEmitter<void>;
  @Output() public gotImage: EventEmitter<string>;
  public imageSource: string;

  public constructor(private service: SpiceService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.imageSource = "-1";
    this.editEvent = new EventEmitter<void>();
    this.gotImage = new EventEmitter<string>();
  }

  public ngOnInit(): void {
    this.service.getImageForSpice(this.label).pipe(first()).subscribe((source: string) => {
      this.imageSource = source;
      this.gotImage.emit(source);
    });
  }

  public async showEditModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditComponent,
      componentProps: {
        isAdd: false,
        spice: this.asSpice(),
      },
      cssClass: 'custom-modal',
    });
    modal.present();
    const {data} = await modal.onDidDismiss();
    if (data && data.updated) {
      this.editEvent.emit();
    }
  }

  private asSpice(): Spice {
    return {
      label: this.label,
      type: this.type,
      printed: this.printed,
    };
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
