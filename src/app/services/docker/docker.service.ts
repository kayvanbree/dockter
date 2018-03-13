import {Injectable} from '@angular/core';
import {ChildProcessService} from 'ngx-childprocess';
import {LogService} from '../log/log.service';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs/Subscription';
import * as shell from 'shelljs';

@Injectable()
export class DockerService {
  project: string;
  projectSub: Subscription;

  constructor(private childProcessService: ChildProcessService,
              private logService: LogService,
              private projectService: ProjectService) {
    this.projectSub = this.projectService.getCurrentProject().subscribe((value) => {
      this.project = value;
    });
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
   * Synched execution of command
   * @param {string} command
   */
  // public execSync(command: string) {
  //   this.logService.append(this.project + ' > ' + command);
  //   const data = shell.execSync(command, [{cwd: this.project}]);
  //   this.logService.append(data);
  // }

  /**
   * Execute command and send to logger
   * @param {string} command
   */
  public exec(command: string) {
    this.logService.append(this.project + ' > ' + command);
    const compose = shell.exec(command, {async: true});

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
