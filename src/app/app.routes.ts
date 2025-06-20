import { Routes } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@books/books-catalog/books-catalog').then((c) => c.BooksCatalog),
      },
  {
        path: 'books/:id',
        loadComponent: () => import('@books/book/book').then((c) => c.Book),
      },
];
