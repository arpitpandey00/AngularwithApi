import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListwithasyncpipeComponent } from './listwithasyncpipe/listwithasyncpipe.component';
import { ListwithobservableComponent } from './listwithobservable/listwithobservable.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MaterialComponent } from './material/material.component';
import { ShowProductComponent } from './show-product/show-product.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DeletetaskComponent } from './deletetask/deletetask.component';

const Operations : Routes = [
  {
    path : 'update/:id',
    component :UpdatetaskComponent
  },
  {
    path : 'delete/:id',
    component : DeletetaskComponent
  },
  {
    path : 'showProduct/:id',
    component : ShowProductComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListwithasyncpipeComponent,
    ListwithobservableComponent,
    AddtaskComponent,
    DeletetaskComponent,
    UpdatetaskComponent,
    MaterialComponent,
    ShowProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
   
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    AppRoutingModule,
    RouterModule.forChild(Operations),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
