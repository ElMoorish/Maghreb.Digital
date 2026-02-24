import type { Metadata } from "next";
import { LayoutClient } from "@/components/layout/LayoutClient";
import { locales, isRTL, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { DictionaryProvider } from "@/components/providers/DictionaryProvider";

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const dict = await getDictionary(locale);

    const titles: Record<Locale, string> = {
        fr: "Maghrib.Digital | Agence Digitale Premium",
        en: "Maghrib.Digital | Premium Digital Agency",
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
            locale: locale === "fr" ? "fr_FR" : "en_US",
            siteName: "Maghrib.Digital",
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
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

