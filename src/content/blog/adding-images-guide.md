---
title: 'Adding Images to Posts'
description: 'How to add images to your blog posts in Astro'
pubDate: 2024-12-22
draft: true
tags: ['guide', 'images', 'astro']
---

This guide explains the different ways to add images to your blog posts.

## Method 1: Public Folder (Simple)

Place images in the `public/` folder and reference them with absolute paths:

```markdown
![Alt text](/images/my-image.png)
```

**Pros:** Simple, works everywhere
**Cons:** No optimization, no type checking

## Method 2: Assets Folder (Optimized)

Place images in `src/assets/` and import them in MDX:

```mdx
import myImage from '../../assets/images/my-image.png';

<img src={myImage.src} alt="Description" />
```

Or use Astro's `Image` component for optimization:

```mdx
import { Image } from 'astro:assets';
import myImage from '../../assets/images/my-image.png';

<Image src={myImage} alt="Description" />
```

**Pros:** Automatic optimization, width/height inference
**Cons:** Requires imports

## Method 3: Hero Images (Frontmatter)

The schema supports `heroImage` in frontmatter:

```yaml
---
title: 'My Post'
heroImage: './hero.png'
---
```

Place the image in the same folder as the post or reference from assets.

## Method 4: Remote Images

For external images, use the full URL:

```markdown
![Alt text](https://example.com/image.png)
```

Or with the Image component:

```mdx
import { Image } from 'astro:assets';

<Image
  src="https://example.com/image.png"
  alt="Description"
  width={800}
  height={600}
/>
```

## Recommended Structure

```text
src/
├── assets/
│   └── images/
│       ├── blog/
│       │   ├── post-1/
│       │   │   ├── hero.png
│       │   │   └── diagram.png
│       │   └── post-2/
│       └── shared/
│           └── logo.png
└── content/
    └── blog/
        ├── post-1.mdx
        └── post-2.mdx
```

## Image Guidelines

- Use **WebP** or **AVIF** for best compression
- Provide **alt text** for accessibility
- Keep images under **500KB** when possible
- Use descriptive filenames: `kubernetes-architecture.png` not `img1.png`
