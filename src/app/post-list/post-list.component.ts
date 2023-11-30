import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model'; 
import { PostService } from '../post-service'; 
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = []; 
  searchResult: Post[] = [];
  pageSize: number = 1; // Number of posts to display per page
  currentPage: number = 1;

  constructor(private postService: PostService, private backEndService: BackEndService) {}

  ngOnInit(): void {
    this.listOfPosts = this.postService.getPost();
    this.postService.listChangedEvent.subscribe((posts: Post[]) => {
      this.listOfPosts = posts;

      this.postService.searchResults.subscribe(results => {
        this.searchResult = results;
      });
    });
  }

  nextPage() {
    if (this.currentPage < this.getPageNumbers().length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedPosts(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.listOfPosts.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.listOfPosts.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
