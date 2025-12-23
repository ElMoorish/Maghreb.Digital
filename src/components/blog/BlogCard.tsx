"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { BlogPostMeta } from "@/types/blog";

interface BlogCardProps {
    post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString(
        post.lang === "fr" ? "fr-FR" : "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Link href={`/blog/${post.slug}`}>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Language Badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-sm ${post.lang === "en"
                                    ? "bg-blue-600 text-white"
                                    : "bg-maghrib-terracotta text-white"
                                }`}
                        >
                            {post.lang === "en" ? "English" : "Français"}
                        </span>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-maghrib-charcoal/0 group-hover:bg-maghrib-charcoal/20 transition-colors duration-500 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="w-14 h-14 rounded-full bg-maghrib-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <ArrowUpRight className="w-6 h-6 text-maghrib-terracotta" />
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    {/* Category */}
                    <span className="text-xs tracking-widest uppercase text-maghrib-terracotta mb-2 block">
                        {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-2xl text-maghrib-charcoal mb-3 group-hover:text-maghrib-terracotta transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-maghrib-taupe text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-maghrib-taupe">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {post.author}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
