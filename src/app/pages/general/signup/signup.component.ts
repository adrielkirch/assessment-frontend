import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    const isLoggedIn =  this.authService.isLoggedIn();
    if(isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      alert("Check your e-mail and password, and try again.");
      return;
    }

    const { email, password } = this.signupForm.value;

    this.authService
      .signup(email, password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          alert("Signup successfully");
          this.router.navigate(['/login']);
        },
        error: () => {
          alert("Could not create an account try a different email.");
        },
      });
  }
}
