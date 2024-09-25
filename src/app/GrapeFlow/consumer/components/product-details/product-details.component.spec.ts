import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailsComponent } from './product-details.component';
import { Product } from '../../model/product.entity';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct: Product = {
    id: '1',
    nombre: 'Vino Tinto Gran Reserva - Valle de Ica',
    descripcion: 'Vino robusto y complejo, con notas intensas de frutos rojos maduros y especias.',
    tipo: 'Vino Tinto',
    region: 'Valle de Ica',
    anio: 2021,
    uvas: 'Malbec, Cabernet Sauvignon',
    pais: 'Perú',
    alcohol: 14.5,
    certificacion: 1, // Asegúrate de que esto sea el tipo correcto
    calificacion: '5',
    estado: 'Disponible',
    productor_id: 'PROD001',
    lote_id: 'L001',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: mockProduct } // Mock de los datos
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data', () => {
    expect(component.data).toEqual(mockProduct);
  });

  it('should close the dialog when onClose is called', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    spyOn(dialogRef, 'close');
    component.onClose();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
