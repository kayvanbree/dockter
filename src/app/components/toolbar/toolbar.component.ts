import { Component } from '@angular/core';
import {TerminalService} from '../../services/terminal/terminal.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private terminalService: TerminalService) {}

  public run() {
    this.terminalService.dockerComposeUp();
  }

  public build() {
    this.terminalService.dockerComposeBuild();
  }

  public ls() {
    this.terminalService.exec('ls', []);
  }
}
