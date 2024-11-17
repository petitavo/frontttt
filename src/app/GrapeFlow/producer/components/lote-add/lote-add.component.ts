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
    MatDialogTitle
  ],
  templateUrl: './lote-add.component.html',
  styleUrl: './lote-add.component.css'
})
export class LoteAddComponent {
  lote: Lote = new Lote(); // Inicializar un nuevo lote

  constructor(
    public dialogRef: MatDialogRef<LoteAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loteService: LoteService // Inyectamos el servicio LoteService
  ) {}

  onSave(): void {

    // Crear el objeto a enviar al backend, sin el campo 'id' ya que lo genera el backend
    const loteToSave = {
      batchNumber: this.lote.batchNumber,
      grape: this.lote.grape,
      starDate: this.lote.starDate, // Mantén la fecha como string
      litersQuantity: this.lote.litersQuantity,
      ph: this.lote.ph,
      temperature: this.lote.temperature,
      producerId: this.lote.producerId,
      processStatus: this.lote.processStatus
    };

    console.log('Datos del lote antes de enviar:', loteToSave); // Verifica los datos

    // Llamada al backend para crear el lote
    this.loteService.create(loteToSave).subscribe(newLote => {
      this.dialogRef.close(newLote); // Cierra el diálogo y devuelve el nuevo lote
    }, error => {
      console.error('Error al crear lote', error); // Maneja el error
      alert('Hubo un error al crear el lote. Por favor, revisa los datos.');
    });
  }




  onCancel(): void {
    this.dialogRef.close();
  }
}
