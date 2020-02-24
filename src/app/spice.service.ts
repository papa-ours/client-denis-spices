import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Spice } from './spice';
import { Observable } from 'rxjs';
import { SERVER } from './server';
import { SPICE_TYPES } from './spice-types';
import { FilterService } from './filter.service';


@Injectable({
  providedIn: 'root'
})
export class SpiceService {
  constructor(private http: HttpClient, private filterService: FilterService) { }

  public getSpices(): Observable<Spice[]> {
    return new Observable<Spice[]>(subscriber => {
      this.http.get<any[]>(`${SERVER}/spice${this.filterService.encodedQuery}`).subscribe(response => {
        const spices: Spice[] = response.map((val: any) => {
          return {label: val.label, type: SPICE_TYPES[val.type]}
        });
        subscriber.next(spices);
      });
    });
  }

  public getImageForSpice(label: string): Observable<string> {
    return new Observable<string>(subscriber => {
      this.http.get<any>(SERVER + 'spice/image/' + label).subscribe(response => {
        subscriber.next(response.url);
      });
    });
  }

  public loadImages(label: string): Observable<string[]> {
    return this.http.get<string[]>(SERVER + 'spice/images/' + label);
  }

  public createSpice(spice: Spice, image: string): Observable<void> {
    return this.http.post<void>(
      SERVER + "spice/new",
      {spice: {label: spice.label, type: spice.type.value}, image_url: image},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }

  public deleteSpice(label: string): Observable<void> {
    return this.http.delete<void>(
      SERVER + "spice/delete/" + label,
    );
  }

  public updateSpice(oldLabel: string, spice: Spice, image: string): Observable<void> {
    return this.http.put<void>(
      SERVER + "spice/update",
      {oldLabel: oldLabel, label: spice.label, type: spice.type.value, image: image},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }

  public getImageContent(label: string): Observable<string> {
    return this.http.get<string>(`${SERVER}spice/image/content/${label}`);
  }
}
