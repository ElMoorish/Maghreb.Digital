import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Globe2, Building2, CreditCard, Shield, Check, FileText, Landmark, Mail, Calendar } from "lucide-react";

const premiumFeatures = [
    { icon: CreditCard, title: "Stripe-Ready Guarantee", desc: "Structured to ensure compliance matches Stripe's requirements" },
    { icon: Landmark, title: "FinTech Banking Setup", desc: "Mercury, Brex, or Relay accounts for non-US residents" },
    { icon: FileText, title: "Custom Operating Agreement", desc: "Tailored for digital agencies to protect intellectual property" },
    { icon: Mail, title: "Virtual Office & Mail Scanning", desc: "Real street address with scanned mail delivery" },
    { icon: Calendar, title: "Compliance Dashboard", desc: "Automated alerts for Annual Reports and Franchise Tax" },
];

const deliverables = [
    "Delaware/Wyoming LLC Filing",
    "EIN Tax ID (Express Service)",
    "US Business Bank Resolution",
    "Stripe Verification Support",
    "Digital Operating Agreement",
];

export default async function LLCFormationPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = await getDictionary(locale);
    const service = t.services.items.llc;

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
                        Standard Package Includes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Building2 className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">Company Formation</h3>
                            <p className="text-sm text-maghrib-taupe">Filing Articles of Organization</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Mail className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">Registered Agent</h3>
                            <p className="text-sm text-maghrib-taupe">US/UK address for legal mail</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <FileText className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">EIN Acquisition</h3>
                            <p className="text-sm text-maghrib-taupe">Tax ID from the IRS</p>
                        </div>
                    </div>

                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        The Maghrib.Digital Edge
                    </h2>
                    <p className="text-maghrib-taupe mb-12">
                        Premium features designed for MENA entrepreneurs going global.
                    </p>

                    <div className="space-y-6">
                        {premiumFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-6 bg-maghrib-beige rounded-sm">
                                <feature.icon className="w-6 h-6 text-maghrib-terracotta flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-maghrib-charcoal mb-1">{feature.title}</h3>
                                    <p className="text-sm text-maghrib-taupe">{feature.desc}</p>
                                </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Growth */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">Growth</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-4">$1,500</p>
                            <p className="text-sm text-maghrib-taupe mb-6">For entrepreneurs starting out</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> LLC Formation + EIN</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Registered Agent (1 year)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Operating Agreement</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Stripe Verification Support</li>
                            </ul>
                        </div>

                        {/* Empire */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                                Full Service
                            </div>
                            <h3 className="font-heading text-xl mb-2">Empire</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-4">$3,500</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">Complete business infrastructure</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Everything in Growth</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> FinTech Banking Setup</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Virtual Office + Mail Scanning</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Compliance Dashboard</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Tax Strategy Consultation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-6">
                        Ready to Go Global?
                    </h2>
                    <Link href={`/${locale}#contact`} className="btn-primary">
                        {t.nav.getStarted}
                    </Link>
                </div>
            </section>
        </div>
    );
}
