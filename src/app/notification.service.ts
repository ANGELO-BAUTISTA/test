// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private newPostSubject = new Subject<void>();

  newPost$ = this.newPostSubject.asObservable();

  notifyNewPost() {
    this.newPostSubject.next();
  }
}
