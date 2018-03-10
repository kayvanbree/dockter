import {Injectable, OnInit} from '@angular/core';
import {ChildProcessService} from 'ngx-childprocess';
import {LogService} from '../log/log.service';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class DockerService implements OnInit {

  project: string;
  projectSub: Subscription;

  constructor(
    private childProcessService: ChildProcessService,
    private logService: LogService,
    private projectService: ProjectService
  ) { }

  /**
   * Subscribes to the current project
   */
  ngOnInit() {
    this.projectSub = this.projectService.getCurrentProject().subscribe((value) => {
      this.project = value;
    });
  }

  /**
   * Runs the docker-compose up command in the terminal
   */
  public dockerComposeUp() {
    this.childProcessService.childProcess.exec('docker-compose up -p ' + this.project, [], (value) => {
      this.logService.append(value);
    });
  }
}
