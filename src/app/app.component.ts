import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { RestaurantTableComponent } from './restaurant-table/restaurant-table.component';
import { RestaurantObject } from 'src/assets/restObject';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  response: RestaurantObject[];
  rest: RestaurantObject;

  title = 'foodzilla-host';
  constructor(private http: HttpClient) {}

  async ngOnInit () {
    this.getRests();
  }
  
  getConfigResponse(): Observable<RestaurantObject> {
    return this.http.get<RestaurantObject>(
      "http://127.0.0.1:5000/view_info")
  }

/*IGNORE*/
  private async getRests() {
    var json = JSON.stringify({ "rid": 2});
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/view_info");
    xhr.send(json);
    xhr.onload = () => 
    {
      var data = xhr.responseText;
      var response = JSON.parse(data)
      this.rest = response.rest_info;
      //console.log(this.rest);
    }
  }

}

