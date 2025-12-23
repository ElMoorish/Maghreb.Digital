"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ZelligeHeroCorners } from "@/components/intro/ZelligePortal";
import { useDictionary } from "@/components/providers/DictionaryProvider";

const FloatingParticles = dynamic(
    () => import("@/components/three/FloatingParticles").then((mod) => mod.FloatingParticles),
    { ssr: false }
);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true });
    const [showCorners, setShowCorners] = useState(false);
    const { dictionary: t } = useDictionary();

    // Show corners after a delay (portal animation)
    useEffect(() => {
        const timer = setTimeout(() => setShowCorners(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-gradient-warm zellige-pattern texture-overlay overflow-hidden"
        >
            {/* Warm ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-maghrib-terracotta/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-maghrib-gold/5 rounded-full blur-[120px]" />
            </div>

            {/* 3D Floating Particles */}
            <FloatingParticles />

            {/* Zellige Corners */}
            <ZelligeHeroCorners isVisible={showCorners} />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-8"
                >
                    {/* Decorative Element */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="w-20 h-px bg-maghrib-gold/60" />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        variants={itemVariants}
                        className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe"
                    >
                        {t.hero.tagline}
                    </motion.p>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-maghrib-charcoal leading-[1.1]"
                    >
                        {t.hero.headline1}
                        <br />
                        <span className="text-maghrib-terracotta italic">{t.hero.headline2}</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-maghrib-taupe leading-relaxed font-light"
                    >
                        {t.hero.subheadline}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <motion.div
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href="#contact" className="btn-primary group">
                                {t.hero.cta1}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href="#portfolio" className="btn-secondary">
                                {t.hero.cta2}
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom Decorative Border */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="moroccan-divider" />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs tracking-widest uppercase text-maghrib-taupe">{t.hero.scroll}</span>
                    <div className="w-px h-8 bg-gradient-to-b from-maghrib-gold to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
