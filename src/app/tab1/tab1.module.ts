import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SpiceItemComponent } from '../spice-item/spice-item.component';
import { EditComponent } from '../edit/edit.component';

@NgModule({
  entryComponents: [EditComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
  declarations: [Tab1Page, SpiceItemComponent, EditComponent]
})
export class Tab1PageModule {}
