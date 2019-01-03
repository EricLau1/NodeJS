import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Uri: string = "http://localhost:3000/token";

  constructor(private http: HttpClient) { }

  public signin(email, password: string) {

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '' 
    });

    let data = {
      "email": email,
      "password": password
    }; 

    return this.http.post(this.Uri, JSON.stringify(data), { headers: headers });

  }

}


