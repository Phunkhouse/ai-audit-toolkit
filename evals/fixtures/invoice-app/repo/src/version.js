import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

// Fixed command and arguments; no request data reaches the child process.
export async function revision() {
  const { stdout } = await run('git', ['rev-parse', '--short', 'HEAD'], { timeout: 2000 });
  return stdout.trim();
}
