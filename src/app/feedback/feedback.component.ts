import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../services/feedback.service';
import {SnackBarService} from '../services/snackBar.service';

@Component({
  selector: 'ms-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;

  constructor(private feedbackService: FeedbackService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      feedback: new FormControl(null, [Validators.required])
    });
  }


  addFeedback(): void {
    this.form.disable();
    this.feedbackService.addFeedback(this.form.value).subscribe(response => {
        this.form.reset('');
        this.snackBarService.showSnackBar('Thank you for feedback');
        this.form.enable();
      },
      console.error
  )
    ;
  }
}
