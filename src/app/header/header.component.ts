import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../services/cart.service';
import {MatDialog} from '@angular/material';
import {CartModalComponent} from '../modal-windows/cart-modal/cart-modal.component';
import {AuthService} from '../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {AccountComponent} from '../account/account.component';
import {AddCategoryModalComponent} from '../modal-windows/add-category-modal/add-category-modal.component';


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

  @Input('openedSidNav') opened;
  @Output() public childEvent = new EventEmitter();
  countDishInCart: number;
  isAuth = false;

  constructor(private cartService: CartService,
              private modal: MatDialog,
              private authService: AuthService,
              public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'ru');

  }

  ngOnInit() {
    this.authService.isAuthenticated();
    this.cartService.countDishInCart$.subscribe(count => {
      this.countDishInCart = count;
    });
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  openCart() {
    this.modal.open(CartModalComponent);
  }

  fireEvent() {
    this.childEvent.emit(!this.opened);
  }

  openAccount() {
    const modalRef = this.modal.open(AccountComponent, {
        data: this.isAuth,
      }
    );
    modalRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        this.isAuth = result;
      }
    });
  }
}
