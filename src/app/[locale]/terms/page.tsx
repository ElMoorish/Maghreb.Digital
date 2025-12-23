import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = await getDictionary(locale);

    return (
        <div className="min-h-screen bg-maghrib-cream py-32">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                {/* Back Link */}
                <Link
                    href={`/${locale}`}
                    className="inline-flex items-center gap-2 text-maghrib-taupe hover:text-maghrib-terracotta transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    <span>Back to Home</span>
                </Link>

                <h1 className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-4">
                    {t.terms.title}
                </h1>
                <p className="text-maghrib-taupe mb-12">
                    {t.terms.lastUpdated}: December 2024
                </p>

                <div className="space-y-12">
                    {Object.entries(t.terms.sections).map(([key, section]) => (
                        <div key={key}>
                            <h2 className="font-heading text-2xl text-maghrib-charcoal mb-4">
                                {section.title}
                            </h2>
                            <p className="text-maghrib-taupe leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
