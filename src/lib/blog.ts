import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostMeta } from "@/types/blog";

const contentDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPostMeta[] {
    const languages = ["en", "fr"] as const;
    const posts: BlogPostMeta[] = [];

    for (const lang of languages) {
        const langDir = path.join(contentDirectory, lang);

        if (!fs.existsSync(langDir)) continue;

        const files = fs.readdirSync(langDir);

        for (const file of files) {
            if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

            const filePath = path.join(langDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data } = matter(fileContent);

            posts.push({
                slug: file.replace(/\.mdx?$/, ""),
                title: data.title || "Untitled",
                excerpt: data.excerpt || "",
                date: data.date || new Date().toISOString(),
                author: data.author || "Maghrib.Digital",
                category: data.category || "General",
                image: data.image || "/blog/default.jpg",
                lang: lang,
            });
        }
    }

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
    const languages = ["en", "fr"] as const;

    for (const lang of languages) {
        const filePath = path.join(contentDirectory, lang, `${slug}.mdx`);
        const mdFilePath = path.join(contentDirectory, lang, `${slug}.md`);

        let actualPath = "";
        if (fs.existsSync(filePath)) {
            actualPath = filePath;
        } else if (fs.existsSync(mdFilePath)) {
            actualPath = mdFilePath;
        } else {
            continue;
        }

        const fileContent = fs.readFileSync(actualPath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title || "Untitled",
            excerpt: data.excerpt || "",
            date: data.date || new Date().toISOString(),
            author: data.author || "Maghrib.Digital",
            category: data.category || "General",
            image: data.image || "/blog/default.jpg",
            lang: lang,
            content,
        };
    }

    return null;
}

export function getPostsByLanguage(lang: "en" | "fr"): BlogPostMeta[] {
    return getAllPosts().filter((post) => post.lang === lang);
}
