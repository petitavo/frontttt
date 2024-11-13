import { Routes } from '@angular/router';
import { LoginComponent} from "./public/login/login.component";
import { SidenavComponent} from "./public/sidenav/sidenav.component";
import { SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";
import { ClientsComponent } from "./GrapeFlow/producer/pages/clients/clients.component";
import { InventoryComponent } from "./GrapeFlow/producer/pages/inventory/inventory.component";
import { LoteComponent } from "./GrapeFlow/producer/pages/lote/lote.component";
import { ConsumerOrderComponent } from "./GrapeFlow/consumer/pages/consumer-order/consumer-order.component";
import {ProductComponent} from "./GrapeFlow/consumer/pages/product/product.component";
import {EditClientsComponent} from "./GrapeFlow/producer/components/edit-clients/edit-clients.component";
import {DetailsClientsComponent} from "./GrapeFlow/producer/components/details-clients/details-clients.component";
import {WinesComponent} from "./GrapeFlow/producer/pages/wines/wines/wines.component";
import {RegisterComponent} from "./public/register/register.component";
import {HomeProducerComponent} from "./GrapeFlow/producer/components/home-producer/home-producer.component";
import {OrdersComponent} from "./GrapeFlow/producer/pages/orders/orders.component";
import {HomeConsumerComponent} from "./GrapeFlow/consumer/components/home-consumer/home-consumer.component";
import {AddClientComponent} from "./GrapeFlow/producer/components/add-client/add-client.component";

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'producer', component: SidenavComponent, children: [
      { path: 'home-producer', component: HomeProducerComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'lote', component: LoteComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'editClients/:id', component: EditClientsComponent },
      { path: 'detailClients/:id', component: DetailsClientsComponent },
      {path : 'createClients', component: AddClientComponent},
      { path: 'wines', component: WinesComponent }
    ]},

  { path: 'consumer', component: SidenavConsumerComponent, children: [
      { path: 'home-consumer', component: HomeConsumerComponent },
      { path: 'orders', component: ConsumerOrderComponent },
      { path: 'product', component: ProductComponent }
    ]}
];
