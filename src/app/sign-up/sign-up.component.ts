import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';
// import { User } from '../post.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string;
  password: string;

  constructor( private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
  }
  signUp() {
    this.authService.signUp(this.email, this.password).then(() => {
      this.router.navigate(['/sign-in']); // replace '/sign-in' with the route to your sign-in page
      console.log(this.email)
    });
  }
}