import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Spice } from '../spice';
import { SpiceService } from '../spice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as p5 from 'p5';
import * as domtoimage from 'dom-to-image-more';

@Component({
  selector: 'app-spice-grid',
  templateUrl: './spice-grid.page.html',
  styleUrls: ['./spice-grid.page.scss'],
})

export class SpiceGridPage implements OnInit {
  
  public allSpices: Spice[];
  public activeSpices: Spice[];
  @ViewChild("grid", {static: false}) private grid: ElementRef;

  constructor(private service: SpiceService, private router: Router) {
    this.allSpices = [];
    this.activeSpices = [];
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(
      () => this.getSpices()
    );

    new p5((p5: p5) => {
      p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
      };

      p5.draw = () => {
        p5.background(255);
      };
    });
  }

  public getSpices(): void {
    this.service.getSpices().subscribe((spices: Spice[]) => {
      this.allSpices = spices;
      this.activeSpices = spices.slice(0, 24);
    });
  }

  public goToAddView(): void {
    this.router.navigateByUrl("/tabs/new");
  }

  public exportGrid(): void {
    domtoimage.toPng(this.grid.nativeElement).then((res: any) => console.log(res));
  }
}
