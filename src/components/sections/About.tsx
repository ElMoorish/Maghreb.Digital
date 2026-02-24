"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Award, BadgeCheck, Users, Clock } from "lucide-react";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import { TechStack } from "@/components/ui/TechStack";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest: number) => Math.round(latest));
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, value, count]);

    return (
        <span ref={ref} className="tabular-nums">
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const { dictionary: t } = useDictionary();

    const stats = [
        { value: 5, suffix: "+", label: t.about.stats.years, icon: Clock },
        { value: 50, suffix: "+", label: t.about.stats.projects, icon: Award },
        { value: 12, suffix: "+", label: t.about.stats.countries, icon: Users },
        { value: 98, suffix: "%", label: t.about.stats.satisfaction, icon: BadgeCheck },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-32 bg-maghrib-beige"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-32"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 * index }}
                            className="text-center"
                        >
                            <stat.icon className="w-6 h-6 text-maghrib-gold mx-auto mb-4" />
                            <div className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm text-maghrib-taupe tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left: Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-12 h-px bg-maghrib-gold mb-8" />
                        <p className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe mb-4">
                            {t.about.tagline}
                        </p>
                        <h2 className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-8 leading-tight">
                            {t.about.headline}
                        </h2>
                        <div className="space-y-6 text-maghrib-taupe leading-relaxed">
                            <p>{t.about.description1}</p>
                            <p>{t.about.description2}</p>
                        </div>
                    </motion.div>

                    {/* Right: Decorative */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="relative"
                    >
                        <div
                            className="aspect-square rounded-sm overflow-hidden"
                            style={{
                                maskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
                            }}
                        >
                            <img
                                src="/md-est-2020.png"
                                alt="M.D Est. 2020"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tech Stack Slideshow */}
            <TechStack />
        </section>
    );
}
