import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
function run(command, args, capture = false, allowFailure = false) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) throw new Error(`${command} ${args.join(' ')} failed${capture ? `: ${result.stderr.trim()}` : ''}.`);
  return capture ? { status: result.status, text: result.stdout.trim() } : result.status;
}
try {
  const message = process.argv.slice(2).join(' ').trim();
  if (!message) throw new Error('Usage: stage the intended files, then npm run publish -- "Describe the completed change"');
  if (run('git', ['branch', '--show-current'], true).text !== 'main') throw new Error('Publish from the production branch main.');
  const remote = run('git', ['remote', 'get-url', 'origin'], true, true);
  if (remote.status !== 0) throw new Error('Connect the intended GitHub repository as origin before publishing. See DEPLOYMENT.md.');
  if (!/^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)/.test(remote.text)) throw new Error('origin must be the GitHub repository connected to this project.');
  run('npm', ['run', 'build']);
  run('git', ['fetch', 'origin']);
  const remoteMain = run('git', ['rev-parse', '--verify', 'refs/remotes/origin/main'], true, true);
  const head = run('git', ['rev-parse', '--verify', 'HEAD'], true, true);
  if (remoteMain.status === 0) {
    if (head.status !== 0) throw new Error('The remote already contains main. Reconcile its history before the initial publication.');
    const behind = Number(run('git', ['rev-list', '--count', 'HEAD..origin/main'], true).text);
    if (behind > 0) throw new Error('Remote main contains commits absent locally. Integrate those changes before publishing; no force push is performed.');
  }
  const staged = run('git', ['diff', '--cached', '--name-only'], true).text;
  if (staged) {
    const unstaged = run('git', ['diff', '--name-only'], true).text;
    const untracked = run('git', ['ls-files', '--others', '--exclude-standard'], true).text;
    if (unstaged || untracked) throw new Error('Unstaged or untracked files remain. Stage the intended project changes and handle unrelated files before publishing, so the checked build matches the commit.');
    run('git', ['commit', '-m', message]);
  } else if (head.status !== 0) throw new Error('Stage the website files to create its first commit.');
  else if (run('git', ['status', '--porcelain'], true).text) throw new Error('Stage the intended changes before publishing.');
  run('git', ['push', '--set-upstream', 'origin', 'main']);
  console.log('GitHub main updated. The connected Vercel project will build this commit automatically. Verify the deployment is Ready before reporting it live.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
