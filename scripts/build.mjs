import { access, cp, mkdir, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist/src', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });

// Publish the approved source menu under a stable, web-friendly URL while
// keeping the original PDF unchanged at the repository root.
await mkdir('dist/menu', { recursive: true });
await cp('TRIPLEEGG_MENU_AUGUST (1).pdf', 'dist/menu/tripleegg-menu-august.pdf');

// Static assets are optional until approved brand files are added to the repo.
// Vercel checks out Git without empty directories, so only copy public when it
// is actually present rather than making a clean checkout fail its build.
try {
  await access('public');
  await cp('public', 'dist', { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

console.log('Built static site in dist/');
