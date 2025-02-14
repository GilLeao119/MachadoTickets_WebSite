import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { EventsListComponent } from './components/events-list/events-list.component';
import { TicketCreateComponent } from './components/ticket-create/ticket-create.component';
import { TicketShowComponent } from './components/ticket-show/ticket-show.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { DataTablesModule } from 'angular-datatables';
import { CartComponent } from './pages/cart/cart.component';
import { AuthRestServiceService } from './services/auth-rest-service.service';


import { CartService } from './services/cart/cart.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageEventComponent } from './components/image-event/image-event.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GraficosComponent } from './components/graficos/graficos.component';


@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    LoginComponent,
    EventsListComponent,
    TicketCreateComponent,
    TicketShowComponent,
    TicketListComponent,
    CartComponent,
    ImageEventComponent,
    HeaderComponent,
    UserDetailsComponent,
    GraficosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true,},CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
