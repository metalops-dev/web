import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
	const posts = await getCollection("blog");
	const publishedPosts = posts.filter((post) => !post.data.draft);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: publishedPosts.map((post) => ({
			...post.data,
			description: post.data.description?.slice(0, 500),
			link: `/blog/${post.id}/`,
		})),
	});
}
