import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LogService} from '../../services/log/log.service';
import {Subscription} from 'rxjs/Subscription';
import {DockerService} from '../../services/docker/docker.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, AfterViewChecked {

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
  }

  ngAfterViewChecked(): void {
    this.terminal.nativeElement.scrollTop = this.terminal.nativeElement.scrollHeight;
  }

  clearLog() {
    this.logService.reset();
  }

  sendInput() {
    const value = this.input.nativeElement.value;
    const args = value.split(' ');
    const command = args[0];
    args.shift();
    this.dockerService.exec(command, args);
    this.input.nativeElement.value = '';
  }
}
