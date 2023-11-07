import { Injectable } from '@angular/core';
import { PostService } from './post-service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {  tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

  saveData(){
    const listofPosts: Post[] = this.postService.getPost();
    this.http.put('https://angularez-default-rtdb.firebaseio.com/posts.json', listofPosts)
    .subscribe((res) => {
      console.log(res);
    })
  }

  fetchData(){
    return this.http.get<Post[]>('https://angularez-default-rtdb.firebaseio.com/posts.json')
    .pipe(tap((listofPosts: Post[])=> {
      console.log(listofPosts)

      listofPosts.forEach(post => {
        if (!Array.isArray(post.comments)) {
          post.comments = [];
        }
      });
      
      this.postService.setPosts(listofPosts);
      this.postService.listChangedEvent.emit(listofPosts);
    }))
    .subscribe();
  }
}