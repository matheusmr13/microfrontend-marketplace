import createTask from './task';

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');
const app = express();

const { spawn } = require('child_process');

interface asd {
  cwd ?: any,
  onStdout ?: any,
  onStderr ?: any,
  debug ?: any
};

const exec = (command:string, {
  cwd,
  onStdout,
  onStderr,
  debug = true,
} : asd = {}) => new Promise((resolve, reject) => {
  const spawnProcess = spawn(command, [], { shell: true, cwd });

  if (onStdout || debug) spawnProcess.stdout.on('data', onStdout || ((data:any) => process.stdout.write(data)));
  if (onStderr || debug) spawnProcess.stderr.on('data', onStderr || ((data:any) => process.stderr.write(data)));

  spawnProcess.on('exit', (code: any) => {
    if (code > 0) {
      reject(code);
      return;
    }
    resolve();
  });
});

app.get('/', async (req: any, res: any) => {
  createTask();
  res.send('Hello World!');
});

app.post('/task_test', async (req: any, res: any) => {
  console.info('task_test');
  await exec('mkdir testing', { cwd: '/tmp' });
  console.info('task_test2');
  await exec('node --max-old-space-size=250 npm init --yes', { cwd: '/tmp/testing' });
  console.info('task_test3');
  await exec('node --max-old-space-size=250 npm i npm-publish-build-test', { cwd: '/tmp/testing' });
  console.info('task_test4');
  await exec('npx tree-cli -l 2 --base /tmp/testing');
  res.send('task response');
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});