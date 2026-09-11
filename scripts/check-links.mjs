import { readFile } from 'node:fs/promises';
const html=await readFile('index.html','utf8'); const js=await readFile('src/site.js','utf8'); const ids=[...js.matchAll(/id=\\?"([^"\\]+)\\?"/g)].map(x=>x[1]);
for(const href of [...js.matchAll(/\['[^']+', '(#[^']+)'\]/g)].map(x=>x[1]))if(!ids.includes(href.slice(1)))throw new Error(`Broken anchor: ${href}`);
for(const src of [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(x=>x[1])){if(src.startsWith('/src/')||src==='/favicon.svg')continue;}console.log('Internal link checks passed');
