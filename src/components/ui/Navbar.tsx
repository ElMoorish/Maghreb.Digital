"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Code2, Globe2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const { dictionary: t, locale } = useDictionary();

    const services = [
        {
            href: `/${locale}/services/web-development`,
            label: t.services.items.web.title,
            description: t.services.items.web.hook,
            icon: Code2,
        },
        {
            href: `/${locale}/services/llc-formation`,
            label: t.services.items.llc.title,
            description: t.services.items.llc.hook,
            icon: Globe2,
        },
        {
            href: `/${locale}/services/social-media`,
            label: t.services.items.social.title,
            description: t.services.items.social.hook,
            icon: Users,
        },
    ];

    const navLinks = [
        { href: "/blog", label: t.nav.blog },
        { href: "#portfolio", label: t.nav.portfolio },
        { href: "#about", label: t.nav.about },
        { href: "#contact", label: t.nav.contact },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "pt-4 px-4 md:px-8" : ""
                }`}
        >
            <nav
                className={`transition-all duration-700 ease-out ${scrolled
                    ? "max-w-4xl mx-auto bg-maghrib-cream/95 backdrop-blur-md shadow-soft-lg border border-maghrib-taupe/10 rounded-full px-6 py-3"
                    : "max-w-7xl mx-auto px-6 lg:px-12 py-5 bg-transparent"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="relative"
                        >
                            <Image
                                src="/Logo.png"
                                alt="Maghrib.Digital"
                                width={scrolled ? 120 : 160}
                                height={scrolled ? 40 : 50}
                                className="relative z-10 transition-all duration-500"
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 hover:text-maghrib-charcoal transition-colors duration-500 tracking-wide uppercase group whitespace-nowrap ${scrolled ? "text-xs text-maghrib-taupe" : "text-sm text-maghrib-taupe"
                                    }`}
                            >
                                {t.nav.services}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute top-full left-0 mt-4 w-80 bg-maghrib-cream border border-maghrib-taupe/20 shadow-soft-lg rounded-sm overflow-hidden"
                                    >
                                        <div className="py-2">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.href}
                                                    href={service.href}
                                                    className="flex items-start gap-4 px-5 py-4 hover:bg-maghrib-beige transition-colors duration-300 group"
                                                >
                                                    <div className="w-10 h-10 rounded-sm bg-maghrib-beige border border-maghrib-taupe/10 flex items-center justify-center group-hover:border-maghrib-gold transition-colors duration-300">
                                                        <service.icon className="w-5 h-5 text-maghrib-terracotta" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-medium text-maghrib-charcoal group-hover:text-maghrib-terracotta transition-colors duration-300">
                                                            {service.label}
                                                        </span>
                                                        <span className="block text-xs text-maghrib-taupe mt-0.5">
                                                            {service.description}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Other Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-maghrib-taupe hover:text-maghrib-charcoal transition-colors duration-500 tracking-wide uppercase group whitespace-nowrap ${scrolled ? "text-xs" : "text-sm"
                                    }`}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-maghrib-gold group-hover:w-full transition-all duration-500" />
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        <Link
                            href="#contact"
                            className={`btn-primary transition-all duration-500 whitespace-nowrap ${scrolled ? "text-xs px-4 py-2" : "text-xs px-6 py-3"
                                }`}
                        >
                            {t.nav.getStarted}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <LanguageSwitcher />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-maghrib-charcoal"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="md:hidden overflow-hidden bg-maghrib-cream rounded-2xl mt-4"
                        >
                            <div className="py-6 px-2 space-y-4">
                                {/* Services Links */}
                                <div className="space-y-2">
                                    <p className="text-xs tracking-widest uppercase text-maghrib-taupe px-2">
                                        {t.nav.services}
                                    </p>
                                    {services.map((service) => (
                                        <Link
                                            key={service.href}
                                            href={service.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 py-2 px-2 text-maghrib-charcoal hover:text-maghrib-terracotta transition-colors duration-300 rounded-lg hover:bg-maghrib-beige"
                                        >
                                            <service.icon className="w-5 h-5 text-maghrib-taupe" />
                                            {service.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="w-full h-px bg-maghrib-taupe/20" />

                                {/* Other Links */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-2 px-2 text-maghrib-taupe hover:text-maghrib-charcoal transition-colors duration-300 tracking-wide rounded-lg hover:bg-maghrib-beige"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="pt-2">
                                    <Link
                                        href="#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="btn-primary w-full justify-center rounded-full"
                                    >
                                        {t.nav.getStarted}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
