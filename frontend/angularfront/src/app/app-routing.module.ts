import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainTableComponent } from './main-table/main-table.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { CreateComponent } from './create/create.component'


const routes: Routes = [
  { path: '', component: MainTableComponent },
  { path: 'about', component: AboutComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'create', component: CreateComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
