import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'BakingShop';

  constructor(private auth: AuthService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ru|en/) ? browserLang : 'ru');
  }


  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
    const potentialUser = JSON.parse(localStorage.getItem('user'));
    if (potentialUser !== null) {
      this.auth.setUser(potentialUser);
    }
  }
}
