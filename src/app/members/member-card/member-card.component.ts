import { Component, OnInit, Input } from '@angular/core';
import { Exaltuser } from 'src/app/_models/exaltuser';
import { ExaltuserService } from 'src/app/_services/exaltuser.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: Exaltuser;

  constructor(private authService: AuthService,
    private userService: ExaltuserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
    .subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
}
