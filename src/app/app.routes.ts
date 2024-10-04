import { Routes } from '@angular/router';
import { LoginComponent} from "./public/login/login.component"; // Importa el LoginComponent
import { SidenavComponent} from "./public/sidenav/sidenav.component";
import { SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";
import { ClientsComponent } from "./GrapeFlow/producer/pages/clients/clients.component";
import { InventoryComponent } from "./GrapeFlow/producer/pages/inventory/inventory.component";
import { LoteComponent } from "./GrapeFlow/producer/pages/lote/lote.component";
import { ConsumerOrderComponent } from "./GrapeFlow/consumer/pages/consumer-order/consumer-order.component";
import {ProductComponent} from "./GrapeFlow/consumer/pages/product/product.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'producer', component: SidenavComponent, children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'lote', component: LoteComponent },
      {path: 'orders', component: ConsumerOrderComponent}
    ]},
  { path: 'consumer', component: SidenavConsumerComponent, children: [
      { path: 'orders', component: ConsumerOrderComponent },
      { path: 'product', component: ProductComponent },
      // Otras rutas de consumidor...
    ]}
];

