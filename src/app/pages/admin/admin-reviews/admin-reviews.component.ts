import {Component, OnInit} from '@angular/core';
import {Feedback} from '../../../models/feedback';
import {FeedbackService} from '../../../services/feedback.service';
import {SnackBarService} from '../../../services/snackBar.service';
import {InternalServerPageComponent} from '../../error-pages/internal-server-page/internal-server-page.component';
import {MatDialog} from '@angular/material';

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
              private snackBar: SnackBarService,
              private modal: MatDialog) {
  }

  ngOnInit() {
    this.showSpinner();
    this.feedbackService.getFeedbacks().subscribe(reviews => {
      this.reviews = reviews;
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
    });
  }

  deleteReview(feedbackId: string) {
    this.showSpinner();
    this.feedbackService.deleteFeedback(feedbackId).subscribe(response => {
        const index = this.reviews.findIndex(review => review._id === response.feedback._id);
        this.reviews.splice(index, 1);
        this.reviews = this.reviews.slice();
        this.snackBar.showSnackBar(response.message);
        this.hideSpinner();
      }, (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
      }
    );
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
