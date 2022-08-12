import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename)
console.log(__dirname)

import redirects from './redirects.json' assert { type: 'json' };

for (const [context, links] of Object.entries(redirects)) {
  const dirPath = join('src', 'pages', context);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, {recursive: true});
  }

  for (const [file, url] of Object.entries(links)) {
    const filePath = join(dirPath, `${file}.astro`);
    const fileContent = `---
import Layout from '@layouts/Redirect.astro'

const url = '${url}'
---
<Layout canonical={url}/>
`;

    writeFileSync(filePath, fileContent);
  }
}
