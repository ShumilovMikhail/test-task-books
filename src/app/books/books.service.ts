import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { filter, take } from 'rxjs';

import { BookModel } from './books.types';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly url = 'assets/books.json';
  private readonly booksSignal: WritableSignal<BookModel[] | null> = signal(null);
  public readonly books: Signal<BookModel[] | null> = computed(() => this.booksSignal());
  public readonly isLoaded: WritableSignal<boolean> = signal(false);

  constructor() {
    this.loadBooks()
  }

  public loadBooks(): void {
    this.http.get<BookModel[]>(this.url).pipe(take(1)).subscribe((books: BookModel[]) => {
      this.booksSignal.set(books)
      this.isLoaded.set(true)
    });
  }

  public addBook(book: BookModel): void {
    const books = this.booksSignal();
    if(books) {
      const maxId = books.reduce((acc: number,item: BookModel) => acc > item.id ? acc : item.id,0)
      const newBook = {...book,id: maxId + 1 }
      this.booksSignal.set([...books,newBook]);
    }
    else this.booksSignal.set([{...book,id: 0}]);
    console.log(this.books())
  }

  public getBook(id: number): BookModel | null {
    const books = this.booksSignal();
    console.log(books)
    if(!books) return null;
    const book = books.find((book: BookModel) => book.id === id);
    return book ? book : null;
  }
}
