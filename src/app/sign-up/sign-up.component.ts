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
  username: string;
  password: string;

  constructor( private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
  }
  signUp() {
    this.authService.signUp(this.username, this.password).then(() => {
      this.router.navigate(['/sign-in']); // replace '/sign-in' with the route to your sign-in page
      console.log(this.username)
    });
  }
}