import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project/project.service';
import {Subscription} from 'rxjs/Subscription';
import {TerminalService} from '../../services/terminal/terminal.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit, OnDestroy {
  currentProject: string;
  currentProjectSub: Subscription;

  files: any[];
  filesSub: Subscription;

  constructor(private projectService: ProjectService, private terminalService: TerminalService) {
    this.currentProjectSub = this.projectService.getCurrentProject().subscribe((result) => {
      this.currentProject = result;
    });

    this.filesSub = this.terminalService.getFiles().subscribe((value) => {
      this.files = value;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentProjectSub.unsubscribe();
  }
}
