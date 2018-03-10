import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FileEditorComponent } from './components/file-editor/file-editor.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MaterialsModule} from './modules/materials/materials.module';

@NgModule({
  declarations: [
    AppComponent,
    FileEditorComponent,
    FileExplorerComponent,
    TerminalComponent,
    ToolbarComponent,
    MaterialsModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
