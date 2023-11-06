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
  

  constructor(private postService: PostService, private backEndService: BackEndService) {}

  ngOnInit(): void {
    this.fetchData();
    // this.postService.listChangedEvent.subscribe((newlistOfPost: Post[]) => {
    //   this.listOfPosts = newlistOfPost;
    // });
  }
 private fetchData(){
    this.backEndService.fetchData().subscribe(( Posts) =>{
      this.listOfPosts = Posts;
  });
    
  }
}


