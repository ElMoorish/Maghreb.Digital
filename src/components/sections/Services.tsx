"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Code2,
    Globe2,
    Users,
    Sparkles,
    ArrowRight,
    Cpu,
    Palette,
    LineChart,
    Building2,
    CreditCard,
    Shield,
    MessageSquare,
    Heart,
    Languages,
} from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/components/providers/DictionaryProvider";

const featureIcons = {
    web: [Cpu, Palette, LineChart, Sparkles],
    llc: [Building2, CreditCard, Shield, Globe2],
    social: [Languages, MessageSquare, Heart, Sparkles],
};

const serviceIcons = {
    web: Code2,
    llc: Globe2,
    social: Users,
};

export function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const { dictionary: t } = useDictionary();

    const services = [
        {
            id: "web" as const,
            title: t.services.items.web.title,
            hook: t.services.items.web.hook,
            description: t.services.items.web.description,
            features: t.services.items.web.features,
        },
        {
            id: "llc" as const,
            title: t.services.items.llc.title,
            hook: t.services.items.llc.hook,
            description: t.services.items.llc.description,
            features: t.services.items.llc.features,
        },
        {
            id: "social" as const,
            title: t.services.items.social.title,
            hook: t.services.items.social.hook,
            description: t.services.items.social.description,
            features: t.services.items.social.features,
            badge: t.services.items.social.badge,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative py-32 bg-maghrib-beige"
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
                        {t.services.tagline}
                    </p>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-6">
                        {t.services.headline}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-maghrib-taupe font-light">
                        {t.services.subheadline}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => {
                        const ServiceIcon = serviceIcons[service.id];
                        const icons = featureIcons[service.id];

                        return (
                            <motion.div
                                key={service.id}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4 }}
                                className="relative warm-card p-8 lg:p-10 group"
                            >
                                {/* Badge */}
                                {service.badge && (
                                    <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 px-3 py-1 text-xs font-medium tracking-wider uppercase text-maghrib-terracotta bg-maghrib-terracotta/10 border border-maghrib-terracotta/20 rounded-sm">
                                        {service.badge}
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-sm bg-maghrib-beige border border-maghrib-taupe/20 flex items-center justify-center mb-8 group-hover:border-maghrib-gold transition-colors duration-500">
                                    <ServiceIcon className="w-6 h-6 text-maghrib-terracotta" />
                                </div>

                                {/* Content */}
                                <h3 className="font-heading text-2xl text-maghrib-charcoal mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-maghrib-terracotta font-medium mb-4 italic">
                                    &ldquo;{service.hook}&rdquo;
                                </p>
                                <p className="text-maghrib-taupe leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    {service.features.map((feature, idx) => {
                                        const FeatureIcon = icons[idx];
                                        return (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-2 text-sm text-maghrib-taupe"
                                            >
                                                <FeatureIcon className="w-4 h-4 text-maghrib-gold" />
                                                <span>{feature}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* CTA */}
                                <Link
                                    href="#contact"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-maghrib-charcoal group/link"
                                >
                                    <span className="border-b border-maghrib-charcoal/30 group-hover/link:border-maghrib-gold transition-colors duration-300">
                                        {t.services.learnMore}
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
