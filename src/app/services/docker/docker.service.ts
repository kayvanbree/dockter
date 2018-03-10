import {Injectable} from '@angular/core';
import {ChildProcessService} from 'ngx-childprocess';
import {LogService} from '../log/log.service';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class DockerService {
  project: string;
  projectSub: Subscription;

  constructor(
    private childProcessService: ChildProcessService,
    private logService: LogService,
    private projectService: ProjectService
  ) {
    this.projectSub = this.projectService.getCurrentProject().subscribe((value) => {
      this.project = value;
    });
  }

  public dockerComposeBuild() {
    const command = 'docker-compose';
    const args = [
      'build'
    ];
    this.exec(command, args);
  }

  /**
   * Runs the docker-compose up command in the terminal
   */
  public dockerComposeUp() {
    const command = 'docker-compose';
    const args = [
      'up'
    ];
    this.exec(command, args);
  }

  /**
   * Synched execution of command
   * @param {string} command
   */
  public execSync(command: string) {
    this.logService.append(this.project + ' > ' + command);
    const data = this.childProcessService.childProcess.execSync(command, [{cwd: this.project}]);
    this.logService.append(data);
  }

  /**
   * Execute command and send to logger
   * @param {string} command
   */
  public exec(command: string, args: any) {
    this.logService.append(this.project + ' > ' + this.commandToString(command, args));
    const compose = this.childProcessService.childProcess.spawn(command, args, [{cwd: this.project}]);
    compose.stdout.on('data', (data) => {
      this.logService.append(data);
    });
    compose.stderr.on('data', (data) => {
      this.logService.append(data);
    });
    compose.on('exit', (code, signal) => {
      this.logService.append('exec exited with ' +
        `code ${code} and signal ${signal}`);
    });
  }

  /**
   * Convert a command and args to string
   * @param {string} command
   * @param args
   * @returns {string}
   */
  private commandToString(command: string, args: any) {
    let str = command;
    for (let i = 0; i < args.length; i++) {
      str += ' ' + args[i];
    }
    return str;
  }
}
