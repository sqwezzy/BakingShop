import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../services/feedback.service';
import {Feedback} from '../models/feedback';
import {InternalServerPageComponent} from '../error-pages/internal-server-page/internal-server-page.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ms-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Feedback[];
  spinner: boolean;

  constructor(private feedbackService: FeedbackService,
              private modal: MatDialog) {
  }

  ngOnInit() {
    this.showSpinner();
    this.feedbackService.getFeedbacks().subscribe(feedbacks => {
      this.reviews = feedbacks;
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      console.error();
    });
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }

}
