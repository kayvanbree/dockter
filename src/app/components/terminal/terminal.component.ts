import { Component, OnInit } from '@angular/core';
import {LogService} from '../../services/log/log.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  log: String = '';
  logSub: Subscription;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logSub = this.logService.getLog().subscribe((value) => {
      this.log = value;
    });
  }
}
