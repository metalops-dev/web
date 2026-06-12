import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { SITE_DESCRIPTION } from "../../consts";

const posts = await getCollection("blog");

const staticPages: Record<string, { title: string; description: string }> = {
	"": { title: "metalops.dev", description: SITE_DESCRIPTION },
	about: { title: "About", description: "About metalops.dev and the author" },
	archive: { title: "Archive", description: "All blog posts" },
	bookmarks: { title: "Bookmarks", description: "Curated links and resources" },
	now: { title: "Now", description: "What I'm doing right now" },
	reading: { title: "Reading", description: "Books and articles I'm reading" },
	series: { title: "Series", description: "Blog post series" },
	talks: { title: "Talks", description: "Presentations and talks" },
	uses: { title: "Uses", description: "Tools and equipment I use" },
	tags: { title: "Tags", description: "Browse posts by tag" },
};

const postPages = Object.fromEntries(
	posts.map((post) => [
		`blog/${post.id}`,
		{
			title: post.data.title,
			description: post.data.description,
		},
	]),
);

const allTags = [...new Set(posts.flatMap((p) => p.data.tags ?? []))];
const tagPages = Object.fromEntries(
	allTags.map((tag) => [
		`tags/${tag}`,
		{
			title: `#${tag}`,
			description: `Posts tagged with ${tag}`,
		},
	]),
);

const pages = { ...staticPages, ...postPages, ...tagPages };

export const { getStaticPaths, GET } = OGImageRoute({
	param: "slug",
	pages,
	getImageOptions: (_, page) => ({
		title: page.title,
		description: page.description,
		logo: {
			path: "./public/favicon.svg",
			size: [100, 100],
		},
		bgGradient: [
			[20, 8, 28],
			[5, 2, 8],
		],
		border: {
			color: [123, 45, 142],
			width: 16,
			side: "inline-start",
		},
		font: {
			title: {
				families: ["JetBrains Mono", "monospace"],
				weight: "Bold",
				color: [255, 255, 255],
				size: 72,
			},
			description: {
				families: ["JetBrains Mono", "monospace"],
				color: [180, 160, 200],
				size: 36,
			},
		},
		fonts: [
			"https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-700-normal.woff2",
			"https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff2",
		],
	}),
});
