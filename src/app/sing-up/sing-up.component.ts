import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {SnackBarService} from '../services/snackBar.service';

@Component({
  selector: 'ms-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-zА-яЁё]*$/),
        Validators.minLength(3)]),
      surname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-zА-яЁё]*$/),
        Validators.minLength(3)]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*\d)(?=.*[A-Za-zА-Яа-яЁё]).*$/)])
    });
  }

  onSubmit() {
    this.form.disable();
    this.auth.register(this.form.value).subscribe(
      (user) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackBar.showSnackBar(error.error);
        this.form.enable()
      },
    );
  }

}
