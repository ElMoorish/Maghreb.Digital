"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/components/providers/DictionaryProvider";

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/maghrib.digital/", label: "Instagram" },
];

export function Footer() {
    const { dictionary: t, locale } = useDictionary();

    const footerLinks = {
        services: [
            { label: t.services.items.web.title, href: `/${locale}/services/web-development` },
            { label: t.services.items.llc.title, href: `/${locale}/services/llc-formation` },
            { label: t.services.items.social.title, href: `/${locale}/services/social-media` },
        ],
        company: [
            { label: t.nav.about, href: `/${locale}#about` },
            { label: t.nav.portfolio, href: `/${locale}#portfolio` },
            { label: t.nav.contact, href: `/${locale}#contact` },
            { label: t.nav.blog, href: "/blog" },
        ],
    };

    return (
        <footer className="relative bg-maghrib-charcoal text-maghrib-cream/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-1"
                    >
                        <Link href={`/${locale}`} className="inline-block mb-6">
                            <span className="font-heading text-2xl text-maghrib-cream">
                                Maghrib<span className="text-maghrib-gold">.</span>Digital
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-maghrib-cream/60 mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-10 h-10 rounded-sm bg-maghrib-cream/5 border border-maghrib-cream/10 flex items-center justify-center text-maghrib-cream/60 hover:text-maghrib-gold hover:border-maghrib-gold/30 transition-all duration-300"
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <h4 className="text-sm font-medium text-maghrib-cream mb-6 tracking-wider uppercase">
                            {t.footer.services}
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-maghrib-cream/60 hover:text-maghrib-gold transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h4 className="text-sm font-medium text-maghrib-cream mb-6 tracking-wider uppercase">
                            {t.footer.company}
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-maghrib-cream/60 hover:text-maghrib-gold transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h4 className="text-sm font-medium text-maghrib-cream mb-6 tracking-wider uppercase">
                            {t.nav.contact}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-maghrib-gold mt-0.5" />
                                <a
                                    href="mailto:contact@maghrib.digital"
                                    className="text-maghrib-cream/60 hover:text-maghrib-cream transition-colors duration-300 text-sm"
                                >
                                    contact@maghrib.digital
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-maghrib-gold mt-0.5" />
                                <a
                                    href="tel:+212714402581"
                                    className="text-maghrib-cream/60 hover:text-maghrib-cream transition-colors duration-300 text-sm"
                                >
                                    +212 7 14 40 25 81
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-maghrib-gold mt-0.5" />
                                <span className="text-maghrib-cream/60 text-sm">
                                    {t.contact.info.locationValue}
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-maghrib-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-maghrib-cream/40 text-sm">
                        © 2025 Maghrib.Digital. {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href={`/${locale}/privacy`} className="text-maghrib-cream/40 hover:text-maghrib-cream/70 transition-colors">
                            {t.footer.privacy}
                        </Link>
                        <Link href={`/${locale}/terms`} className="text-maghrib-cream/40 hover:text-maghrib-cream/70 transition-colors">
                            {t.footer.terms}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
