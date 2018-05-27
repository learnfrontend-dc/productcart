import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppBoostrapModule } from './app-boostrap.module';
import { AppComponent } from './app.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppBoostrapModule, Angular2FontawesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}