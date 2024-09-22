import { Routes } from '@angular/router';
import {ClientsComponent} from "./GrapeFlow/producer/components/clients/clients.component";
import {InventoryComponent} from "./GrapeFlow/producer/components/inventory/inventory.component";

export const routes: Routes = [
  {path: 'clients', component : ClientsComponent},
  {path: 'inventory', component : InventoryComponent},
];
