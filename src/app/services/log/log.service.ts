import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LogService {

  private readonly initialValue = 'Type a command or use the program...';;
  private logValue = this.initialValue;
  private readonly logSubject = new BehaviorSubject<string>(this.logValue);
  readonly log: Observable<string> = this.logSubject.asObservable();

  constructor() {
  }

  public getLog(): Observable<string> {
    return this.log;
  }

  append(value: string) {
    if (value === '') {
      return;
    }
    this.logValue += '\n' + value;
    this.logSubject.next(this.logValue);
  }

  public reset() {
    this.logValue = this.initialValue;
    this.logSubject.next(this.logValue);
  }
}
