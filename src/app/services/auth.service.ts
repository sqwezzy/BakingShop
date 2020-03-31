import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../environments/constant';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${SERVER_URL}user/login`, user).pipe(
      tap(({token}) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${SERVER_URL}user/registration`, user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }
}
