import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
	const posts = await getCollection("blog");
	const publishedPosts = posts
		.filter((post) => !post.data.draft)
		.sort(
			(a, b) =>
				new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
		);

	const blogPosts = publishedPosts.map((post) => ({
		id: post.id,
		title: post.data.title,
		pubDate: new Date(post.data.pubDate).toISOString(),
		description: post.data.description,
	}));

	return new Response(JSON.stringify(blogPosts), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
