import { ChangeDetectionStrategy,Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-catalog-add-modal',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule,MatInputModule, ReactiveFormsModule],
  templateUrl: './books-catalog-add-modal.html',
  styleUrl: './books-catalog-add-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCatalogAddModal {
  private readonly dialogRef = inject(MatDialogRef);
  protected readonly bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    year: new FormControl(new Date().getFullYear()),
    genre: new FormControl(''),
    description: new FormControl('')
  });

  public close(): void {
    this.dialogRef.close(null);
  }

  public submit(): void {
    if(this.bookForm.valid) this.dialogRef.close(this.bookForm.value);
  }
}
