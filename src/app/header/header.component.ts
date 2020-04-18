import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../services/cart.service';
import {MatDialog} from '@angular/material';
import {CartModalComponent} from '../modal-windows/cart-modal/cart-modal.component';
import {AuthService} from '../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {AccountComponent} from '../account/account.component';
import {AddCategoryModalComponent} from '../modal-windows/add-category-modal/add-category-modal.component';
import {User} from '../models/user';
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

  constructor(private cartService: CartService,
              private modal: MatDialog,
              private authService: AuthService,
              public translate: TranslateService,
              private router: Router,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'ru');

  }

  ngOnInit() {
    this.cartService.countDishInCart$.subscribe(count => {
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
    this.modal.open(CartModalComponent);
  }
  openAccount() {
    const modalRef = this.modal.open(AccountComponent, {
        data: this.isAuth,
      }
    );
    modalRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.isAuth = result;
      }
    });
  }

  private goToAdminPage():void {
    this.router.navigate(['admin']);
  }
}
