import type { Metadata } from "next";
import { LayoutClient } from "@/components/layout/LayoutClient";
import { locales, isRTL, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { DictionaryProvider } from "@/components/providers/DictionaryProvider";

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    const titles: Record<Locale, string> = {
        fr: "Maghrib.Digital | Agence Digitale Premium",
        en: "Maghrib.Digital | Premium Digital Agency",
        ar: "Maghrib.Digital | وكالة رقمية متميزة",
    };

    return {
        title: titles[locale],
        description: dict.hero.subheadline,
        keywords: [
            "digital agency",
            "Morocco",
            "web development",
            "LLC formation",
            "social media",
            "MENA",
        ],
        authors: [{ name: "Maghrib.Digital" }],
        icons: {
            icon: "/favicon.png",
            apple: "/favicon.png",
        },
        openGraph: {
            title: titles[locale],
            description: dict.hero.subheadline,
            type: "website",
            locale: locale === "fr" ? "fr_FR" : locale === "ar" ? "ar_MA" : "en_US",
            siteName: "Maghrib.Digital",
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}>) {
    const { locale } = await params;
    const dictionary = await getDictionary(locale);
    const rtl = isRTL(locale);

    return (
        <div lang={locale} dir={rtl ? "rtl" : "ltr"}>
            <DictionaryProvider dictionary={dictionary} locale={locale}>
                <LayoutClient locale={locale}>{children}</LayoutClient>
            </DictionaryProvider>
        </div>
    );
}
