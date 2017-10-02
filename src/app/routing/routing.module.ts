import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { OrderDashboardComponent } from '../order-dashboard/order-dashboard.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ArchiveComponent } from '../archive/archive.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },  
  { path: 'dashboard', component: OrderDashboardComponent },  
  { path: 'archive', component:  ArchiveComponent },  
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
