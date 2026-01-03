"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useDictionary } from "@/components/providers/DictionaryProvider";

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    description: string;
    year: string;
    image: string;
}

export function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const { dictionary: t } = useDictionary();

    const items = t.portfolio.items as PortfolioItem[];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <section
            id="portfolio"
            ref={containerRef}
            className="relative py-32 bg-maghrib-cream zellige-pattern"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center mb-20"
                >
                    <div className="w-12 h-px bg-maghrib-gold mx-auto mb-8" />
                    <p className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe mb-4">
                        {t.portfolio.tagline}
                    </p>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-6">
                        {t.portfolio.headline}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-maghrib-taupe font-light">
                        {t.portfolio.subheadline}
                    </p>
                </motion.div>

                {/* Project Grid with Images */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {items.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-maghrib-charcoal/0 group-hover:bg-maghrib-charcoal/10 transition-colors duration-500" />
                            </div>

                            {/* Project Info */}
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-xs tracking-widest uppercase text-maghrib-taupe">
                                    {project.category}
                                </span>
                                <span className="text-maghrib-taupe/40">·</span>
                                <span className="text-xs text-maghrib-taupe">{project.year}</span>
                            </div>
                            <h3 className="font-heading text-2xl md:text-3xl text-maghrib-charcoal mb-2 group-hover:text-maghrib-terracotta transition-colors duration-500">
                                {project.title}
                            </h3>
                            <p className="text-maghrib-taupe text-sm">
                                {project.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
