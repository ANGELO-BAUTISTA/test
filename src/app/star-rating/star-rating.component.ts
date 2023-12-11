// star-rating.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Post } from '../post.model';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit{
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  listOfPosts: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('ratings').valueChanges().subscribe((data: any[]) => {
      if (data.length > 0) {
        this.rating = data[0].rating;
      }
    });
  }
  fillStars(index: number): string {
    return index < this.rating ? 'filled' : 'empty';
  
  }

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
    this.saveRatingToFirestore();
  }

  saveRatingToFirestore(): void {
    this.firestore.collection('ratings').add({
      rating: this.rating
    }).then(() => {
      console.log('Rating saved to Firestore');
    }).catch((error) => {
      console.error('Error saving rating to Firestore', error);
    });
  }
 
  setPosts(posts: Post[]): void {
    this.listOfPosts = posts;
  }
}