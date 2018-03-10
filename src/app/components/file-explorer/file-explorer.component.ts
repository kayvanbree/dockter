import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project/project.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit, OnDestroy {
  currentProject: string;
  currentProjectSub: Subscription;

  constructor(private projectService: ProjectService) {
    this.currentProjectSub = this.projectService.getCurrentProject().subscribe((result) => {
      this.currentProject = result;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentProjectSub.unsubscribe();
  }
}
