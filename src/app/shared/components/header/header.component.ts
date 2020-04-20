import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasketService} from '../../../services/basket.service';
import {MatDialog} from '@angular/material';
import {BasketModalComponent} from '../modal-windows/basket-modal/basket-modal.component';
import {AuthService} from '../../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {AccountComponent} from '../account/account.component';
import {User} from '../../models/user';
import {Router} from '@angular/router';


@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  styles: [`
    .authorization {
      color: rgb(255 234 59)
    }`]
})
export class HeaderComponent implements OnInit {

  countDishInCart: number;
  user: User;
  isAuth: boolean;
  browserLang: string;

  constructor(private basketService: BasketService,
              private modal: MatDialog,
              private authService: AuthService,
              public translate: TranslateService,
              private router: Router,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    this.browserLang = translate.getBrowserLang();
    translate.use(this.browserLang.match(/en|ru/) ? this.browserLang : 'ru');

  }

  ngOnInit() {
    this.basketService.countDishInBasket$.subscribe(count => {
      this.countDishInCart = count;
    });
    this.authService.authUser$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  openCart() {
    this.modal.open(BasketModalComponent);
  }

  openAccount() {
    const modalRef = this.modal.open(AccountComponent, {
        data: this.isAuth,
      }
    );
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAuth = result;
      }
    });
  }
}
