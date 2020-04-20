import {Injectable} from '@angular/core';
import {User} from '../shared/models/user';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUserSubject = new BehaviorSubject<User>(null);
  authUser$ = this.authUserSubject.asObservable();
  private token = null;
  user: User;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${SERVER_URL}user/login`, user).pipe(
      tap((response) => {
        localStorage.setItem('auth-token', response.token);
        this.setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.setUser(response.user);
        this.authUserSubject.next(response.user);
      }),
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

  setUser(user: User): void {
    this.user = user;
    this.authUserSubject.next(user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  logout() {
    this.setToken(null);
    this.authUserSubject.next(null);
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  }
}
