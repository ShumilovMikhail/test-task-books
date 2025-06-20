import { Component,ChangeDetectionStrategy, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';

import { BooksCatalogAddModal } from './books-catalog-add-modal/books-catalog-add-modal';
import { BookModel } from '@books/books.types';

@Component({
  selector: 'app-books-catalog-add',
  imports: [MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './books-catalog-add.html',
  styleUrl: './books-catalog-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalogAdd {
  public readonly addEvent = output<BookModel>();
  readonly dialog = inject(MatDialog);

  public openDialog() {
    const dialogRef = this.dialog.open(BooksCatalogAddModal, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((value: BookModel | null) => {
      if(value) this.addEvent.emit(value)
    })
  }
}
