"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { useDictionary } from "@/components/providers/DictionaryProvider";

export function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { dictionary: t } = useDictionary();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        setTimeout(() => setFormState("success"), 2000);
    };

    const inputClasses = (field: string) =>
        `w-full px-4 py-4 bg-maghrib-cream border rounded-sm text-maghrib-charcoal placeholder:text-maghrib-taupe/50 outline-none transition-all duration-500 ${focusedField === field
            ? "border-maghrib-gold shadow-soft-gold"
            : "border-maghrib-taupe/20 hover:border-maghrib-taupe/40"
        }`;

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative py-32 bg-maghrib-cream zellige-pattern"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-12 h-px bg-maghrib-gold mb-8" />
                        <p className="font-body text-sm tracking-[0.3em] uppercase text-maghrib-taupe mb-4">
                            {t.contact.tagline}
                        </p>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-maghrib-charcoal mb-8 leading-tight">
                            {t.contact.headline}
                        </h2>
                        <p className="text-lg text-maghrib-taupe leading-relaxed mb-12">
                            {t.contact.subheadline}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm bg-maghrib-beige flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-maghrib-terracotta" />
                                </div>
                                <div>
                                    <p className="text-sm text-maghrib-taupe">{t.contact.info.email}</p>
                                    <a
                                        href="mailto:contact@maghrib.digital"
                                        className="text-maghrib-charcoal hover:text-maghrib-terracotta transition-colors duration-300"
                                    >
                                        contact@maghrib.digital
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm bg-maghrib-beige flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-maghrib-terracotta" />
                                </div>
                                <div>
                                    <p className="text-sm text-maghrib-taupe">{t.contact.info.phone}</p>
                                    <a
                                        href="tel:+212714402581"
                                        className="text-maghrib-charcoal hover:text-maghrib-terracotta transition-colors duration-300"
                                    >
                                        +212 7 14 40 25 81
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm bg-maghrib-beige flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-maghrib-terracotta" />
                                </div>
                                <div>
                                    <p className="text-sm text-maghrib-taupe">{t.contact.info.location}</p>
                                    <p className="text-maghrib-charcoal">{t.contact.info.locationValue}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="beige-card p-8 md:p-12">
                            {formState === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-maghrib-cream border border-maghrib-gold flex items-center justify-center"
                                    >
                                        <CheckCircle className="w-8 h-8 text-maghrib-terracotta" />
                                    </motion.div>
                                    <h3 className="font-heading text-2xl text-maghrib-charcoal mb-3">
                                        Message Received
                                    </h3>
                                    <p className="text-maghrib-taupe">
                                        Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-maghrib-charcoal mb-2">
                                                {t.contact.form.name}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                                onFocus={() => setFocusedField("name")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("name")}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-maghrib-charcoal mb-2">
                                                {t.contact.form.email}
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("email")}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-maghrib-charcoal mb-2">
                                            {t.contact.form.service}
                                        </label>
                                        <select
                                            required
                                            onFocus={() => setFocusedField("service")}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses("service")}
                                        >
                                            <option value="">{t.contact.form.selectService}</option>
                                            <option value="web">{t.contact.form.webDev}</option>
                                            <option value="llc">{t.contact.form.llc}</option>
                                            <option value="social">{t.contact.form.social}</option>
                                            <option value="other">{t.contact.form.other}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-maghrib-charcoal mb-2">
                                            {t.contact.form.message}
                                        </label>
                                        <textarea
                                            placeholder="..."
                                            rows={5}
                                            required
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`${inputClasses("message")} resize-none`}
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={formState === "submitting"}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {formState === "submitting" ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-maghrib-cream border-t-transparent rounded-full"
                                                />
                                                {t.contact.form.sending}
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                {t.contact.form.submit}
                                                <Send className="w-4 h-4 rtl:rotate-180" />
                                            </span>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Decorative Border */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="moroccan-divider" />
            </div>
        </section>
    );
}
