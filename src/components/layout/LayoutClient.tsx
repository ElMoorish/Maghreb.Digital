"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ClientEffects } from "@/components/effects/ClientEffects";
import { ZelligePortal } from "@/components/intro/ZelligePortal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { Locale } from "@/i18n/config";

interface LayoutClientProps {
    children: React.ReactNode;
    locale?: Locale;
}

export function LayoutClient({ children, locale }: LayoutClientProps) {
    const pathname = usePathname();
    // Homepage is either "/" or "/{locale}" (e.g., "/fr", "/en")
    const isHomepage = pathname === "/" || pathname === `/${locale}`;

    return (
        <ZelligePortal showPortal={isHomepage}>
            <ClientEffects />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
        </ZelligePortal>
    );
}
