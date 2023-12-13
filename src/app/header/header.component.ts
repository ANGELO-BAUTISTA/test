// header.component.ts
import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post-service';
import { NotificationService } from '../notification.service'; 
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Add this line

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showNotificationFlag: boolean = false;
  searchKeyword: string = "";
  filteredPosts: any[] = [];
  posts: any[] = [];
  user$ = this.authService.user$;
  
  constructor(
    private backEndService: BackEndService,
    private postService: PostService,
    private notificationService: NotificationService,
    private authService: AuthService,  
    private router: Router
  ) {
    this.searchKeyword = '';
  }

  ngOnInit(): void {
    this.notificationService.newPost$.subscribe(() => {
      this.showNotification();
    });
    this.postService.searchResults.subscribe((filteredPosts: any[]) => {
      this.filteredPosts = filteredPosts;
    });
  }

  showNotification() {
    this.showNotificationFlag = true;

    // Hide the notification after a certain time (e.g., 3 seconds)
    setTimeout(() => {
      this.showNotificationFlag = false;
    }, 4000);
  }

  onSave() {
    this.backEndService.saveData();
  }

  onFetch() {
    this.backEndService.fetchData();
  }
   logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  searchPosts() {
    this.postService.searchPosts(this.searchKeyword);
}
}
