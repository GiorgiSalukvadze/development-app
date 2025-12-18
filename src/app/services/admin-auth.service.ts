import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly tokenKey = 'admin-session-token';
  private readonly apiUrl = 'http://localhost:4000/auth/login';
  private isAuthed$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.isAuthed$.next(true);
        }
      }),
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
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



