import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './public/sidenav/sidenav.component';
import {ClientsComponent} from "./GrapeFlow/producer/components/clients/clients.component";
import {LoteComponent} from "./GrapeFlow/producer/components/lote/lote.component";
import {SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";
import { ProductComponent} from "./GrapeFlow/consumer/components/product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductComponent, SidenavComponent, ClientsComponent, LoteComponent, SidenavConsumerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FontEnd-VillaSystem';
}
