import { Component, OnInit } from '@angular/core';
import products from '../../assets/menu.json'

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {
public productList = products;
  ngOnInit() {
  }
}