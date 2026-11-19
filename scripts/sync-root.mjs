import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'web/dist')

if (!existsSync(resolve(dist, 'index.html'))) {
  console.error('web/dist is missing. The Vite build did not produce an index.')
  process.exit(1)
}

rmSync(resolve(root, 'assets'), { recursive: true, force: true })

for (const entry of readdirSync(dist)) {
  cpSync(resolve(dist, entry), resolve(root, entry), { recursive: true })
}

writeFileSync(resolve(root, '.nojekyll'), '')
console.log('Published the static site to the repository root for GitHub Pages.')
