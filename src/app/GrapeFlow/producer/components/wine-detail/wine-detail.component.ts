import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {Wine} from "../../model/wine.entity";

@Component({
  selector: 'app-wine-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.css']
})
export class WineDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<WineDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public wine: Wine
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
