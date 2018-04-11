import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatSnackBarModule, MatIconModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule],
  exports: [CommonModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule],
})
export class CustomMaterialModule { }
