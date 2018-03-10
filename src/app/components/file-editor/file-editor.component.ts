import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project/project.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit, OnDestroy {

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
