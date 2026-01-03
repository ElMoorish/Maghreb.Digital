import { getDictionary } from "@/i18n/getDictionary";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Code2, Check } from "lucide-react";
import { WebPricingTabs } from "@/components/sections/WebPricingTabs";

export default async function WebDevelopmentPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = await getDictionary(locale);
    const service = t.services.items.web;
    const p = t.services.pages;
    const webPage = p.web;

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
                        <span>{p.backToServices}</span>
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
                        {p.edge}
                    </h2>
                    <p className="text-maghrib-taupe mb-12">
                        {p.edgeDesc}
                    </p>

                    <div className="space-y-6">
                        {webPage.premiumFeatures.map((feature: string, idx: number) => (
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
                        {p.deliverables}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {webPage.deliverables.map((item: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-maghrib-cream rounded-sm border border-maghrib-taupe/10">
                                <Check className="w-4 h-4 text-maghrib-gold" />
                                <span className="text-sm text-maghrib-charcoal">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <WebPricingTabs
                content={webPage}
                popularLabel={webPage.recommended || "Recommended"}
                title={p.pricingPackages}
            />

            {/* CTA */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-6">
                        {p.readyToBuild}
                    </h2>
                    <Link href={`/${locale}#contact`} className="btn-primary">
                        {t.nav.getStarted}
                    </Link>
                </div>
            </section>
        </div>
    );
}
