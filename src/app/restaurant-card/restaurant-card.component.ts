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
  @Input() layoutMode: boolean;
  tiles: TileObject[] = [];

  allRests: RestaurantObject;
  title = 'foodzilla-patron';

  async ngOnInit () {
    this.loadTables();
  }

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
        this.tiles.push({seats: "0", color: "white", pos: i});
      }
    }
  }
  updateSeats(index: number, color: string, layoutMode: boolean) {
    if (!layoutMode){
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
      xhr.open("POST", "http://127.0.0.1:5000/update_free?rid=2&free="+freeTables);
      xhr.send();
    }else{
      let diningTables: string[] = [...this.restDiningTables];
      var tables = '';
      if(color == "white"){
        diningTables[index] = '1';
      }else if (Number(diningTables[index]) < 9){
        diningTables[index] = String(Number(diningTables[index]) + 1);
      }else{
        diningTables[index] = '0';
      }
      for (let i = 0; i < diningTables.length; i++) {
        tables += diningTables[i];
      }
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:5000/update_layout?rid=2&tables="+tables);
      xhr.send();
    }
    window.location.reload();
  }
}