import { NgModule } from '@angular/core';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';

const components = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialsModule { }
