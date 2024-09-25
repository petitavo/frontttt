import { Routes } from '@angular/router';
import {ClientsComponent} from "./GrapeFlow/producer/components/clients/clients.component";
import {InventoryComponent} from "./GrapeFlow/producer/components/inventory/inventory.component";
import {LoteComponent} from "./GrapeFlow/producer/components/lote/lote.component";
import {DetailsClientsComponent} from "./GrapeFlow/producer/components/details-clients/details-clients.component";
import {EditClientsComponent} from "./GrapeFlow/producer/components/edit-clients/edit-clients.component";
import {AddClientComponent} from "./GrapeFlow/producer/components/add-client/add-client.component";
import {LoteAddComponent} from "./GrapeFlow/producer/components/lote-add/lote-add.component";
import {OrdersComponent} from "./GrapeFlow/producer/components/orders/orders.component";
import {SidenavComponent} from "./public/sidenav/sidenav.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {SidenavConsumerComponent} from "./public/sidenav-consumer/sidenav-consumer.component";

export const routes: Routes = [
  {path: 'clients', component : ClientsComponent},
  {path: 'inventory', component : InventoryComponent},
  {path: 'lote', component: LoteComponent},
  {path: 'details-clients/:id', component: DetailsClientsComponent},
  {path: 'edit-clients/:id', component: EditClientsComponent},
  {path: 'add-client', component: AddClientComponent},
  { path: 'orders', component: OrdersComponent },
  { path: 'SideNav', component: SidenavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'consumerSidenav', component: SidenavConsumerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

