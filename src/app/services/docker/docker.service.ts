import {Injectable, OnInit, ViewChild} from '@angular/core';
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

  /**
   * Runs the docker-compose up command in the terminal
   */
  public dockerComposeUp() {
    const compose = this.childProcessService.childProcess.spawn('docker-compose', ['up', '--project-name ' + this.project], []);
    compose.stdout.on('data', (data) => {
      this.logService.append(data);
    });
    compose.stderr.on('data', (data) => {
      this.logService.append(data);
    });
    compose.on('exit', (code, signal) => {
      this.logService.append('docker-compose-up exited with ' +
        `code ${code} and signal ${signal}`);
    });
  }
}
