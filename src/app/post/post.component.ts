import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post-service'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit{
  @Input() index: number = 1;
  @Input() post?: Post;
  newComment: any;
  viewCount: number = 0;
  url?: string;
  postRating: number = 0;

  constructor(private postService: PostService, private router: Router) {}

  ngAfterViewInit(): void {
    this.viewCount++;
  }
  ngOnInit(): void {
    console.log(this.post)
    console.log(this.index)
    this.displayPost(this.post);
  }

  displayPost(post: any) {
    this.viewCount++;
  }

  delete(){
    this.postService.deleteButton(this.index);
  }

  onEdit(){
    this.router.navigate(['/post-edit', this.index]);
  }

  onLike(){
    this.postService.onLike(this.index);
  }

  onAngry() {
    if (this.post) {
      this.postService.onAngry(this.index);
    }
  }

  onShare() {
    const duplicatedPost = JSON.parse(JSON.stringify(this.post));
    duplicatedPost.title = '' + duplicatedPost.title;
    this.postService.addPost(duplicatedPost);
  }

  addComment(){
    if (this.newComment && this.post){
      if (!this.post.comments) {
        this.post.comments = [];
      }
      this.post.comments.push(this.newComment);
      this.postService.updatePost(this.index, this.post);
      this.newComment = '';
    }
  }
}