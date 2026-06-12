# Doom Metal Enhancements — Implementation Plan

## 1. Comparison.astro — Before/After → Then/Now

**File:** `src/components/mdx/Comparison.astro`

Change line 11:
```astro
const { beforeLabel = "Before", afterLabel = "After" } = Astro.props;
```
to:
```astro
const { beforeLabel = "Then", afterLabel = "Now" } = Astro.props;
```

---

## 2. StatCard.astro — increase/decrease/change → ascended/descended/shift

**File:** `src/components/mdx/StatCard.astro`

Change lines 17-21:
```ts
const changeLabel = change?.startsWith("+")
    ? "increase"
    : change?.startsWith("-")
        ? "decrease"
        : "change";
```
to:
```ts
const changeLabel = change?.startsWith("+")
    ? "ascended"
    : change?.startsWith("-")
        ? "descended"
        : "shift";
```

---

## 3. Footer seal badge

**Create file:** `public/seal.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <path id="top-arc" d="M 15 60 A 45 45 0 0 1 105 60" fill="none"/>
    <path id="bottom-arc" d="M 105 60 A 45 45 0 0 1 15 60" fill="none"/>
  </defs>
  <!-- Outer circle -->
  <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
  <!-- Dots at cardinal points -->
  <circle cx="60" cy="7" r="2" fill="currentColor" opacity="0.5"/>
  <circle cx="60" cy="113" r="2" fill="currentColor" opacity="0.5"/>
  <circle cx="7" cy="60" r="2" fill="currentColor" opacity="0.5"/>
  <circle cx="113" cy="60" r="2" fill="currentColor" opacity="0.5"/>
  <!-- Text along arcs -->
  <text font-size="10" font-family="Cinzel, Georgia, serif" font-weight="700" fill="currentColor" letter-spacing="4">
    <textPath href="#top-arc" startOffset="50%" text-anchor="middle">METALOPS</textPath>
  </text>
  <text font-size="8" font-family="JetBrains Mono, monospace" fill="currentColor" letter-spacing="3">
    <textPath href="#bottom-arc" startOffset="50%" text-anchor="middle">EST. MMXXIV</textPath>
  </text>
  <!-- Center pentagram -->
  <polygon points="60,62 67,80 50,69 70,69 53,80" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
</svg>
```

**Modify file:** `src/components/Footer.astro`

Add after the existing `.badge-item` div (around line 36):
```astro
<div class="badge-item">
  <img src="/seal.svg" alt="Seal of Metalops" loading="lazy" />
</div>
```

---

## 4. Header SVG wordmark

**File:** `src/components/Header.astro`

Replace this block (around lines 8-11):
```astro
<a href="/" class="logo">
  <span class="logo-symbol">M/</span>
  {SITE_TITLE}
</a>
```

with:
```astro
<a href="/" class="logo" aria-label="metalops.dev home">
  <svg width="200" height="30" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
    <line x1="0" y1="18" x2="22" y2="18" stroke="var(--accent)" stroke-width="2" opacity="0.4"/>
    <text x="30" y="24" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="24" fill="var(--accent)">M/</text>
    <text x="70" y="22" font-family="JetBrains Mono, SF Mono, monospace" font-weight="400" font-size="14" fill="var(--fg)">metalops.dev</text>
  </svg>
</a>
```

Then add/modify CSS for the logo:
```css
.logo-svg {
  display: block;
  height: 24px;
  width: auto;
  transition: filter 0.2s;
}
.logo:hover .logo-svg {
  filter: drop-shadow(0 0 6px var(--accent-muted));
}
```

Remove the old `.logo`, `.logo-symbol`, `.logo:hover` CSS rules since they're replaced by the SVG.

---

## Implementation Order

1. Comparison.astro (1 line change)
2. StatCard.astro (1 line change)
3. public/seal.svg (new file)
4. Footer.astro (add seal badge)
5. Header.astro (replace text logo with SVG + update CSS)

After all changes: `pnpm run build && pnpm test`
