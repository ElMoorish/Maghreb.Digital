"use client";

import { motion } from "framer-motion";

type Language = "all" | "en" | "fr";

interface LanguageFilterProps {
    activeFilter: Language;
    onFilterChange: (lang: Language) => void;
}

const filters: { value: Language; label: string }[] = [
    { value: "all", label: "All" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
];

export function LanguageFilter({ activeFilter, onFilterChange }: LanguageFilterProps) {
    return (
        <div className="inline-flex bg-maghrib-cream rounded-full p-1 border border-maghrib-taupe/20">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${activeFilter === filter.value
                            ? "text-maghrib-cream"
                            : "text-maghrib-taupe hover:text-maghrib-charcoal"
                        }`}
                >
                    {activeFilter === filter.value && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-maghrib-charcoal rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{filter.label}</span>
                </button>
            ))}
        </div>
    );
}
