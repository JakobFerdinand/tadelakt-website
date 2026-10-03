import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { createDeploymentCommands } from '../scripts/deploy-ftps.mjs';

const config = {
  FTP_SERVER: 'www414.your-server.de',
  FTP_REMOTE_DIR: 'public_html',
  FTP_USERNAME: 'deploy-user',
  FTP_PASSWORD: 'secret',
};

test('deployment requires encrypted FTP and verified certificates', () => {
  const commands = createDeploymentCommands(config);
  assert.match(commands, /set cmd:fail-exit yes/);
  assert.match(commands, /set ftp:ssl-force yes/);
  assert.match(commands, /set ftp:ssl-protect-data yes/);
  assert.match(commands, /set ssl:verify-certificate yes/);
  assert.match(commands, /open "ftp:\/\/www414.your-server.de:21"/);
  assert.match(commands, /cd "public_html"/);
});

test('uploads assets first and includes Apache configuration', () => {
  const commands = createDeploymentCommands(config);
  assert.ok(commands.indexOf('out/_next/') < commands.indexOf(' out/ ./'));
  assert.match(commands, /--exclude-glob _next\/ out\/ \.\//);
  assert.equal(commands.match(/--transfer-all/g)?.length, 2);
  assert.doesNotMatch(commands, /--exclude.*htaccess|mkdir/);
});

test('prunes all stale files only after both uploads succeed', () => {
  const commands = createDeploymentCommands(config);
  const mirrors = commands
    .split('\n')
    .filter((line) => line.startsWith('mirror '));
  assert.equal(mirrors.length, 3);
  assert.doesNotMatch(mirrors[0], /--delete/);
  assert.doesNotMatch(mirrors[1], /--delete/);
  assert.equal(
    mirrors[2],
    'mirror --reverse --delete --only-missing --recursion=always --no-perms --verbose out/ ./',
  );
  assert.match(commands, /set cmd:fail-exit yes/);
  assert.match(commands, /set ftp:list-options -a/);
  assert.ok(
    commands.indexOf('cd "public_html"') < commands.indexOf(mirrors[0]),
  );
  assert.doesNotMatch(commands, /--delete-first|--delete-excluded/);
});

test('lftp interprets special characters in passwords literally', {
  skip: spawnSync('lftp', ['--version']).error?.code === 'ENOENT',
}, () => {
  for (const password of ['p"a\\ss; $word`', "single'quote", '  spaces  ']) {
    const commands = createDeploymentCommands({
      ...config,
      FTP_PASSWORD: password,
    });
    const credentialLine = commands
      .split('\n')
      .find((line) => line.startsWith('user '));
    // Use the real command parser without opening a network connection.
    const result = spawnSync('lftp', ['--norc'], {
      input: `${credentialLine.replace(/^user "deploy-user" /, 'echo ')}\nbye\n`,
      encoding: 'utf8',
      timeout: 5000,
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, `${password}\n`);
  }
});

test('quotes credentials without treating them as commands', () => {
  const commands = createDeploymentCommands({
    ...config,
    FTP_PASSWORD: 'p"a\\ss; $word`',
  });
  assert.ok(commands.includes('user "deploy-user" "p\\"a\\\\ss; $word`"'));
  assert.throws(() =>
    createDeploymentCommands({ ...config, FTP_PASSWORD: 'secret\nbye' }),
  );
});

test('fails closed for missing settings, malformed hosts and unsafe directories', () => {
  for (const name of Object.keys(config)) {
    assert.throws(
      () => createDeploymentCommands({ ...config, [name]: '' }),
      new RegExp(`Missing ${name}`),
    );
  }
  for (const host of ['ftp://example.com', 'example.com:21', 'host\nbye']) {
    assert.throws(() =>
      createDeploymentCommands({ ...config, FTP_SERVER: host }),
    );
  }
  for (const directory of ['/', '.', '../public_html', 'public_html; bye']) {
    assert.throws(() =>
      createDeploymentCommands({ ...config, FTP_REMOTE_DIR: directory }),
    );
  }
  assert.doesNotThrow(() =>
    createDeploymentCommands({
      ...config,
      FTP_REMOTE_DIR: '/public_html/tadelakt',
    }),
  );
});
