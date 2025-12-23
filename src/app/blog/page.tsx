import { getAllPosts } from "@/lib/blog";
import { BlogListingClient } from "./BlogListingClient";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
    title: "Blog | Maghrib.Digital",
    description: "Insights on web development, business growth, and digital strategy from our team of experts.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return <BlogListingClient posts={posts} />;
}
