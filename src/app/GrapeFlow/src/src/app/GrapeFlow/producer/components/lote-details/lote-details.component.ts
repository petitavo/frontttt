import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Lote } from '../../model/lote.entity';

@Component({
  selector: 'app-lote-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './lote-details.component.html',
  styleUrls: ['./lote-details.component.css']
})
export class LoteDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<LoteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lote
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
