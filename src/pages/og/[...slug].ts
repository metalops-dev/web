import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const posts = await getCollection("blog");

const pages = Object.fromEntries(
	posts.map((post) => [
		post.id,
		{
			title: post.data.title,
			description: post.data.description,
		},
	]),
);

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
