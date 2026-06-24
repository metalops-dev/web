import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import d2 from "astro-d2";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { pluginLanguageBadge } from "expressive-code-language-badge";
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
		}), // https://shiki.style/languages
		mdx(),
		sitemap(),
		d2({
			output: "static/diagrams",
			theme: {
				default: "0",
				dark: "200",
			},
		}),
		robotsTxt(),
		icon(),
	],

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
