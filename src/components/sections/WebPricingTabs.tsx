"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type WebPricingProps = {
    content: any;
    popularLabel: string;
    title: string;
};

export function WebPricingTabs({ content, popularLabel, title }: WebPricingProps) {
    const [activeTab, setActiveTab] = useState<'cms' | 'code'>('cms');

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header & Tabs */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        {title}
                    </h2>
                    <p className="text-maghrib-taupe max-w-2xl mb-8">
                        {activeTab === 'cms' ? content.websiteCreationDesc : content.fullDevCodeDesc}
                    </p>

                    {/* Tab Switcher */}
                    <div className="inline-flex bg-maghrib-cream p-1.5 rounded-sm border border-maghrib-taupe/20 shadow-sm">
                        <button
                            onClick={() => setActiveTab('cms')}
                            className={`px-8 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${activeTab === 'cms'
                                ? 'bg-maghrib-terracotta text-maghrib-cream shadow-md'
                                : 'text-maghrib-taupe hover:text-maghrib-charcoal hover:bg-maghrib-beige/50'
                                }`}
                        >
                            {content.websiteCreation}
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-8 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${activeTab === 'code'
                                ? 'bg-maghrib-terracotta text-maghrib-cream shadow-md'
                                : 'text-maghrib-taupe hover:text-maghrib-charcoal hover:bg-maghrib-beige/50'
                                }`}
                        >
                            {content.fullDevCode}
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Vitrine */}
                    <PricingCard
                        title={content.vitrine}
                        price={activeTab === 'cms' ? content.vitrinePriceCMS : content.vitrinePriceCode}
                        desc={content.vitrineDesc}
                        features={content.vitrineFeatures}
                    />

                    {/* E-Commerce (Highlighted) */}
                    <PricingCard
                        title={content.ecommerce}
                        price={activeTab === 'cms' ? content.ecommercePriceCMS : content.ecommercePriceCode}
                        desc={content.ecommerceDesc}
                        features={content.ecommerceFeatures}
                        isPopular
                        popularLabel={popularLabel}
                    />

                    {/* E-Commerce Plus */}
                    <PricingCard
                        title={content.ecommercePlus}
                        price={activeTab === 'cms' ? content.ecommercePlusPriceCMS : content.ecommercePlusPriceCode}
                        desc={content.ecommercePlusDesc}
                        features={content.ecommercePlusFeatures}
                    />
                </div>
            </div>
        </section>
    );
}

function PricingCard({ title, price, desc, features, isPopular, popularLabel }: any) {
    return (
        <div className={`p-8 rounded-sm border transition-all duration-300 ${isPopular ? 'bg-maghrib-charcoal text-maghrib-cream border-maghrib-gold border-2 relative shadow-xl transform md:-translate-y-2' : 'bg-maghrib-cream border-maghrib-taupe/20 text-maghrib-charcoal hover:border-maghrib-terracotta/30 hover:shadow-lg'}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm shadow-sm">
                    {popularLabel}
                </div>
            )}
            <h4 className={`font-heading text-xl mb-2 ${isPopular ? 'text-maghrib-cream' : 'text-maghrib-charcoal'}`}>{title}</h4>
            <p className={`text-3xl font-heading mb-4 ${isPopular ? 'text-maghrib-gold' : 'text-maghrib-terracotta'}`}>{price}</p>
            <p className={`text-sm mb-6 ${isPopular ? 'text-maghrib-cream/70' : 'text-maghrib-taupe'}`}>{desc}</p>
            <ul className="space-y-3 text-sm">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" />
                        <span className={isPopular ? 'text-maghrib-cream/80' : 'text-maghrib-charcoal'}>{f}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
