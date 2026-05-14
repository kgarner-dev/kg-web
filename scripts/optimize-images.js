import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { statSync } from 'fs'
import { join, extname, basename } from 'path'

const DIR = './static/images'
const QUALITY = 82

// headshot only appears in the hero at max 200px display → 400px covers 2× retina
// preview images appear in article headers (up to ~800px) → 900px covers most screens at 1×
const SIZE_MAP = {
  'headshot': 400,
}
const DEFAULT_MAX = 900

const files = await readdir(DIR)
const targets = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && f !== 'placeholder.svg')

for (const file of targets) {
  const input = join(DIR, file)
  const stem = basename(file, extname(file))
  const output = join(DIR, `${stem}.webp`)

  const maxWidth = SIZE_MAP[stem] ?? DEFAULT_MAX
  const meta = await sharp(input).metadata()
  const resize = meta.width > maxWidth ? { width: maxWidth, withoutEnlargement: true } : null

  const pipeline = sharp(input)
  if (resize) pipeline.resize(resize)

  const tmp = output + '.tmp'
  await pipeline.webp({ quality: QUALITY }).toFile(tmp)

  const before = statSync(input).size
  const after = statSync(tmp).size

  // only keep the smaller version
  if (after < before || file !== output) {
    await unlink(input).catch(() => {})
    const { rename } = await import('fs/promises')
    await rename(tmp, output)
    const pct = Math.round((1 - after / before) * 100)
    console.log(`✓ ${file} → ${stem}.webp  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, ${pct}% smaller, max ${maxWidth}px)`)
  } else {
    await unlink(tmp)
    console.log(`— ${file} skipped (already optimal)`)
  }
}

console.log(`\nDone. Processed ${targets.length} images.`)
