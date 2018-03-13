import {AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log/log.service';
import {Subscription} from 'rxjs/Subscription';
import {DockerService} from '../../services/docker/docker.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  @ViewChild('terminal') terminal;
  @ViewChild('input') input;

  log: String = '';
  logSub: Subscription;

  constructor(private logService: LogService, private changeDetector: ChangeDetectorRef, private dockerService: DockerService) { }

  ngOnInit() {
    this.logSub = this.logService.getLog().subscribe((value) => {
      this.log = value;
      this.changeDetector.detectChanges();
    });
    this.terminal.nativeElement.addEventListener('DOMSubtreeModified', () => {
      this.terminal.nativeElement.scrollTop = this.terminal.nativeElement.scrollHeight;
    });
  }

  clearLog() {
    this.logService.reset();
  }

  sendInput() {
    const command = this.input.nativeElement.value;
    this.dockerService.exec(command);
    this.input.nativeElement.value = '';
  }
}
