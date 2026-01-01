import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import d2 from "astro-d2";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { pluginLanguageBadge } from "expressive-code-language-badge";

// https://astro.build/config
export default defineConfig({
	build: {
		assets: "static/assets",
	},
	site: "https://metalops.dev",

	integrations: [
		expressiveCode({
			themes: ["catppuccin-mocha", "catppuccin-latte"],
		}), // https://shiki.style/languages
		mdx(),
		sitemap({
			serialize(item) {
				// Add lastmod to all pages
				item.lastmod = new Date().toISOString();
				return item;
			},
		}),
		d2({ output: "static/diagrams" }),
		robotsTxt(),
		icon(),
	],
	vite: {
		plugins: [tailwindcss(), pluginLineNumbers(), pluginLanguageBadge()],
	},
});
