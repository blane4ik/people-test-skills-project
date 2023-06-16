import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewUserModalComponent } from './components/users/components/modals/add-new-user-modal/add-new-user-modal.component';
import { SharedModule } from './shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AddNewUserModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbDropdownModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
