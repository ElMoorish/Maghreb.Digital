"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type LLCPricingProps = {
    content: any;
    popularLabel: string;
    title: string;
};

export function LLCPricingTabs({ content, popularLabel, title }: LLCPricingProps) {
    const [activeTab, setActiveTab] = useState<'standard' | 'anonymous'>('standard');

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header & Tabs */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        {title}
                    </h2>
                    <p className="text-maghrib-taupe max-w-2xl mb-8">
                        {activeTab === 'standard' ? content.pricingDesc : content.anonymousSubtitle}
                    </p>

                    {/* Tab Switcher */}
                    <div className="inline-flex bg-maghrib-cream p-1.5 rounded-sm border border-maghrib-taupe/20 shadow-sm">
                        <button
                            onClick={() => setActiveTab('standard')}
                            className={`px-8 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${activeTab === 'standard'
                                ? 'bg-maghrib-terracotta text-maghrib-cream shadow-md'
                                : 'text-maghrib-taupe hover:text-maghrib-charcoal hover:bg-maghrib-beige/50'
                                }`}
                        >
                            {content.toggleStandard}
                        </button>
                        <button
                            onClick={() => setActiveTab('anonymous')}
                            className={`px-8 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${activeTab === 'anonymous'
                                ? 'bg-maghrib-terracotta text-maghrib-cream shadow-md'
                                : 'text-maghrib-taupe hover:text-maghrib-charcoal hover:bg-maghrib-beige/50'
                                }`}
                        >
                            {content.toggleAnonymous}
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                {activeTab === 'standard' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Starter */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">{content.starter}</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">{content.starterPrice}</p>
                            <p className="text-sm text-maghrib-taupe mb-6">{content.starterDesc}</p>
                            <ul className="space-y-3 text-sm">
                                {content.starterFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left text-maghrib-charcoal">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Growth (Recommended) */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm relative shadow-sm">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-terracotta text-maghrib-cream text-xs font-medium tracking-wider uppercase rounded-sm">
                                {popularLabel}
                            </div>
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">{content.growth}</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">{content.growthPrice}</p>
                            <p className="text-sm text-maghrib-taupe mb-6">{content.growthDesc}</p>
                            <ul className="space-y-3 text-sm">
                                {content.growthFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left text-maghrib-charcoal">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Business */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm">
                            <h3 className="font-heading text-xl mb-2 text-maghrib-cream">{content.business}</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-4">{content.businessPrice}</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">{content.businessDesc}</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                {content.businessFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Anonymous Basic */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">{content.anonymousBasic}</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">{content.anonymousBasicPrice}</p>
                            <p className="text-sm text-maghrib-taupe mb-6">{content.anonymousBasicDesc}</p>
                            <ul className="space-y-3 text-sm">
                                {content.anonymousBasicFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left text-maghrib-charcoal">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Anonymous Pro */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm">
                            <h3 className="font-heading text-xl mb-2 text-maghrib-cream">{content.anonymousPro}</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-4">{content.anonymousProPrice}</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">{content.anonymousProDesc}</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                {content.anonymousProFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
