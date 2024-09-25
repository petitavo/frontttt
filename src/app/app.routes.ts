import { Routes } from '@angular/router';
import {ClientsComponent} from "./GrapeFlow/producer/components/clients/clients.component";
import {InventoryComponent} from "./GrapeFlow/producer/components/inventory/inventory.component";
import {LoteComponent} from "./GrapeFlow/producer/components/lote/lote.component";
import {DetailsClientsComponent} from "./GrapeFlow/producer/components/details-clients/details-clients.component";
import {EditClientsComponent} from "./GrapeFlow/producer/components/edit-clients/edit-clients.component";
import {AddClientComponent} from "./GrapeFlow/producer/components/add-client/add-client.component";
import {OrdersComponent} from "./GrapeFlow/producer/components/orders/orders.component";
import {ProductComponent} from "./GrapeFlow/consumer/components/product/product.component";
import {ProductDetailsComponent} from "./GrapeFlow/consumer/components/product-details/product-details.component";

export const routes: Routes = [
  {path: 'clients', component : ClientsComponent},
  {path: 'wines', component : ProductComponent},
  {path: 'details-product/:id', component: ProductDetailsComponent },
  {path: 'inventory', component : InventoryComponent},
  {path: 'lote', component: LoteComponent},
  {path: 'details-clients/:id', component: DetailsClientsComponent},
  {path: 'edit-clients/:id', component: EditClientsComponent},
  {path: 'add-client', component: AddClientComponent},
  {path: 'orders', component: OrdersComponent },
];

