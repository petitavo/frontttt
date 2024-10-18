import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'; // Importar TranslateModule

@Component({
  selector: 'app-footer-content',
  standalone: true,
  imports: [TranslateModule], // Asegúrate de importar el TranslateModule
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.css'] // Cambiado de "styleUrl" a "styleUrls" (plural)
})
export class FooterContentComponent {}
