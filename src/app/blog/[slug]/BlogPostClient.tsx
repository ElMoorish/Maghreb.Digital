"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostClientProps {
    post: BlogPost;
}

function estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export function BlogPostClient({ post }: BlogPostClientProps) {
    const formattedDate = new Date(post.date).toLocaleDateString(
        post.lang === "fr" ? "fr-FR" : "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const readingTime = estimateReadingTime(post.content);
    const readingLabel = post.lang === "fr" ? "min de lecture" : "min read";

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = post.title;

    return (
        <div className="min-h-screen bg-maghrib-cream">
            {/* Hero Section */}
            <section className="pt-32 pb-12 bg-gradient-warm zellige-pattern">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-maghrib-taupe hover:text-maghrib-terracotta transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {post.lang === "fr" ? "Retour au Blog" : "Back to Blog"}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Category & Language */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs tracking-widest uppercase text-maghrib-terracotta">
                                {post.category}
                            </span>
                            <span className="text-maghrib-taupe/40">·</span>
                            <span
                                className={`px-2 py-0.5 text-xs font-medium tracking-wider uppercase rounded-sm ${post.lang === "en"
                                        ? "bg-blue-600 text-white"
                                        : "bg-maghrib-terracotta text-white"
                                    }`}
                            >
                                {post.lang === "en" ? "English" : "Français"}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-8 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-maghrib-taupe">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {readingTime} {readingLabel}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="relative -mt-4">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-soft-lg"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <article className="py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="prose prose-lg prose-maghrib max-w-none"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                    />

                    {/* Share Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 pt-8 border-t border-maghrib-taupe/20"
                    >
                        <div className="flex items-center gap-4">
                            <Share2 className="w-5 h-5 text-maghrib-taupe" />
                            <span className="text-sm text-maghrib-taupe font-medium">
                                {post.lang === "fr" ? "Partager :" : "Share:"}
                            </span>
                            <div className="flex items-center gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-maghrib-beige border border-maghrib-taupe/10 flex items-center justify-center hover:bg-maghrib-charcoal hover:text-maghrib-cream transition-all duration-300"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-maghrib-beige border border-maghrib-taupe/10 flex items-center justify-center hover:bg-maghrib-charcoal hover:text-maghrib-cream transition-all duration-300"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-maghrib-beige border border-maghrib-taupe/10 flex items-center justify-center hover:bg-maghrib-charcoal hover:text-maghrib-cream transition-all duration-300"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </article>

            {/* CTA Section */}
            <section className="py-16 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl text-maghrib-charcoal mb-4">
                        {post.lang === "fr"
                            ? "Prêt à transformer votre vision ?"
                            : "Ready to Transform Your Vision?"}
                    </h2>
                    <p className="text-maghrib-taupe mb-8">
                        {post.lang === "fr"
                            ? "Discutons de votre prochain projet."
                            : "Let's discuss your next project."}
                    </p>
                    <Link href="/#contact" className="btn-primary">
                        {post.lang === "fr" ? "Nous Contacter" : "Get in Touch"}
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Simple markdown parser for basic formatting
function parseMarkdown(content: string): string {
    return content
        // Tables - convert to HTML table
        .replace(/^\|(.+)\|$/gm, (match, row) => {
            const cells = row.split('|').map((cell: string) => cell.trim());
            // Check if it's a separator row
            if (cells.every((cell: string) => /^[-:]+$/.test(cell))) {
                return ''; // Skip separator rows
            }
            const isHeader = cells.some((cell: string) => /\*\*(.+)\*\*/.test(cell));
            const cellTag = isHeader ? 'th' : 'td';
            const cellsHtml = cells.map((cell: string) => `<${cellTag} class="px-4 py-2 text-left border-b border-maghrib-taupe/20">${cell}</${cellTag}>`).join('');
            return `<tr>${cellsHtml}</tr>`;
        })
        // Wrap consecutive table rows in table tag
        .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
            return `<table class="w-full my-6 border-collapse">${match}</table>`;
        })
        // Horizontal rules
        .replace(/^---$/gm, '<hr class="my-8 border-t border-maghrib-taupe/20" />')
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="font-heading text-xl text-maghrib-charcoal mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="font-heading text-2xl text-maghrib-charcoal mt-10 mb-6">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="font-heading text-3xl text-maghrib-charcoal mt-12 mb-6">$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-maghrib-charcoal">$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-maghrib-terracotta hover:underline">$1</a>')
        // Checkmarks and X marks
        .replace(/✅/g, '<span class="text-green-600">✓</span>')
        .replace(/❌/g, '<span class="text-red-600">✗</span>')
        // Numbered lists
        .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 list-decimal text-maghrib-taupe">$2</li>')
        // Unordered lists
        .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-maghrib-taupe">$1</li>')
        // Wrap consecutive list items in ul/ol
        .replace(/(<li class="ml-6 list-disc.*<\/li>\n?)+/g, (match) => `<ul class="my-4">${match}</ul>`)
        .replace(/(<li class="ml-6 list-decimal.*<\/li>\n?)+/g, (match) => `<ol class="my-4">${match}</ol>`)
        // Paragraphs
        .replace(/\n\n/g, '</p><p class="text-maghrib-taupe leading-relaxed mb-6">')
        // Wrap in paragraph
        .replace(/^(.+)$/gm, (match) => {
            if (match.startsWith('<')) return match;
            return `<p class="text-maghrib-taupe leading-relaxed mb-6">${match}</p>`;
        });
}
