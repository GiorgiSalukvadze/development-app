import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  authMessage = '';
  isLoading = false;
  returnUrl: string = '/admin';

  constructor(
    private fb: FormBuilder,
    private authService: AdminAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['admin123', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get return URL from query params, default to /admin
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    
    // If already authenticated, redirect to return URL or admin dashboard
    this.authService.isAuthenticated().subscribe(isAuthed => {
      if (isAuthed) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.authMessage = 'Please enter credentials.';
      return;
    }

    this.isLoading = true;
    this.authMessage = '';

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(ok => {
      this.isLoading = false;
      if (ok) {
        // Redirect to return URL or default to /admin
        this.router.navigate([this.returnUrl]);
      } else {
        this.authMessage = 'Invalid credentials.';
      }
    });
  }
}

