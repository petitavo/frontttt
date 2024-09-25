import { Component, ViewChild } from '@angular/core';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { FooterContentComponent } from "../footer-content/footer-content.component";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-sidenav-consumer',
  standalone: true,
  imports: [
    MatListItem,
    MatIcon,
    RouterLink,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    MatSidenavModule,
    FooterContentComponent,
    NgOptimizedImage
  ],
  templateUrl: './sidenav-consumer.component.html',
  styleUrls: ['./sidenav-consumer.component.css']
})
export class SidenavConsumerComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Aquí defines la variable userName y le asignas un valor predeterminado
  userName: string = 'Usuario';

  constructor() {
    // Si tienes un sistema de autenticación, puedes obtener el nombre del usuario aquí.
    // Ejemplo: this.userName = authService.getUserName();

    // Simulación de asignación dinámica de un servicio de autenticación
    this.loadUserName();
  }

  // Simulamos una función que obtiene el nombre del usuario desde algún servicio
  loadUserName() {
    // Aquí deberías obtener el nombre del usuario de un servicio real.
    // Por ejemplo, si tienes un servicio de autenticación, podrías hacer algo así:
    // this.userName = this.authService.getUserName();

    // Para propósitos de prueba, simulamos la carga del nombre de usuario.
    this.userName = 'Gino';  // Cambia este valor según la lógica de tu aplicación.
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  logout() {
    console.log("Sesión cerrada");
    window.location.href = '/login'; // Redirigir al login
  }
}
