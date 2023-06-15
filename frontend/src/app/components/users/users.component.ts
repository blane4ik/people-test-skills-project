import { Component, OnInit } from '@angular/core';
import { IUser } from './interface/user.interface';
import { UsersService } from './service/users.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: IUser[] | undefined;

  constructor(private usersService: UsersService,
              private toasterService: ToasterService) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    })
  }
}
