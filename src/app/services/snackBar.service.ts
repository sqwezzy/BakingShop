import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
