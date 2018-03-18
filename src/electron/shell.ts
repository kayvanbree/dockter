const shellts = require('shelljs');

export class Shell {
  /**
   * Execute command and send to logger
   * @param {string} command
   */
  public exec(command) {
    console.log('Executing ' + command);
    // console.log(this.project + ' > ' + this.commandToString(command, args));
    const child = shellts.exec(command, {async: true});

    child.stdout.on('data', function (data) {
      console.log(data);
    });

    child.stderr.on('data', function (data) {
      console.log(data);
    });
    child.on('exit', function (code, signal) {
      console.log('exec exited with code ' +
        `${code} and signal ${signal}`);
    });
  }
}

