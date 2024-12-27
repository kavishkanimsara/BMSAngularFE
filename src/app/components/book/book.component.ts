import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { BookModalComponent } from "../book-modal/book-modal.component";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";
@Component({
  selector: 'app-book',
  imports: [FormsModule, CommonModule, BookModalComponent, ConfirmModalComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  newBook: Book = { title: '', author: '', isbn: '', publicationDate: '' };
  currentBook: Book = { title: '', author: '', isbn: '', publicationDate: '' };
  deleteBookId: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  selectBook(book: Book): void {
    this.selectedBook = { ...book }; 
    this.currentBook = { ...this.selectedBook }; 
  }

   setDeleteBookId(bookId: number): void {
    this.deleteBookId = bookId;
  }

  deleteBook(): void {
    if (this.deleteBookId !== null) {
      this.bookService.deleteBook(this.deleteBookId).subscribe(() => {
        this.loadBooks(); 
        this.deleteBookId = null; 
      });
    }
  }

  saveBook(): void {
    if (this.selectedBook) {
      this.updateBook();
    } else {
      this.createBook();
    }
  }

  createBook(): void {
    this.bookService.createBook(this.currentBook).subscribe(() => {
      this.loadBooks();
      this.resetForm();
    });
  }
  
  updateBook(): void {
    this.bookService.updateBook(this.selectedBook!.id!, this.currentBook).subscribe(() => {
      this.loadBooks();
      this.resetForm();
    });
  }

  resetForm(): void {
    this.selectedBook = null;
    this.currentBook = { title: '', author: '', isbn: '', publicationDate: '' };
  }

  
}
