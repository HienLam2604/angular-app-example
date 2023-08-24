import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialUiModuleModule } from './modules/material-ui-module/material-ui-module.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RgbConvertorComponent } from './components/rgb-convertor/rgb-convertor.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserTableEditComponent } from './components/user-table-edit/user-table-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    RgbConvertorComponent,
    UserTableComponent,
    UserTableEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialUiModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
