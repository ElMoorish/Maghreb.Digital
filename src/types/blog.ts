export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    image: string;
    lang: "en" | "fr";
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    image: string;
    lang: "en" | "fr";
}
