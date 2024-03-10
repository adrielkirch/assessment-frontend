import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup; 
  private unsubscribe$ = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService
  ) {
 
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      alert("Check your e-mail and password, and try again")
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .login(email, password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          alert("Login successful");
        },
        error: (error) => {
          console.error("Login failed:", error);
          alert("E-mail or password incorret(s)")
        },
      });
  }
}
