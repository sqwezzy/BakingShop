import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    RatingComponent,
    NgbRating,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingComponent,
    NgbRating,
  ]
})
export class SharedModule { }
