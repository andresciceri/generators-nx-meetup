import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuModule } from 'primeng/panelmenu';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMainComponent } from './app-main/app-main.component';

@NgModule({
  declarations: [AppComponent, AppMainComponent],
  imports: [BrowserModule, AppRoutingModule, ToolbarModule, PanelMenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
