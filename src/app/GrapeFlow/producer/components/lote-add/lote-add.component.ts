import { Component, Inject } from '@angular/core';
import { LoteService } from "../../services/lote.service";
import { Lote } from "../../model/lote.entity";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from "@angular/material/core"; // Proveedor de fechas nativas

@Component({
  selector: 'app-lote-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },  // Usa NativeDateAdapter como proveedor
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
  templateUrl: './lote-add.component.html',
  styleUrl: './lote-add.component.css'
})
export class LoteAddComponent {
  lote: Lote = new Lote();

  constructor(
    public dialogRef: MatDialogRef<LoteAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loteService: LoteService
  ) {}

  onSave(): void {
    this.lote.producerId = "1"; // Asignar un id temporal por ahora
    this.lote.grape = `🍇 ${this.lote.grape.trim()} 🍇`; // Asignar uva temporal

    // Obtener los lotes y calcular el siguiente batchNumber
    this.loteService.getAll().subscribe(
      (lotes) => {
        // Filtrar solo los batchNumbers válidos (convertidos a números)
        const validBatchNumbers = lotes
          .map(lote => parseInt(lote.batchNumber, 10)) // Convertir a número
          .filter(num => !isNaN(num)); // Filtrar los NaN

        // Si no hay lotes existentes, asignar 1
        const maxBatchNumber = validBatchNumbers.length > 0 ? Math.max(...validBatchNumbers) : 0;

        // Asignar el siguiente batchNumber
        this.lote.batchNumber = (maxBatchNumber + 1).toString();

        // Convierte la fecha a formato yyyy-MM-dd
        if (this.lote.starDate) {
          const date = new Date(this.lote.starDate);
          this.lote.starDate = date.toISOString().split('T')[0]; // Extrae solo la parte de la fecha
        }

        const loteToSave = {
          batchNumber: this.lote.batchNumber,
          grape: this.lote.grape,
          starDate: this.lote.starDate,
          litersQuantity: this.lote.litersQuantity,
          ph: this.lote.ph,
          temperature: this.lote.temperature,
          producerId: this.lote.producerId,
          processStatus: this.lote.processStatus
        };

        console.log('Datos del lote antes de enviar:', loteToSave);

        // Llamada para guardar el nuevo lote
        this.loteService.create(loteToSave).subscribe(
          (newLote) => {
            this.dialogRef.close(newLote); // Cierra el diálogo y devuelve el nuevo lote
          },
          (error) => {
            console.error('Error al crear lote', error);
            alert('Hubo un error al crear el lote. Por favor, revisa los datos.');
          }
        );
      },
      (error) => {
        console.error('Error al obtener lotes', error);
      }
    );
  }




  onCancel(): void {
    this.dialogRef.close();
  }
}
