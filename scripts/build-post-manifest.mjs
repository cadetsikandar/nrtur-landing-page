// Writes src/generated/post-manifest.json — slug → { title, tag, author, date } for
// every local Markdown post. Runs automatically before `next dev` / `next build`
// (see the predev/prebuild scripts in package.json).
//
// Why it exists: the per-article social card (app/blog/[cluster]/[slug]/opengraph-image.tsx)
// runs on the Edge runtime, which has no `fs`, so it can't read content/blog/ the way
// src/lib/blog-content.ts does. This gives it the handful of frontmatter fields it needs
// as a plain JSON import instead.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const OUT_DIR = path.join(ROOT, 'src', 'generated')
const OUT_FILE = path.join(OUT_DIR, 'post-manifest.json')

const manifest = {}

if (fs.existsSync(CONTENT_DIR)) {
  for (const folder of fs.readdirSync(CONTENT_DIR)) {
    const dir = path.join(CONTENT_DIR, folder)
    if (!fs.statSync(dir).isDirectory()) continue
    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      if (!data.title) continue
      const slug = file.replace(/\.mdx?$/, '')
      manifest[slug] = {
        title: String(data.title),
        // Same fallback order as blog-content.ts: explicit tag, else the folder name.
        tag: data.tag ? String(data.tag) : folder,
        author: data.author ? String(data.author) : undefined,
        date: data.date ? String(data.date) : undefined,
      }
    }
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + '\n')
console.log(`post-manifest: ${Object.keys(manifest).length} posts → ${path.relative(ROOT, OUT_FILE)}`)
