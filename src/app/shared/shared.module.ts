import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';
import {FilterByNamePipe} from '../pipes/fiterByName.pipe';



@NgModule({
  declarations: [
    RatingComponent,
    NgbRating,
    FilterByNamePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingComponent,
    NgbRating,
    FilterByNamePipe
  ]
})
export class SharedModule { }
