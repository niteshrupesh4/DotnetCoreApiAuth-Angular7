import { Component, OnInit } from '@angular/core';
import { Exaltuser } from 'src/app/_models/exaltuser';
import { ExaltuserService } from 'src/app/_services/exaltuser.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: Exaltuser;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: ExaltuserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     this.user = data['user'];
   });

   this.galleryOptions = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];

  this.galleryImages = this.getImages();
  }

  getImages() {
    const imgeUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imgeUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description,
      });
    }
    return imgeUrls;
  }

  // // member/11
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id'])
  //   .subscribe((user: Exaltuser) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
