import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft, Users, Languages, MessageSquare, Heart, Sparkles, Check, Calendar, Video, BarChart3, Shield, Palette } from "lucide-react";

const premiumFeatures = [
    { icon: Languages, title: "Cultural & Linguistic Nuance", desc: "Deep understanding of the Maghreb Code — Darija, French, and English that resonates with local buyers" },
    { icon: MessageSquare, title: "Active Community Management", desc: "Real humans reply to comments and DMs, nurturing leads until they're ready to buy" },
    { icon: Sparkles, title: "Trend Adaptation", desc: "Creative adaptation of trends to your brand voice within 24 hours" },
    { icon: Video, title: "Visual Storytelling", desc: "Carousels and reels that tell a cohesive story about your brand's values and mission" },
    { icon: Shield, title: "Crisis Management", desc: "Immediate alerts and strategic responses to negative comments or PR issues" },
];

const deliverables = [
    "Dedicated Account Manager",
    "Bi-Weekly Strategy Calls",
    "Manual Community Engagement (1hr/day)",
    "Custom Video Editing (Premiere Pro/CapCut)",
    "Monthly ROI & Sentiment Report",
];

export default async function SocialMediaPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = await getDictionary(locale);
    const service = t.services.items.social;

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

                    <div className="w-16 h-16 rounded-sm bg-maghrib-cream border border-maghrib-taupe/20 flex items-center justify-center mb-6">
                        <Users className="w-8 h-8 text-maghrib-terracotta" />
                    </div>

                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-maghrib-terracotta bg-maghrib-terracotta/10 border border-maghrib-terracotta/20 rounded-sm">
                            {service.badge}
                        </span>
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

            {/* Standard vs Premium */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <div className="w-12 h-px bg-maghrib-gold mb-8" />
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        Standard Package Includes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Calendar className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">Content Calendar</h3>
                            <p className="text-sm text-maghrib-taupe">Monthly planning & scheduling</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <Palette className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">Graphic Design</h3>
                            <p className="text-sm text-maghrib-taupe">Instagram/LinkedIn layouts</p>
                        </div>
                        <div className="p-6 bg-maghrib-beige rounded-sm text-center">
                            <BarChart3 className="w-8 h-8 text-maghrib-terracotta mx-auto mb-3" />
                            <h3 className="font-medium text-maghrib-charcoal mb-2">Scheduling</h3>
                            <p className="text-sm text-maghrib-taupe">Posts go live on time</p>
                        </div>
                    </div>

                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-4">
                        The Maghrib.Digital Edge
                    </h2>
                    <p className="text-maghrib-taupe mb-12">
                        Human-led social strategy with cultural nuance — not AI-generated content.
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
                        <p className="text-maghrib-taupe">Level of involvement, not number of posts</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">Presence</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-1">$800</p>
                            <p className="text-sm text-maghrib-taupe mb-6">/month</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> 12 Posts/month</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Static Designs + Captions</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Content Calendar</li>
                                <li className="flex items-center gap-2 text-maghrib-taupe/50"><span className="w-4 h-4">—</span> No Community Mgmt</li>
                            </ul>
                        </div>

                        {/* Growth */}
                        <div className="p-8 bg-maghrib-charcoal text-maghrib-cream border-2 border-maghrib-gold rounded-sm relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-maghrib-gold text-maghrib-charcoal text-xs font-medium tracking-wider uppercase rounded-sm">
                                Most Popular
                            </div>
                            <h3 className="font-heading text-xl mb-2">Engagement</h3>
                            <p className="text-3xl font-heading text-maghrib-gold mb-1">$1,800</p>
                            <p className="text-sm text-maghrib-cream/70 mb-6">/month</p>
                            <ul className="space-y-3 text-sm text-maghrib-cream/80">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> 8 Reels + 8 Posts/month</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Daily Story Management</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Community Mgmt (Replies)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Bi-Weekly Strategy Calls</li>
                            </ul>
                        </div>

                        {/* Empire */}
                        <div className="p-8 bg-maghrib-cream border border-maghrib-taupe/20 rounded-sm">
                            <h3 className="font-heading text-xl text-maghrib-charcoal mb-2">Dominance</h3>
                            <p className="text-3xl font-heading text-maghrib-terracotta mb-1">$3,500</p>
                            <p className="text-sm text-maghrib-taupe mb-6">/month</p>
                            <ul className="space-y-3 text-sm text-maghrib-taupe">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Daily Content (30/mo)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Full Video Production</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Dedicated Account Manager</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Crisis Management</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-maghrib-gold" /> Monthly ROI Report</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-maghrib-beige">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-heading text-3xl text-maghrib-charcoal mb-6">
                        Ready to Elevate Your Social Presence?
                    </h2>
                    <Link href={`/${locale}#contact`} className="btn-primary">
                        {t.nav.getStarted}
                    </Link>
                </div>
            </section>
        </div>
    );
}
