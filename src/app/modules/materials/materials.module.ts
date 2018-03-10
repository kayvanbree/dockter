import { NgModule } from '@angular/core';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const components = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialsModule { }
