import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { setupTestingRouter } from '@angular/router/testing';
import { RestaurantObject } from 'src/assets/restObject';
import { TileObject } from 'src/assets/tileObject';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restName: string;
  @Input() restId: number;
  @Input() restManagerId: string;
  @Input() restWaitTime: number;
  @Input() restMenuLink: string;
  @Input() restDiningTables: string;
  @Input() restFreeTables: string;
  tiles: TileObject[] = [];

  allRests: RestaurantObject;
  title = 'foodzilla-patron';

  async ngOnInit () {
    // this.getRests();
    this.loadTables();
  }

  // private async getRests() {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", "http://127.0.0.1:5000/get_all_info");
  //   xhr.send();
  //   xhr.onload = () => 
  //   {
  //     var data = xhr.responseText;
  //     var response = JSON.parse(data)
  //     this.allRests = response.restaurants;
  //   }
  // }

  private async loadTables() {
    this.tiles = [];
    let diningTables: string[] = [...this.restDiningTables];
    let openTables: string[] = [...this.restFreeTables];
    for(let i = 0; i < diningTables.length; i++) {
      if(diningTables[i] != "0" && diningTables[i] != "|") {
        if(diningTables[i]!= "0" && openTables[i] == "1") {
          this.tiles.push({seats: diningTables[i], color: "green", pos: i});
        }
        else {
          this.tiles.push({seats: diningTables[i], color: "red", pos: i});
        }
      }
      else {
        this.tiles.push({seats: "", color: "white", pos: i});
      }
    }
  }
  updateSeats(index: number, color: string) {
    let freeTablesArr: string[] = [...this.restFreeTables];
    var freeTables = '';
    if(freeTablesArr[index] == '0' && color != "white"){
      freeTablesArr[index] = '1';
    }else if (freeTablesArr[index] == '1'){
      freeTablesArr[index] = '0';
    }
    for (let i = 0; i < freeTablesArr.length; i++) {
      freeTables += freeTablesArr[i];
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/test_update_free?rid=2&free="+freeTables);
    xhr.send();
  }
}
