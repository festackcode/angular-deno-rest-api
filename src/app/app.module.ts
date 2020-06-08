import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {ToggleButtonModule} from 'primeng/togglebutton';
import {TabViewModule} from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';

import { BreadcrumbModule } from 'angular-crumbs';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [ 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    TabViewModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    ToastModule 
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    UsersComponent
  ],
  providers: [ MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
