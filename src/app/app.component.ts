import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RestaurantObject } from 'src/assets/restObject';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  allRests: RestaurantObject[];


  title = 'foodzilla-host';
  constructor(private http: HttpClient) {}

  async ngOnInit () {
    this.getRest();
  }
  
  getConfigResponse(): Observable<RestaurantObject> {
    return this.http.get<RestaurantObject>(
      "http://127.0.0.1:5000/get_all_info")
  }


  private async getRest() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/test_view_info?rid=2");
    xhr.send();
    xhr.onload = () => 
    {
      var data = xhr.responseText;
      var response = JSON.parse(data)
      this.allRests = response.rest_info;
      console.log(this.allRests);
    }
  }
}