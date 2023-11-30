// star-rating.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  fillStars(index: number): string {
    return index < this.rating ? 'filled' : 'empty';
  }

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }
}
