import { Component } from '@angular/core';

import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  users: Array<any> = [];

  constructor(private service: UserService) {

  		this.service.getAll()
  			.subscribe((data) => {
  				console.log(data);
  				this.users = data;
  			});
  }
}
