import { ChangeDetectionStrategy,Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { RouterLink } from '@angular/router';

import { BooksService } from '@books/books.service';
import { BookModel } from '@books/books.types';
import { TruncatePipe } from 'app/share/pipes/truncate-pipe';
import { BooksCatalogSearch } from './books-catalog-search/books-catalog-search';
import { BooksCatalogAdd } from './books-catalog-add/books-catalog-add';


@Component({
  selector: 'app-books-catalog',
  imports: [MatCardModule,MatChipsModule,TruncatePipe, BooksCatalogSearch,BooksCatalogAdd, RouterLink],
  templateUrl: './books-catalog.html',
  styleUrl: './books-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalog {
  private readonly booksService = inject(BooksService);
  protected readonly books: Signal<BookModel[] | null> = this.booksService.books;
  protected readonly query: WritableSignal<string> = signal('');
  protected readonly filteredBooks: Signal<BookModel[] | null> = computed(() => {
    const query = this.query()?.toLowerCase().trim() ?? '';
    if (!query) return this.books();

    return this.books()?.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    ) || null;
  });

  public onAddBook(book: BookModel): void {
    this.booksService.addBook(book);
  }
}
