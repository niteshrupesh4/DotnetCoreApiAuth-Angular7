import { Component, OnInit } from '@angular/core';
import { Exaltuser } from 'src/app/_models/exaltuser';
import { ExaltuserService } from 'src/app/_services/exaltuser.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  users: Exaltuser[];

  constructor(private userService: ExaltuserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
    this.users = data['users'];
   });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: Exaltuser[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
