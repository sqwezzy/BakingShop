import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ms-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 53.9116692;
  lng: number = 27.633695413481778;
  zoom: number = 17;
  constructor() {
  }

  ngOnInit() {
  }
}
