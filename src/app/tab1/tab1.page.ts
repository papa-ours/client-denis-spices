import { Component, OnInit } from '@angular/core';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public spices: Spice[];

  constructor(private service: SpiceService, private router: Router) {
    this.spices = []
  }

  public ngOnInit(): void {
    this.getSpices();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      () => this.getSpices()
    );
  }

  private getSpices(): void {
    this.service.getAllSpices().subscribe((spices: Spice[]) => {

      // Add new spices
      for (const spice of spices) {
        if (this.spices.find((s: Spice) => s.label === spice.label) === undefined) {
          this.spices.push(spice);
        }
      }

      // Remove deleted spices
      for (let i = this.spices.length - 1; i >= 0; i--) {
        if (spices.find((s: Spice) => s.label === this.spices[i].label) === undefined) {
          this.spices.splice(i, 1);
        }
      }

    });
  }

  public goToAddView(): void {
    this.router.navigateByUrl("/tabs/new");
  }
}
