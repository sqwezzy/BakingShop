import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '../services/snackBar.service';
import {MatDialog} from '@angular/material';
import {AccountComponent} from '../account/account.component';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: SnackBarService,
              public modal: MatDialog) {
  }

  ngOnInit() {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      }
    );
    this.route.queryParams.subscribe(params => {
       if (params['sessionFailed']) {
        this.snackBar.showSnackBar('This session failed, please login in system anew');
      }
    });
  }

  onSubmit() {
    this.form.disable();
    this.auth.login(this.form.value).subscribe(
      (message) => {
        this.router.navigate(['/catalog']);
        this.modal.open(AccountComponent);
      },
      (error) => {
        this.snackBar.showSnackBar(error.error);
        this.form.enable();
      }
    );
  }

}
