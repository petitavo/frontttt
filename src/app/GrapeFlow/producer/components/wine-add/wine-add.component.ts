import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoteService } from '../../services/lote.service';
import { CommonModule } from '@angular/common';
import { WineService } from "../../services/wine.service";
import { Wine } from "../../model/wine.entity";

@Component({
  selector: 'app-wine-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './wine-add.component.html',
  styleUrls: ['./wine-add.component.css']
})
export class WineAddComponent {
  // Instanciamos un nuevo objeto Wine con valores predeterminados
  wine: Wine = new Wine({
    name: '',
    description: '',
    type: '',
    region: '',
    country: '',
    year: 0,
    grapes: '',
    alcohol: 0,
    certification: '',
    rating: 0,
    state: '',
    producerId: '',
    batchId: '',
    link: 'https://example.com/default-image.jpg'
  });
  lotes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<WineAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private winetService: WineService,
    private loteService: LoteService
  ) {
    this.loadLotes();
  }

  loadLotes(): void {
    this.loteService.getAll().subscribe({
      next: (lotes) => this.lotes = lotes,
      error: (error) => console.error('Error loading lotes', error)
    });
  }

  onSave(): void {
    this.wine.producerId = '1';

    this.winetService.create(this.wine).subscribe({
      next: (newWine) => {
        this.dialogRef.close(newWine);
      },
      error: (error) => console.error('Error creating wine', error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
