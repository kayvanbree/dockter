import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileEditorComponent } from './components/file-editor/file-editor.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MaterialsModule} from './modules/materials/materials.module';
import {NgxElectronModule} from 'ngx-electron';
import {ProjectService} from './services/project/project.service';
import {TerminalService} from './services/terminal/terminal.service';
import {LogService} from './services/log/log.service';

@NgModule({
  declarations: [
    AppComponent,
    FileEditorComponent,
    FileExplorerComponent,
    TerminalComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialsModule,
    NgxElectronModule
  ],
  providers: [
    ProjectService,
    TerminalService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
