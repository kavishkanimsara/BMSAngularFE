import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Output() confirmDelete = new EventEmitter<void>(); 
  deleteBook() {
    this.confirmDelete.emit(); 
  }
}
