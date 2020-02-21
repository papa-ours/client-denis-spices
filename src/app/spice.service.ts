import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Spice } from './spice';
import { Observable } from 'rxjs';
import { SERVER } from './server';
import { SPICE_TYPES } from './spice-types';


@Injectable({
  providedIn: 'root'
})
export class SpiceService {
  constructor(private http: HttpClient) { }

  public getAllSpices(): Observable<Spice[]> {
    return new Observable<Spice[]>(subscriber => {
      this.http.get<any[]>(SERVER + "spice/all").subscribe(response => {
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
}
