"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export interface PricingTier {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    ctaText?: string;
}

interface PricingCardProps {
    tier: PricingTier;
    index: number;
}

export function PricingCard({ tier, index }: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 * index }}
            whileHover={{ y: -8 }}
            className={`relative p-8 lg:p-10 rounded-sm transition-all duration-500 ${tier.highlighted
                ? "bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold"
                : "bg-maghrib-cream border border-maghrib-taupe/20 hover:border-maghrib-gold"
                }`}
        >
            {/* Popular Badge */}
            {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                    Most Popular
                </div>
            )}

            {/* Tier Name */}
            <h3
                className={`font-heading text-2xl mb-2 ${tier.highlighted ? "text-maghrib-cream" : "text-maghrib-charcoal"
                    }`}
            >
                {tier.name}
            </h3>

            {/* Price */}
            <div className="mb-4">
                <span
                    className={`font-heading text-5xl ${tier.highlighted ? "text-maghrib-gold" : "text-maghrib-terracotta"
                        }`}
                >
                    {tier.price}
                </span>
                {tier.period && (
                    <span
                        className={`text-sm ml-2 ${tier.highlighted ? "text-maghrib-cream/60" : "text-maghrib-taupe"
                            }`}
                    >
                        {tier.period}
                    </span>
                )}
            </div>

            {/* Description */}
            <p
                className={`text-sm mb-8 ${tier.highlighted ? "text-maghrib-cream/70" : "text-maghrib-taupe"
                    }`}
            >
                {tier.description}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-maghrib-gold" : "text-maghrib-terracotta"
                                }`}
                        />
                        <span
                            className={`text-sm ${tier.highlighted ? "text-maghrib-cream/80" : "text-maghrib-charcoal"
                                }`}
                        >
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Link
                href="#contact"
                className={`block w-full text-center py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${tier.highlighted
                    ? "bg-maghrib-gold text-maghrib-charcoal hover:bg-maghrib-terracotta"
                    : "bg-maghrib-charcoal text-maghrib-cream hover:bg-maghrib-terracotta"
                    }`}
            >
                {tier.ctaText || "Get Started"}
            </Link>
        </motion.div>
    );
}

interface PricingSectionProps {
    tiers: PricingTier[];
    title?: string;
    subtitle?: string;
}

export function PricingSection({ tiers, title, subtitle }: PricingSectionProps) {
    return (
        <section className="py-24 bg-maghrib-beige">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-16">
                        <div className="w-12 h-px bg-maghrib-gold mx-auto mb-8" />
                        <p className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe mb-4">
                            Pricing
                        </p>
                        {title && (
                            <h2 className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-6">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="max-w-2xl mx-auto text-lg text-maghrib-taupe font-light">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <PricingCard key={tier.name} tier={tier} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
