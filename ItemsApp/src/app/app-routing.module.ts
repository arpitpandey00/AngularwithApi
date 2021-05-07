import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { DeletetaskComponent } from './deletetask/deletetask.component';
import { HomeComponent } from './home/home.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'',redirectTo:'Home',pathMatch:"full"},
  {
    path : 'add',
    component :AddtaskComponent
  },
  {
    path : 'update',
    component :UpdatetaskComponent
  },
  {
    path : 'showProduct',
    component : ShowProductComponent,
  },
  {
    path : 'detele',
    component :DeletetaskComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
