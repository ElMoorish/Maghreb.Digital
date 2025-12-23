import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

const notoArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    variable: "--font-arabic",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Maghrib.Digital | Premium Digital Agency",
    description:
        "Where innovation meets heritage. Premium digital agency bridging the MENA region with the global digital economy.",
    icons: {
        icon: "/favicon.png",
        apple: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`${playfair.variable} ${montserrat.variable} ${notoArabic.variable}`}>
            <body className="bg-maghrib-cream text-maghrib-charcoal antialiased">
                {children}
            </body>
        </html>
    );
}
