import {Injectable} from '@angular/core';
import {LogService} from '../log/log.service';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs/Subscription';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class TerminalService {
  project: string;
  projectSub: Subscription;

  constructor(private logService: LogService,
              private projectService: ProjectService,
              private electronService: ElectronService) {
    this.projectSub = this.projectService.getCurrentProject().subscribe((value) => {
      this.project = value;
    });

    this.setupExec();
  }

  public dockerComposeBuild() {
    const command = 'docker-compose build';
    this.exec(command);
  }

  /**
   * Runs the docker-compose up command in the terminal
   */
  public dockerComposeUp() {
    const command = 'docker-compose up';
    this.exec(command);
  }

  /**
   * Execute command and send to logger
   * @param {string} command
   */
  public exec(command: string) {
    this.electronService.ipcRenderer.send('exec', command);
  }

  /**
   * Sets up message handlers for exec command
   */
  private setupExec(): void {
    this.electronService.ipcRenderer.on('exec-data', (event, arg) => {
      console.log('Renderer got data: ' + arg);
    });

    this.electronService.ipcRenderer.on('exec-error', (event, arg) => {
      console.log('Renderer got error: ' + arg);
    });

    this.electronService.ipcRenderer.on('exec-exit', (event, arg) => {
      console.log('Renderer got exit: ' + arg);
    });
  }
}
