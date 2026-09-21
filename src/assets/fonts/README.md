# Fonts for social-card rendering

Static TTF instances used only by the `opengraph-image.tsx` / `twitter-image.tsx`
routes (see `src/lib/og-image.tsx`). Satori — the renderer behind Next's
`ImageResponse` — needs font bytes and cannot use the `next/font/google` loaders
the site itself uses, nor variable fonts, so these are pinned here.

| File | Family | Weight | Source |
|---|---|---|---|
| `inter-500.ttf` | Inter | 500 | Google Fonts (static instance via css2 API) |
| `inter-700.ttf` | Inter | 700 | Google Fonts (static instance via css2 API) |
| `newsreader-500.ttf` | Newsreader | 500 (opsz 36) | Google Fonts (static instance via css2 API) |

Both families are licensed under the SIL Open Font License 1.1.
