export default new Map([
	[
		"src/content/blog/k8s-deep-dive-1-intro.mdx",
		() =>
			import(
				"astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fblog%2Fk8s-deep-dive-1-intro.mdx&astroContentModuleFlag=true"
			),
	],
	[
		"src/content/blog/k8s-deep-dive-2-pods.mdx",
		() =>
			import(
				"astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fblog%2Fk8s-deep-dive-2-pods.mdx&astroContentModuleFlag=true"
			),
	],
	[
		"src/content/blog/mdx-components-guide.mdx",
		() =>
			import(
				"astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fblog%2Fmdx-components-guide.mdx&astroContentModuleFlag=true"
			),
	],
	[
		"src/content/blog/k8s-deep-dive-3-networking.mdx",
		() =>
			import(
				"astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fblog%2Fk8s-deep-dive-3-networking.mdx&astroContentModuleFlag=true"
			),
	],
	[
		"src/content/blog/using-mdx.mdx",
		() =>
			import(
				"astro:content-layer-deferred-module?astro%3Acontent-layer-deferred-module=&fileName=src%2Fcontent%2Fblog%2Fusing-mdx.mdx&astroContentModuleFlag=true"
			),
	],
]);
