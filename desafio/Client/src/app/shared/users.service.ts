import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private Uri: string = "http://localhost:3000/users";

  private token = null;

  constructor(private http: HttpClient) { }

  public getUsers() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}` 
    });

    return this.http.get<Array<User>>(this.Uri, {headers: headers});

  }

  public getUser(id: number) {

    return this.http.get<User>(`${this.Uri}/${id}`);

  }

  public signup(user: User) {

    const signupUri = "http://localhost:3000/signup";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '' 
    });

    let data = {
      "name": user.name,
      "email": user.email,
      "password": user.password,
      "phone": user.phone,
      "office": user.office
    };

    return this.http.post(signupUri, JSON.stringify(data), { headers: headers });

  }

  public setToken(token: any) {
    this.token = `bearer ${token.token}`;
  }

  public getToken() {
    return this.token;
  }

}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  office: string;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = null;
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.office = '';
    this.createdAt = '';
    this.updatedAt=  '';
  }
}