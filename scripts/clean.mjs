import { rmSync } from 'node:fs';

try {
  rmSync('dist', { recursive: true, force: true });
} catch (err) {
  if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
    /* dist already absent */
  } else {
    throw err;
  }
}
