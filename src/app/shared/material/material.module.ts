import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatDialog,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatListModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
  ],
  exports: [
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatListModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
  ],
  declarations: [],
  providers: [
    MatDialog
  ]
})
export class MaterialModule { }
