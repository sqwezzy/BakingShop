import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {HttpClientModule} from '@angular/common/http';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let authService: AuthService;
    let spy: jasmine.Spy;
    let mockUser: User;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        declarations: [HeaderComponent],
        providers: [AuthService]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      authService = fixture.debugElement.injector.get(AuthService);
      mockUser = {
        email: 'test@test',
        name: 'test',
        surname: 'test',
        isAdmin: false,
        password: 'qwerty'
      };
      spy = spyOn(authService, 'getUser').and.returnValue(mockUser);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should call auth service', () => {
      component.ngOnInit();
      expect(spy.calls.any()).toBeTruthy();
    });
    it('should get user', () => {
      component.ngOnInit();
      expect(component.user).toEqual(mockUser);
    });
  }
);
