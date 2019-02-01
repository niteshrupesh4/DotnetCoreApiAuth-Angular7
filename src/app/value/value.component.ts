import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
 values: any;

  constructor(private httpClint: HttpClient) { }

  ngOnInit() {
    this.getValue();
  }

  getValue() {
    this.httpClint.get('http://localhost:5000/api/values')
    .subscribe(responce => {
      this.values = responce;
      console.log(this.values);
    }, errorResponce => {
      console.log(errorResponce);
    });
  }

}
