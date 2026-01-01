---
title: 'Draft Post Example'
description: 'This post is a draft and will only be visible in development mode'
pubDate: 2024-12-20
draft: true
tags: ['example', 'draft']
---

This post has `draft: true` in its frontmatter, which means:

- ✓ It will **appear** during local development (`npm run dev`)
- × It will **not appear** in production builds (`npm run build`)

The yellow banner at the top indicates this is a draft.

## How to Use Draft Mode

Add `draft: true` to any post's frontmatter:

```yaml
---
title: 'My Work in Progress'
description: 'Not ready yet'
pubDate: 2024-12-20
draft: true
---
```

When you're ready to publish, simply remove the `draft` line or set it to `false`.
