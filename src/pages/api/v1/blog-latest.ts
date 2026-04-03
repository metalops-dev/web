import { getCollection } from "astro:content";

export async function GET() {
	try {
		const posts = await getCollection("blog");
		const publishedPosts = posts
			.filter((post) => !post.data.draft)
			.sort(
				(a, b) =>
					new Date(b.data.pubDate).getTime() -
					new Date(a.data.pubDate).getTime(),
			);

		if (publishedPosts.length === 0) {
			return new Response(
				JSON.stringify({ error: "No published posts found" }),
				{
					status: 404,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const latestPost = publishedPosts[0];

		return new Response(
			JSON.stringify({
				title: latestPost.data.title,
				pubDate: new Date(latestPost.data.pubDate).toISOString(),
				description: latestPost.data.description,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
