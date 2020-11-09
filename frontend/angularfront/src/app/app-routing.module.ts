import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainTableComponent } from './main-table/main-table.component';
import { KontaktComponent } from './kontakt/kontakt.component'


const routes: Routes = [
  { path: '/about', component: AboutComponent },
  { path: '/table', component: MainTableComponent },
  { path: '/kontakt', component: KontaktComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
