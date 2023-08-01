import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    errorMessage?: string;
    hide = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { 
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.valid) {
    
        this.loading = true;
        this.accountService.login(this.loginForm.value?.username, this.loginForm.value?.password)
            .pipe(first())
            .subscribe({
                next: () => {
                    // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    // this.router.navigateByUrl(returnUrl);
                    this.router.navigate(['/success']);
                },
                error: () => {
                    this.loading = false;
                }
            });
        }
        else {
            this.errorMessage = '';
        }
    }
}

