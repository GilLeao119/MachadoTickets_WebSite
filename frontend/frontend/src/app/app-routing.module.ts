import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './components/login/login.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { TicketCreateComponent } from './components/ticket-create/ticket-create.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'events-list',
    component: EventsListComponent
  },
  {
    path: 'ticket-create/:id',
    component: TicketCreateComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
  },
  {
    path: 'graf',
    component: GraficosComponent
  },
  {
    path: 'ticket-list',
    component: TicketListComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
