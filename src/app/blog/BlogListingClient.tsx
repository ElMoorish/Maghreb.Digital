"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { LanguageFilter } from "@/components/blog/LanguageFilter";
import { BlogPostMeta } from "@/types/blog";

interface BlogListingClientProps {
    posts: BlogPostMeta[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
    const [activeFilter, setActiveFilter] = useState<"all" | "en" | "fr">("all");

    const filteredPosts = useMemo(() => {
        if (activeFilter === "all") return posts;
        return posts.filter((post) => post.lang === activeFilter);
    }, [posts, activeFilter]);

    return (
        <div className="min-h-screen bg-maghrib-cream">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-warm zellige-pattern">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-maghrib-taupe hover:text-maghrib-terracotta transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-12 h-px bg-maghrib-gold mb-8" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-sm bg-maghrib-beige border border-maghrib-gold/30 flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-maghrib-terracotta" />
                            </div>
                            <p className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe">
                                Insights & Resources
                            </p>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-maghrib-charcoal mb-6">
                            Our <span className="text-maghrib-terracotta italic">Blog</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-maghrib-taupe font-light leading-relaxed">
                            Insights on web development, business growth, and digital strategy
                            from our team of experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter & Posts Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    {/* Language Filter */}
                    <div className="flex justify-center mb-12">
                        <LanguageFilter
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                    </div>

                    {/* Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <BookOpen className="w-16 h-16 text-maghrib-taupe/30 mx-auto mb-6" />
                            <h3 className="font-heading text-2xl text-maghrib-charcoal mb-2">
                                No posts yet
                            </h3>
                            <p className="text-maghrib-taupe">
                                {activeFilter === "all"
                                    ? "New articles coming soon!"
                                    : `No ${activeFilter === "en" ? "English" : "French"} articles yet.`}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
