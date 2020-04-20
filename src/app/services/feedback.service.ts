import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {Observable, ObservedValueOf} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../environments/environment';
import {Feedback} from '../shared/models/feedback';

@Injectable({
  providedIn: 'root',
})

export class FeedbackService {
  constructor(private http: HttpClient) {
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${SERVER_URL}feedbacks`);
  }

  addFeedback(newFeedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${SERVER_URL}feedbacks`, newFeedback);
  }

  deleteFeedback(feedbackId: string): Observable<{message: string, feedback: Feedback}> {
    return this.http.delete<{message: string, feedback: Feedback}>(`${SERVER_URL}feedbacks/${feedbackId}`);
  }

}
