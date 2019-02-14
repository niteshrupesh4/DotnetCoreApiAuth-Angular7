import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { ExaltuserService } from 'src/app/_services/exaltuser.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: ExaltuserService,
     private authService: AuthService,
     private alertidy: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThrad(this.authService.decodedToken.nameid,
       this.recipientId)
       .pipe(
         tap(messages => {
           for (let i = 0; i < messages.length; i++) {
              if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                this.userService.markAsRead(currentUserId, messages[i].id);
              }
           }
         })
       )
       .subscribe(message => {
         this.messages = message;
       }, error => {
         this.alertidy.error(error);
       });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertidy.error(error);
    });
  }
}
