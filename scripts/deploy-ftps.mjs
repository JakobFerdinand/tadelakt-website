import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

function quote(value) {
  if (
    [...value].some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    )
  ) {
    throw new Error('FTP configuration must not contain control characters.');
  }
  return `"${value.replace(/[\\"]/g, '\\$&')}"`;
}

export function createDeploymentCommands(env) {
  for (const name of [
    'FTP_SERVER',
    'FTP_REMOTE_DIR',
    'FTP_USERNAME',
    'FTP_PASSWORD',
  ]) {
    if (!env[name]) throw new Error(`Missing ${name}; see docs/deployment.md.`);
  }
  const { FTP_SERVER, FTP_REMOTE_DIR, FTP_USERNAME, FTP_PASSWORD } = env;
  if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/i.test(FTP_SERVER)) {
    throw new Error('FTP_SERVER must be a hostname, without protocol or port.');
  }
  if (
    !/^[a-z0-9_./-]+$/i.test(FTP_REMOTE_DIR) ||
    !FTP_REMOTE_DIR.split('/').some((part) => part && part !== '.') ||
    FTP_REMOTE_DIR.split('/').includes('..')
  ) {
    throw new Error(
      'FTP_REMOTE_DIR must identify an explicit website directory.',
    );
  }
  return [
    'set cmd:fail-exit yes',
    'set net:timeout 30',
    'set net:max-retries 2',
    'set ftp:ssl-force yes',
    'set ftp:ssl-auth TLS',
    'set ftp:ssl-protect-data yes',
    'set ssl:verify-certificate yes',
    'set ftp:list-options -a',
    `open ${quote(`ftp://${FTP_SERVER}:21`)}`,
    `user ${quote(FTP_USERNAME)} ${quote(FTP_PASSWORD)}`,
    // Require an existing destination; never create a guessed document root.
    `cd ${quote(FTP_REMOTE_DIR)}`,
    // Publish hashed assets before HTML referencing them, without deleting yet.
    'mirror --reverse --transfer-all --parallel=4 --no-perms out/_next/ _next/',
    'mirror --reverse --transfer-all --parallel=4 --no-perms --exclude-glob _next/ out/ ./',
    // Only prune after both uploads succeed; include old assets and hidden files.
    'mirror --reverse --delete --only-missing --recursion=always --no-perms --verbose out/ ./',
    'bye',
    '',
  ].join('\n');
}

async function deploy() {
  const commands = createDeploymentCommands(process.env);
  await Promise.all(
    ['out/index.html', 'out/.htaccess', 'out/_next'].map((path) =>
      access(path),
    ),
  );
  // Credentials go through stdin, not command-line arguments or a disk file.
  const child = spawn('lftp', ['--norc'], {
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.stdin.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`FTPS deployment failed (${signal ?? code}).`));
    });
    child.stdin.end(commands);
  });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await deploy();
}
