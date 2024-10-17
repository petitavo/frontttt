import { Component, ViewChild } from '@angular/core';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { FooterContentComponent } from "../footer-content/footer-content.component";

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
    FooterContentComponent
  ],
  templateUrl: './sidenav-consumer.component.html',
  styleUrls: ['./sidenav-consumer.component.css']
})
export class SidenavConsumerComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  logout() {
    console.log("Sesión cerrada");
  }
}
