"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDictionary } from "@/components/providers/DictionaryProvider";

interface ZelligePortalProps {
    children: React.ReactNode;
    showPortal?: boolean;
}

export function ZelligePortal({ children, showPortal = true }: ZelligePortalProps) {
    // Check if there's a hash in the URL on initial load - if so, skip the portal
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            // Skip portal if there's a hash in the URL (e.g., #about, #contact)
            return !showPortal || window.location.hash.length > 0;
        }
        return !showPortal;
    });
    const { dictionary: t } = useDictionary();

    // Handle hash scrolling after portal is skipped or opened
    useEffect(() => {
        if (isOpen && typeof window !== 'undefined' && window.location.hash) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                const hash = window.location.hash.substring(1);
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleEnter = () => {
        // Scroll to top first
        window.scrollTo({ top: 0, behavior: "instant" });
        setIsOpen(true);
    };

    // Ensure we're at top when portal closes (only if no hash)
    useEffect(() => {
        if (isOpen && typeof window !== 'undefined' && !window.location.hash) {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [isOpen]);

    return (
        <>
            {/* Main Website Content - always rendered but hidden initially */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                className={isOpen ? "" : "pointer-events-none"}
            >
                {children}
            </motion.div>

            {/* Portal Overlay */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-[#F2E8DA] flex items-center justify-center"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    >
                        {/* Zellige pieces that will split */}
                        <div className="relative w-screen h-screen">
                            {/* Top Left Piece */}
                            <motion.div
                                className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden"
                                initial={{ x: 0, y: 0 }}
                                exit={{ x: "-100%", y: "-100%", opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Image
                                    src="/zellige.png"
                                    alt=""
                                    fill
                                    className="object-cover object-top-left"
                                    style={{ objectPosition: "left top" }}
                                    priority
                                />
                            </motion.div>

                            {/* Top Right Piece */}
                            <motion.div
                                className="absolute top-0 right-0 w-1/2 h-1/2 overflow-hidden"
                                initial={{ x: 0, y: 0 }}
                                exit={{ x: "100%", y: "-100%", opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Image
                                    src="/zellige.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: "right top" }}
                                    priority
                                />
                            </motion.div>

                            {/* Bottom Left Piece */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-1/2 h-1/2 overflow-hidden"
                                initial={{ x: 0, y: 0 }}
                                exit={{ x: "-100%", y: "100%", opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Image
                                    src="/zellige.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: "left bottom" }}
                                    priority
                                />
                            </motion.div>

                            {/* Bottom Right Piece */}
                            <motion.div
                                className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden"
                                initial={{ x: 0, y: 0 }}
                                exit={{ x: "100%", y: "100%", opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <Image
                                    src="/zellige.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: "right bottom" }}
                                    priority
                                />
                            </motion.div>

                            {/* Center Content - Logo and Enter Button */}
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {/* Central decorative frame */}
                                <motion.div
                                    className="bg-[#F2E8DA]/95 backdrop-blur-sm px-16 py-12 rounded-lg shadow-2xl border border-[#005b48]/20"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    {/* Logo */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        className="text-center mb-8"
                                    >
                                        <Image
                                            src="/Logo.png"
                                            alt="Maghrib.Digital"
                                            width={200}
                                            height={60}
                                            className="mx-auto"
                                            priority
                                        />
                                    </motion.div>

                                    {/* Tagline */}
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        className="text-[#005b48] text-center font-light tracking-widest uppercase text-sm mb-10"
                                    >
                                        {t.portal.tagline}
                                    </motion.p>

                                    {/* Enter Button */}
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.9 }}
                                        whileHover={{ scale: 1.05, backgroundColor: "#004a3a" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleEnter}
                                        className="w-full py-4 px-12 bg-[#005b48] text-[#F2E8DA] font-medium tracking-wider uppercase rounded-sm transition-colors duration-300 hover:shadow-lg"
                                    >
                                        {t.portal.enter}
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Export component for Hero corners - to be used inside Hero section
export function ZelligeHeroCorners({ isVisible }: { isVisible: boolean }) {
    if (!isVisible) return null;

    return (
        <>
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((position) => (
                <motion.div
                    key={position}
                    className={`absolute w-[180px] h-[180px] pointer-events-none z-5 ${position === "top-left" ? "top-0 left-0" :
                        position === "top-right" ? "top-0 right-0" :
                            position === "bottom-left" ? "bottom-0 left-0" :
                                "bottom-0 right-0"
                        }`}
                    initial={{
                        opacity: 0,
                        x: position.includes("left") ? -80 : 80,
                        y: position.includes("top") ? -80 : 80,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                    }}
                    transition={{ duration: 1, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <motion.div
                        animate={{
                            x: position.includes("left") ? [0, 6, 0] : [0, -6, 0],
                            y: position.includes("top") ? [0, 6, 0] : [0, -6, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/zellige.png"
                            alt=""
                            fill
                            className="object-cover opacity-30"
                            style={{
                                clipPath: position === "top-left" ? "polygon(0 0, 100% 0, 0 100%)" :
                                    position === "top-right" ? "polygon(0 0, 100% 0, 100% 100%)" :
                                        position === "bottom-left" ? "polygon(0 0, 100% 100%, 0 100%)" :
                                            "polygon(100% 0, 100% 100%, 0 100%)"
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </>
    );
}
