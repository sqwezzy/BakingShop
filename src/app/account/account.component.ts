import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ms-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private modal: MatDialog,
              public modalRef: MatDialogRef<AccountComponent>,
              @Inject(MAT_DIALOG_DATA) public isAuth: boolean) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

   private logOut() {
    this.authService.logout();
    this.user = null;
  }

  private goToLoginPage(): void {
    this.modal.closeAll();
    this.router.navigate(['login']);
  }

  private closeModal(): void {
    this.modal.closeAll();
  }
}
