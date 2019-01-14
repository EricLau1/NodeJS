import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private Uri: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getData(){
    
    return this.http.get<any>(this.Uri);
  
  }

  postData(params) {

  	let headers = new HttpHeaders({
    	'Content-Type': 'application/json',
    	'Authorization': '' 
	});

     let options = { headers: headers };
  	
  	let data = {
  		"data": params.data
  	};

  	return this.http.post(this.Uri, JSON.stringify(data),  options);

  }
}
