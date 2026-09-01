import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import robotsTxt from "astro-robots-txt";
import { pluginLanguageBadge } from "expressive-code-language-badge";
import rehypeExpressiveCode from "rehype-expressive-code";
import compression from "vite-plugin-compression";

// https://astro.build/config
export default defineConfig({
	output: "static",
	build: {
		assets: "static/assets",
	},
	site: "https://metalops.dev",

	integrations: [
		expressiveCode({
			themes: ["catppuccin-mocha", "catppuccin-latte"],
			plugins: [pluginLineNumbers(), pluginLanguageBadge()],
			useDarkModeMediaQuery: false,
			styleOverrides: {
				uiFontFamily:
					'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
				codeFontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			},
		}), // https://shiki.style/languages
		mdx(),
		sitemap(),
		mermaid(),
		robotsTxt(),
		icon(),
	],

	markdown: {
		processor: unified({
			rehypePlugins: [rehypeExpressiveCode],
		}),
	},

	vite: {
		plugins: [
			yaml(),
			tailwindcss(),
			compression({
				verbose: true,
				disable: false,
				threshold: 1024,
				algorithm: "gzip",
				ext: ".gz",
			}),
			compression({
				verbose: false,
				disable: false,
				threshold: 1024,
				algorithm: "brotliCompress",
				ext: ".br",
			}),
		],
	},
});
