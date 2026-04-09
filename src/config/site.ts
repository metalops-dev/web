export const siteConfig = {
	url: "https://metalops.dev",
	name: "metalops.dev",
	title: "metalops.dev",
	description:
		"A technical blog about software, systems, infrastructure and DevOps. Deep dives on Rust, infrastructure automation, and building resilient production systems.",
	author: {
		name: "Adrian Villanueva",
		url: "https://adrianvillanueva.com",
		email: "av@metalops.dev",
		github: "metalops-dev",
	},
	analytics: {
		siteId: "5f5a32bb6aa9",
		url: "https://analytics.thexiao77.com/api/script.js",
	},
	giscus: {
		repo: "metalops-dev/web",
		repoId: "R_kgDOQwHTmg",
		category: "General",
		categoryId: "DIC_kwDOQwHTms4C2MB-",
		mapping: "title" as const,
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "bottom" as const,
		theme: "preferred_color_scheme",
		lang: "en",
	},
	substack: {
		url: "https://metalops.substack.com",
	},
	social: {
		github: "https://github.com/metalops-dev",
		resume: "https://resume.adrianvillanueva.com",
	},
} as const;

export type SiteConfig = typeof siteConfig;
