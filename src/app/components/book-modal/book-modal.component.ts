import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-modal',
  imports: [FormsModule ,CommonModule],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent {
  @Input() currentBook: any = {};
  @Input() selectedBook: any = null;
  @Output() save = new EventEmitter<void>();

  saveBook() {
    this.save.emit();
  }
}
