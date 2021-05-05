import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { DeletetaskComponent } from './deletetask/deletetask.component';
import { HomeComponent } from './home/home.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  {path:"Home",component:HomeComponent},
  {path:"*",redirectTo:"home",pathMatch:"full"},
  {
    path : 'add',
    component :AddtaskComponent
  },
  {
    path : 'update',
    component :UpdatetaskComponent
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
