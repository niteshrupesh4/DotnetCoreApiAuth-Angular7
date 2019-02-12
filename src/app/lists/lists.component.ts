import { Component, OnInit } from '@angular/core';
import { Exaltuser } from '../_models/exaltuser';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { ExaltuserService } from '../_services/exaltuser.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: Exaltuser[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService,
    private userService: ExaltuserService,
    private routes: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.routes.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,
       this.pagination.itemPerPage, null, this.likesParam).subscribe((res: PaginatedResult<Exaltuser[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
