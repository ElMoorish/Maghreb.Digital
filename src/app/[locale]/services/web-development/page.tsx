import { getDictionary } from "@/i18n/getDictionary";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Code2, Check } from "lucide-react";

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
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                            {p.pricingPackages}
                        </h2>
                        <p className="text-maghrib-taupe">{p.pricingDesc}</p>
                    </div>

                    {/* Shopify / WordPress / Youcan */}
                    <div className="mb-16">
                        <h3 className="font-heading text-2xl text-maghrib-charcoal mb-2 text-center">{webPage.websiteCreation}</h3>
                        <p className="text-maghrib-taupe text-center mb-8">{webPage.websiteCreationDesc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Vitrine */}
                            <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                                <h4 className="font-heading text-xl text-maghrib-charcoal mb-2">{webPage.vitrine}</h4>
                                <p className="text-3xl font-heading text-maghrib-terracotta mb-1">{webPage.vitrinePrice}</p>
                                <p className="text-sm text-maghrib-taupe mb-6">{webPage.vitrineDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-taupe">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.responsive}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.essentialPages}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.basicSeo}</li>
                                </ul>
                            </div>

                            {/* E-Commerce */}
                            <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                                    {webPage.popular}
                                </div>
                                <h4 className="font-heading text-xl mb-2">{webPage.ecommerce}</h4>
                                <p className="text-3xl font-heading text-maghrib-gold mb-1">{webPage.ecommercePrice}</p>
                                <p className="text-sm text-maghrib-cream/70 mb-6">{webPage.ecommerceDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.productCatalog}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.onlinePayment}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.orderManagement}</li>
                                </ul>
                            </div>

                            {/* Full Package */}
                            <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                                <h4 className="font-heading text-xl text-maghrib-charcoal mb-2">{webPage.fullPackage}</h4>
                                <p className="text-3xl font-heading text-maghrib-terracotta mb-1">{webPage.fullPackagePrice}</p>
                                <p className="text-sm text-maghrib-taupe mb-6">{webPage.fullPackageDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-taupe">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.fullConception}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.socialIncluded}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.hostingIncluded}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Full Dev Code */}
                    <div>
                        <h3 className="font-heading text-2xl text-maghrib-charcoal mb-2 text-center">{webPage.fullDevCode}</h3>
                        <p className="text-maghrib-taupe text-center mb-8">{webPage.fullDevCodeDesc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Vitrine */}
                            <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                                <h4 className="font-heading text-xl text-maghrib-charcoal mb-2">{webPage.vitrine}</h4>
                                <p className="text-3xl font-heading text-maghrib-terracotta mb-1">{webPage.vitrineDevPrice}</p>
                                <p className="text-sm text-maghrib-taupe mb-6">{webPage.vitrineDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-taupe">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.nextjsArch}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.responsive}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.seoOptimized}</li>
                                </ul>
                            </div>

                            {/* E-Commerce + CRM */}
                            <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                                    {webPage.recommended}
                                </div>
                                <h4 className="font-heading text-xl mb-2">{webPage.ecommerceCrm}</h4>
                                <p className="text-3xl font-heading text-maghrib-gold mb-1">{webPage.ecommerceCrmPrice}</p>
                                <p className="text-sm text-maghrib-cream/70 mb-6">{webPage.ecommerceCrmDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.headlessCms}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.ecommerceIntegrated}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.customDashboard}</li>
                                </ul>
                            </div>

                            {/* Full Package */}
                            <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                                <h4 className="font-heading text-xl text-maghrib-charcoal mb-2">{webPage.fullPackage}</h4>
                                <p className="text-3xl font-heading text-maghrib-terracotta mb-1">{webPage.fullPackageDevPrice}</p>
                                <p className="text-sm text-maghrib-taupe mb-6">{webPage.fullPackageDesc}</p>
                                <ul className="space-y-3 text-sm text-maghrib-taupe">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.fullConception}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.socialIncluded}</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> {webPage.features.premiumHosting}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
