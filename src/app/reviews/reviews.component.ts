import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../services/feedback.service';
import {Feedback} from '../models/feedback';

@Component({
  selector: 'ms-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Feedback[];
  spinner: boolean;

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.feedbackService.getFeedbacks().subscribe(feedbacks => {
      this.reviews = feedbacks;
      this.hideSpinner();
    });
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }

}
