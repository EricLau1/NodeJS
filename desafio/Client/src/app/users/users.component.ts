import { Component, OnInit } from '@angular/core';

import { UsersService, User } from '../shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = null;

  constructor(private usersService: UsersService) { }

  ngOnInit() {

    console.log(this.usersService.getToken());

    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data
        console.log(this.users);
      },
      error => this.users = null
      );

  }

}
