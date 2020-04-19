import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '../../services/snackBar.service';
import {MatDialog} from '@angular/material';
import {AccountComponent} from '../../shared/components/account/account.component';
import {HttpErrorResponse} from '@angular/common/http';
import {InternalServerPageComponent} from '../error-pages/internal-server-page/internal-server-page.component';

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
              public modal: MatDialog,) {
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
      (response) => {
        this.router.navigate(['/catalog']);
        this.snackBar.showSnackBar(`Hello, ${response.user.name}`);
      },
      (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
        this.form.enable();
      }
    );
  }

}
