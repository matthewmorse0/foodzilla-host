import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
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

    // const userAction = async () => {
    //   const response = await fetch('http://127.0.0.1:5000/view_info');
    //   const myJson = await response.json(); //extract JSON from the http response
    //   // do something with myJson
    // }


    var json = JSON.stringify({ rid: 2 });
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/view_info");
    xhr.send(json);
    xhr.onload = () => 
    {
      var data = xhr.responseText;
      console.log(json)
      console.log(data)
      var response = JSON.parse(data)
      console.log(response)
      this.rest = response.rest_info as RestaurantObject
      /*this.rest.name = this.rest[0].toString();
      this.rest.id = this.rest[1]
      this.rest.managerId = this.rest[2]
      this.rest.waitTime = this.rest[3]
      this.rest.menuLink = this.rest[4]
      this.rest.diningTables = this.rest[5]
      this.rest.freeTables = this.rest[6]*/
      console.log(this.rest);
    }
  }

}
