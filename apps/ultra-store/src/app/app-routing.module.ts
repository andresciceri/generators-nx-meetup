import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './app-main/app-main.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AppMainComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
