import { Component } from '@angular/core';
import {DockerService} from '../../services/docker/docker.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private dockerService: DockerService) {}

  public run() {
    this.dockerService.dockerComposeUp();
  }

  public build() {
    this.dockerService.dockerComposeBuild();
  }
}
