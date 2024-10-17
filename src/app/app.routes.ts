import { Routes } from '@angular/router';
import {SidenavComponent} from "./public/sidenav/sidenav.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";
import { ClientsComponent } from './GrapeFlow/producer/components/clients/clients.component';
import { InventoryComponent } from './GrapeFlow/producer/components/inventory/inventory.component';
import { LoteComponent } from './GrapeFlow/producer/components/lote/lote.component';
import { DetailsClientsComponent } from './GrapeFlow/producer/components/details-clients/details-clients.component';
import { EditClientsComponent } from './GrapeFlow/producer/components/edit-clients/edit-clients.component';
import { AddClientComponent } from './GrapeFlow/producer/components/add-client/add-client.component';
import { OrdersComponent } from './GrapeFlow/producer/components/orders/orders.component';
import { HomeProducerComponent } from './GrapeFlow/producer/components/home-producer/home-producer.component';
import { HomeConsumerComponent } from './GrapeFlow/consumer/components/home-consumer/home-consumer.component';
import { ConsumerOrderComponent } from './GrapeFlow/consumer/pages/consumer-order/consumer-order.component';
import { ProductComponent } from './GrapeFlow/consumer/pages/product/product.component';
import { WinesComponent } from "./GrapeFlow/producer/pages/wines/wines/wines.component";

export const routes: Routes = [
  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas del Productor
  { path: 'producer', component: SidenavComponent, children: [
      { path: 'home-producer', component: HomeProducerComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'lote', component: LoteComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'editClients/:id', component: EditClientsComponent },
      { path: 'detailClients/:id', component: DetailsClientsComponent },
      { path: 'wines', component: WinesComponent }
    ]},

  // Rutas del Consumidor
  { path: 'consumer', component: SidenavConsumerComponent, children: [
      { path: 'home-consumer', component: HomeConsumerComponent },
      { path: 'orders', component: ConsumerOrderComponent },
      { path: 'product', component: ProductComponent }
    ]}
];
