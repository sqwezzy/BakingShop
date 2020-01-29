import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ms-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input()
  item: object;

  ngOnInit() {
  }
}
