import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpiceGridPageRoutingModule } from './spice-grid-routing.module';

import { SpiceGridPage } from './spice-grid.page';
import { SpiceComponent } from '../spice/spice.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpiceGridPageRoutingModule
  ],
  declarations: [SpiceGridPage, SpiceComponent]
})
export class SpiceGridPageModule {}
