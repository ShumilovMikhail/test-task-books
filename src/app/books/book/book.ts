import { ChangeDetectionStrategy,Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, Observable, take } from 'rxjs';

import { BooksService } from '@books/books.service';
import { BookModel } from '@books/books.types';

@Component({
  selector: 'app-book',
  imports: [RouterLink],
  templateUrl: './book.html',
  styleUrl: './book.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Book implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router)
  private readonly booksService = inject(BooksService);
  private readonly isLoaded: Observable<boolean> = toObservable(this.booksService.isLoaded);
  protected book: WritableSignal<BookModel | null> = signal(null);

  public ngOnInit(): void {
    this.isLoaded.pipe(filter((value) => value), take(1)).subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if(id === null || isNaN(+id)) {
        this.router.navigateByUrl('/');
        return
      }
      const book = this.booksService.getBook(+id);
      if(!book) {
        this.router.navigateByUrl('/')
        return
      };
      this.book.set(book)
    })
  }
}
