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
			size: [80, 80],
		},
		bgGradient: [[0, 0, 0]],
		border: {
			color: [255, 255, 255],
			width: 10,
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
				color: [170, 170, 170],
				size: 36,
			},
		},
		fonts: [
			"https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-700-normal.woff2",
			"https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff2",
		],
	}),
});
