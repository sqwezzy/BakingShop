import { Component, OnInit } from '@angular/core';
import categories from '../../assets/categories.json'
import products from '../../assets/menu.json'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public categoriesList: {name: string} = categories;
  public productList: {name: string, categories: string, price: number, img: string} = products;

  ngOnInit() {
  }

}
