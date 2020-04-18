import {Component, OnInit} from '@angular/core';
import {Feedback} from '../../models/feedback';
import {FeedbackService} from '../../services/feedback.service';
import {SnackBarService} from '../../services/snackBar.service';

@Component({
  selector: 'ms-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  reviews: Feedback[];
  spinner: boolean;
  displayedColumns: string[] = ['id', 'name', 'feedback', 'deleted'];

  constructor(private feedbackService: FeedbackService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.feedbackService.getFeedbacks().subscribe(reviews => {
      this.reviews = reviews;
      this.hideSpinner();
    });
  }

  deleteReview(feedbackId: string) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(response => {
        const index = this.reviews.findIndex(review => review._id === response.feedback._id);
        this.reviews.splice(index, 1);
        this.reviews = this.reviews.slice();
        this.snackBar.showSnackBar(response.message);
      }, console.error
    );
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
