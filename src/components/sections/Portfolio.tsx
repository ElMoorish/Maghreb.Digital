"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Riad Luxe Collection",
        category: "Hospitality",
        description: "Luxury hospitality booking platform with immersive room tours",
        year: "2025",
        image: "/portfolio/riad-luxe.png",
    },
    {
        id: 2,
        title: "Atlas FinTech",
        category: "Financial Services",
        description: "Mobile banking solution for the modern MENA market",
        year: "2025",
        image: "/portfolio/atlas-fintech.png",
    },
    {
        id: 3,
        title: "Medina Crafts",
        category: "E-Commerce",
        description: "Artisan marketplace connecting craftsmen globally",
        year: "2025",
        image: "/portfolio/medina-crafts.png",
    },
    {
        id: 4,
        title: "Sahara Ventures",
        category: "Corporate",
        description: "Investment firm digital presence and deal flow platform",
        year: "2025",
        image: "/portfolio/sahara-ventures.png",
    },
];

export function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [hoveredId, setHoveredId] = useState<number | null>(null);

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
                        Our Work
                    </p>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-6">
                        Selected Projects
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-maghrib-taupe font-light">
                        A curated collection of our finest work — each project a testament
                        to our commitment to excellence and attention to detail.
                    </p>
                </motion.div>

                {/* Project Grid with Images */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group cursor-pointer"
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
                                <div className="absolute inset-0 bg-maghrib-charcoal/0 group-hover:bg-maghrib-charcoal/20 transition-colors duration-500" />

                                {/* View Project Button */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: hoveredId === project.id ? 1 : 0,
                                        scale: hoveredId === project.id ? 1 : 0.8,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-maghrib-cream flex items-center justify-center shadow-soft-lg">
                                        <ArrowUpRight className="w-6 h-6 text-maghrib-terracotta" />
                                    </div>
                                </motion.div>
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

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="btn-secondary"
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
