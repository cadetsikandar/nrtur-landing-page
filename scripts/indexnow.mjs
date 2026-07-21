// IndexNow — tell Bing (and other IndexNow engines) to re-crawl URLs immediately,
// instead of waiting days for the next natural crawl.
//
// Usage (with any Node 18+):
//   node scripts/indexnow.mjs                     → submits the default page list
//   node scripts/indexnow.mjs /faq/ /blog/        → submits only those paths
//
// The key file is public by design and lives at:
//   https://www.nrtur.io/7c4780add3ec63bb257df5016eb26cac.txt
// Bing fetches it to verify ownership before accepting submissions.

const KEY = '7c4780add3ec63bb257df5016eb26cac'
const HOST = 'www.nrtur.io'

const DEFAULT_PATHS = [
  '/', '/about/', '/faq/', '/blog/', '/compare/',
  '/alternatives/', '/comparisons/', '/use-cases/', '/guides/',
]

const paths = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_PATHS
const urlList = paths.map((p) => `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

// IndexNow returns 200 (accepted) or 202 (accepted, pending verification).
console.log(`IndexNow → ${res.status} ${res.statusText}`)
console.log(`Submitted ${urlList.length} URL(s):`)
urlList.forEach((u) => console.log('  ' + u))
