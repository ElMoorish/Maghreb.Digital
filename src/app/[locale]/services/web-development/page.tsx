import { getDictionary } from "@/i18n/getDictionary";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Code2, Check } from "lucide-react";

const premiumFeatures = [
    "Next.js 16 Architecture — Instant loading with Server-Side Rendering",
    "Headless CMS Integration — Custom dashboard for easy content updates",
    "3-Language Support (i18n) — Arabic (RTL), French, and English",
    "3D Product Interaction — Rotating products with Framer Motion",
    "Conversion Rate Optimization — Exit-intent popups, sticky CTAs",
    "Technical SEO Audit — Speed Index Score > 90",
];

const deliverables = [
    "Custom Next.js Frontend",
    "Headless CMS Dashboard",
    "Technical SEO Audit",
    "Speed Index Score > 90",
    "3-Language Localization",
];

export default async function WebDevelopmentPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = await getDictionary(locale);
    const service = t.services.items.web;

    return (
        <div className="min-h-screen bg-maghrib-cream">
            {/* Hero Section */}
            <section className="py-32 bg-gradient-to-b from-maghrib-beige to-maghrib-cream">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <Link
                        href={`/${locale}#services`}
                        className="inline-flex items-center gap-2 text-maghrib-taupe hover:text-maghrib-terracotta transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                        <span>Back to Services</span>
                    </Link>

                    <div className="w-16 h-16 rounded-sm bg-maghrib-cream border border-maghrib-taupe/20 flex items-center justify-center mb-8">
                        <Code2 className="w-8 h-8 text-maghrib-terracotta" />
                    </div>

                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-4">
                        {service.title}
                    </h1>
                    <p className="text-2xl text-maghrib-terracotta italic mb-8">
                        &ldquo;{service.hook}&rdquo;
                    </p>
                    <p className="text-lg text-maghrib-taupe leading-relaxed max-w-2xl">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Premium Features */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <div className="w-12 h-px bg-maghrib-gold mb-8" />
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        The Maghrib.Digital Edge
                    </h2>
                    <p className="text-maghrib-taupe mb-12">
                        What sets us apart from standard web development agencies.
                    </p>

                    <div className="space-y-6">
                        {premiumFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 bg-maghrib-beige rounded-sm">
                                <Check className="w-5 h-5 text-maghrib-terracotta mt-0.5 flex-shrink-0" />
                                <span className="text-maghrib-charcoal">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-8">
                        Deliverables
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-maghrib-cream rounded-sm border border-maghrib-taupe/10">
                                <Check className="w-4 h-4 text-maghrib-gold" />
                                <span className="text-sm text-maghrib-charcoal">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                            Pricing Packages
                        </h2>
                        <p className="text-maghrib-taupe">Choose the level that fits your needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">Starter</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">$1,500</p>
                            <p className="text-sm text-maghrib-taupe mb-6">Perfect for solopreneurs</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> One-Page Landing</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Next.js Architecture</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Responsive Design</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Basic SEO</li>
                            </ul>
                        </div>

                        {/* Growth */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                                Most Popular
                            </div>
                            <h3 className="font-heading text-xl mb-2">Growth</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-4">$4,000</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">For established brands</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> 5-Page Corporate Site</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Headless CMS</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> 3-Language Support</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Technical SEO Audit</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> 3D Interactions</li>
                            </ul>
                        </div>

                        {/* Empire */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">Empire</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">$10,000+</p>
                            <p className="text-sm text-maghrib-taupe mb-6">For funded startups</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Full E-Commerce / Custom App</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Everything in Growth</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Custom Integrations</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Priority Support</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Monthly Retainer Option</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-6">
                        Ready to Build Your Digital Presence?
                    </h2>
                    <Link href={`/${locale}#contact`} className="btn-primary">
                        {t.nav.getStarted}
                    </Link>
                </div>
            </section>
        </div>
    );
}
