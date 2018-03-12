import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as shell from 'shelljs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

/**
 * Execute command and send to logger
 * @param {string} command
 */
function exec(command: string, args: any) {
  console.log('Executing ' + command + ' ' + args);
  console.log(this.project + ' > ' + this.commandToString(command, args));
  const child = shell.exec(this.commandToString(command, args), {async: true});

  child.stdout.on('data', (data) => {
    console.log(data);
  });
  child.stderr.on('data', (data) => {
    console.log(data);
  });
  child.on('exit', (code, signal) => {
    console.log('exec exited with ' +
      `code ${code} and signal ${signal}`);
  });
}
