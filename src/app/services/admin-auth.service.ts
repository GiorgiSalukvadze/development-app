import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly tokenKey = 'admin-session-token';
  private readonly defaultUser = { username: 'admin', password: 'admin123' };
  private isAuthed$ = new BehaviorSubject<boolean>(this.hasToken());

  login(username: string, password: string): Observable<boolean> {
    const ok = username === this.defaultUser.username && password === this.defaultUser.password;
    if (ok) {
      localStorage.setItem(this.tokenKey, 'logged-in');
      this.isAuthed$.next(true);
    } else {
      this.logout();
    }
    return of(ok);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthed$.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthed$.asObservable();
  }

  private hasToken(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }
}



