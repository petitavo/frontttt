import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './public/sidenav/sidenav.component';
import {ClientsComponent} from "./GrapeFlow/producer/pages/clients/clients.component";
import {LoteComponent} from "./GrapeFlow/producer/pages/lote/lote.component";
import {SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";
import {InventoryComponent} from "./GrapeFlow/producer/pages/inventory/inventory.component";
import {FooterContentComponent} from "./public/footer-content/footer-content.component";
import { ProductComponent} from "./GrapeFlow/consumer/pages/product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ClientsComponent, LoteComponent, SidenavConsumerComponent, InventoryComponent, FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FontEnd-VillaSystem';
}
