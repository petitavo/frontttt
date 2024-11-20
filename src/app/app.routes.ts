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
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {authenticationGuard} from "./iam/services/authentication.guard";

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'producer', component: SidenavComponent, children: [
      { path: 'home-producer', component: HomeProducerComponent,canActivate: [authenticationGuard] },
      { path: 'clients', component: ClientsComponent,canActivate: [authenticationGuard] },
      { path: 'inventory', component: InventoryComponent,canActivate: [authenticationGuard] },
      { path: 'lote', component: LoteComponent,canActivate: [authenticationGuard] },
      { path: 'orders', component: OrdersComponent,canActivate: [authenticationGuard] },
      { path: 'editClients/:id', component: EditClientsComponent,canActivate: [authenticationGuard] },
      { path: 'detailClients/:id', component: DetailsClientsComponent,canActivate: [authenticationGuard] },
      {path : 'createClients', component: AddClientComponent,canActivate: [authenticationGuard]},
      { path: 'wines', component: WinesComponent,canActivate: [authenticationGuard] }
    ]},

  { path: 'consumer', component: SidenavConsumerComponent, children: [
      { path: 'home-consumer', component: HomeConsumerComponent,canActivate: [authenticationGuard] },
      { path: 'orders', component: ConsumerOrderComponent,canActivate: [authenticationGuard] },
      { path: 'product', component: ProductComponent,canActivate: [authenticationGuard] }
    ]},
  { path: 'sign-in',          component: SignInComponent },
  { path: 'sign-up',          component: SignUpComponent },
];
