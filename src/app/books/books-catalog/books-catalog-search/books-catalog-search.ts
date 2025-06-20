import { ChangeDetectionStrategy,Component, output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-books-catalog-search',
  imports: [MatFormFieldModule,MatIconModule,MatInputModule],
  templateUrl: './books-catalog-search.html',
  styleUrl: './books-catalog-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalogSearch {
  public inputEvent = output<string>();

  public onInput(event: Event): void {
    this.inputEvent.emit((event.target as HTMLInputElement).value);
  }
}
