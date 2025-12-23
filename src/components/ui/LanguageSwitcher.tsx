"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/DictionaryProvider";

export function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { locale: currentLocale } = useDictionary();
    const pathname = usePathname();
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchLocale = (newLocale: Locale) => {
        // Replace the current locale in the pathname with the new one
        const segments = pathname.split("/");
        if (locales.includes(segments[1] as Locale)) {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        const newPath = segments.join("/") || `/${newLocale}`;
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-maghrib-charcoal hover:text-maghrib-terracotta transition-colors duration-300"
                aria-label="Change language"
            >
                <span>{currentLocale.toUpperCase()}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 py-2 bg-white rounded-lg shadow-xl border border-maghrib-taupe/10 min-w-[140px] z-50"
                    >
                        {locales.map((locale) => (
                            <button
                                key={locale}
                                onClick={() => switchLocale(locale)}
                                className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${locale === currentLocale
                                    ? "bg-maghrib-beige text-maghrib-terracotta"
                                    : "text-maghrib-charcoal hover:bg-maghrib-beige/50"
                                    }`}
                            >
                                <span>{localeNames[locale]}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
