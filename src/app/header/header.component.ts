// header.component.ts
import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post-service';
import { NotificationService } from '../notification.service';  // Add this line

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

  constructor(
    private backEndService: BackEndService,
    private postService: PostService,
    private notificationService: NotificationService  // Add this line
  ) {
    this.searchKeyword = '';
  }

  ngOnInit(): void {
    this.notificationService.newPost$.subscribe(() => {
      this.showNotification();
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

  searchPosts() {
    if (this.searchKeyword && this.searchKeyword.trim() !== '') {
      this.filteredPosts = this.posts.filter((post) => {
        return post.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
      });
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
