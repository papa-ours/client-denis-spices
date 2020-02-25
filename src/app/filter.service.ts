import { Injectable } from '@angular/core';
import { SPICE_TYPES } from './spice-types';
import { SpiceType } from './spice-type';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public label: string;
  public nonPrinted: boolean;
  public types: number[];
  constructor() {
    this.label = "";
    this.nonPrinted = false;
    this.selectAll();
  }

  private selectAll(): void {
    this.types = SPICE_TYPES.map((type: SpiceType) => type.value);
  }

  public get encodedQuery(): string {
    return `?label=${this.label}&type=${this.types.join(",")}&printed=${this.nonPrinted ? 0 : -1}`;
  }

  public get prettyFilter(): string {
    let filter: string = "";
    if (this.label) {
      filter += `Nom CONTIENT '${this.label}'`;
    }

    if (this.types.length) {
      if (filter.length) {
        filter += " ET "
      }
      filter += `Type PARMI ${this.typeLabels.join(", ")}`
    }

    if (this.nonPrinted) {
      if (filter.length) {
        filter += " ET ";
      }
      filter += " PAS Imprimé"
    }

    return filter ? filter : "Aucun filtre";
  }

  private get typeLabels(): string[] {
    return this.types.map((value: number) => {
      return SPICE_TYPES.find((type: SpiceType) => type.value === value).label;
    });
  }
}
