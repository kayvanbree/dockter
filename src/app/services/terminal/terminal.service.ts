import {Injectable} from '@angular/core';
import {LogService} from '../log/log.service';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs/Subscription';
import {ElectronService} from 'ngx-electron';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TerminalService {
  project: string;
  projectSub: Subscription;

  private readonly filesSubject = new BehaviorSubject<any[]>([]);
  readonly files: Observable<any[]> = this.filesSubject.asObservable();

  timer;

  constructor(
    private logService: LogService,
    private projectService: ProjectService,
    private electronService: ElectronService
  ) {
    this.projectSub = this.projectService.getCurrentProject().subscribe((value) => {
      this.project = value;
    });
    this.setupExec();
    this.setupGetFiles();
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
   * Starts a timeout that checks for files in the dir every 3 seconds.
   * Returns an observable that gets updated every time we get a response from the
   * get-files message
   * @returns {Observable<any[]>}
   */
  public getFiles(): Observable<any[]> {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.electronService.ipcRenderer.send('get-files', this.project);
      }, 3000);
    }
    return this.files;
  }

  /**
   * Execute command and send to logger
   * @param {string} command
   */
  public exec(command: string) {
    this.logService.append(command);
    this.electronService.ipcRenderer.send('exec', this.project, command);
  }

  /**
   * Retrieve files from the main process
   */
  private setupGetFiles() {
    this.electronService.ipcRenderer.on('get-files', (event, files) => {
      this.filesSubject.next(files);
    });
  }

  /**
   * Sets up message handlers for exec command
   */
  private setupExec(): void {
    this.electronService.ipcRenderer.on('exec-data', (event, arg) => {
      this.logService.append(arg);
    });

    this.electronService.ipcRenderer.on('exec-error', (event, arg) => {
      this.logService.append(arg);
    });

    this.electronService.ipcRenderer.on('exec-exit', (event, arg) => {
      this.logService.append('Exec stopped with code: ' + arg);
    });
  }
}
