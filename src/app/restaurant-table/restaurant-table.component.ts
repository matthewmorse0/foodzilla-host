import { Component, OnInit } from '@angular/core';
import { RestaurantObject } from 'src/assets/restObject';

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.css']
})
export class RestaurantTableComponent implements OnInit {

  rest: RestaurantObject;
  title = 'foodzilla-host';

  async ngOnInit () {
    this.getRest();
  }

  private async getRest() {
    var data = JSON.stringify({ "rid": 2});
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/view_info");
    xhr.send(data);
    xhr.onload = () => 
    {
      var data = xhr.responseText;
      var response = JSON.parse(data)
      this.rest = response.restaurants[0] as RestaurantObject
      this.rest.name = this.rest[0].toString();
      this.rest.id = this.rest[1]
      this.rest.managerId = this.rest[2]
      this.rest.waitTime = this.rest[3]
      this.rest.menuLink = this.rest[4]
      this.rest.diningTables = this.rest[5]
      this.rest.freeTables = this.rest[6]
      console.log(this.rest);
    }
  }

}
