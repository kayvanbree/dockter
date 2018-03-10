import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LogService {

  private logValue: string;
  private readonly logSubject = new BehaviorSubject<string>(this.logValue);
  readonly log: Observable<string> = this.logSubject.asObservable();

  constructor() {  }

  public getLog(): Observable<string> {
    return this.log;
  }

  append(value: string) {
    this.logValue += value + '\n';
    this.logSubject.next(this.logValue);
  }
}
