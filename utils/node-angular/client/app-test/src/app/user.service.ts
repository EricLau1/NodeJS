import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Uri : string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getAll() {
  	return this.http.get<Array<any>>(this.Uri);
  }

}
