// star-rating.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post.model';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit{
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  listOfPosts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }
  fillStars(index: number): string {
    return index < this.rating ? 'filled' : 'empty';
    this.saveData
  }

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
    this.saveData
  }

  saveData() {
    this.http.put('https://angularez-default-rtdb.firebaseio.com/posts.json', 
    this.listOfPosts)
    .subscribe((res) => {
        console.log(res);
    });
  }

  fetchData() {
    this.http.get<Post[]>('https://angularez-default-rtdb.firebaseio.com/posts.json')
    .subscribe((listofPosts: Post[]) => {
        console.log(listofPosts)
        this.setPosts(listofPosts);
    });
  } 
  setPosts(posts: Post[]): void {
    this.listOfPosts = posts;
  }
}