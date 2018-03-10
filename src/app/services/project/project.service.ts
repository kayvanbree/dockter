import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  private readonly currentProjectSubject = new BehaviorSubject<string>('E:/Projects/DockterProjects/');
  readonly currentProject: Observable<string> = this.currentProjectSubject.asObservable();

  constructor() { }

  /**
   * String containing the path of the current project
   * @returns {Observable<string>}
   */
  public getCurrentProject(): Observable<string> {
    return this.currentProject;
  }
}
