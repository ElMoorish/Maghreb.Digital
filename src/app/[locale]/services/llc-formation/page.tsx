import { getDictionary } from "@/i18n/getDictionary";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Globe2, Building2, Check, FileText, Mail } from "lucide-react";
import { CreditCard, Landmark, Calendar } from "lucide-react";
import { LucideIcon } from "lucide-react";

const featureIcons: LucideIcon[] = [CreditCard, Landmark, FileText, Mail, Calendar];

export default async function LLCFormationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = await getDictionary(locale);
    const service = t.services.items.llc;
    const p = t.services.pages;
    const llcPage = p.llc;

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
                        <Globe2 className="w-8 h-8 text-maghrib-terracotta" />
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

            {/* Standard Features */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <div className="w-12 h-px bg-maghrib-gold mb-8" />
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        {llcPage.standardPackage}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Building2 className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">{llcPage.companyFormation}</h3>
                            <p className="text-sm text-maghrib-taupe">{llcPage.companyFormationDesc}</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Mail className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">{llcPage.registeredAgent}</h3>
                            <p className="text-sm text-maghrib-taupe">{llcPage.registeredAgentDesc}</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <FileText className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">{llcPage.einAcquisition}</h3>
                            <p className="text-sm text-maghrib-taupe">{llcPage.einAcquisitionDesc}</p>
                        </div>
                    </div>

                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        {p.edge}
                    </h2>
                    <p className="text-maghrib-taupe mb-12">
                        {p.edgeDesc}
                    </p>

                    <div className="space-y-6">
                        {llcPage.premiumFeatures.map((feature: { title: string; desc: string }, idx: number) => {
                            const FeatureIcon = featureIcons[idx] || Check;
                            return (
                                <div key={idx} className="flex items-start gap-4 p-6 bg-maghrib-beige rounded-sm">
                                    <FeatureIcon className="w-6 h-6 text-maghrib-terracotta flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-maghrib-charcoal mb-1">{feature.title}</h3>
                                        <p className="text-sm text-maghrib-taupe">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
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
                        {llcPage.deliverables.map((item: string, idx: number) => (
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
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                            {p.pricingPackages}
                        </h2>
                        <p className="text-maghrib-taupe">{p.pricingDesc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Starter */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">{llcPage.starter}</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">{llcPage.starterPrice}</p>
                            <p className="text-sm text-maghrib-taupe mb-6">{llcPage.starterDesc}</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                {llcPage.starterFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Growth */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm relative shadow-sm">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-terracotta text-maghrib-cream text-xs font-medium tracking-wider uppercase rounded-sm">
                                Recommended
                            </div>
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">{llcPage.growth}</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">{llcPage.growthPrice}</p>
                            <p className="text-sm text-maghrib-taupe mb-6">{llcPage.growthDesc}</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                {llcPage.growthFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Business */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                            <h3 className="font-heading text-xl mb-2">{llcPage.business}</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-4">{llcPage.businessPrice}</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">{llcPage.businessDesc}</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                {llcPage.businessFeatures.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-maghrib-gold flex-shrink-0" /> <span className="text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-6">
                        {p.readyToGrow}
                    </h2>
                    <Link href={`/${locale}#contact`} className="btn-primary">
                        {t.nav.getStarted}
                    </Link>
                </div>
            </section>
        </div>
    );
}
