import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                maghrib: {
                    cream: "#FDFBF7",
                    beige: "#F2E8DA",
                    terracotta: "#CCA483",
                    gold: "#D4AF37",
                    charcoal: "#3E3935",
                    taupe: "#7F766F",
                },
            },
            backgroundImage: {
                "gradient-warm": "linear-gradient(to bottom right, #FDFBF7 0%, #F2E8DA 100%)",
                "gradient-warm-reverse": "linear-gradient(to top left, #FDFBF7 0%, #F2E8DA 100%)",
            },
            fontFamily: {
                heading: ["var(--font-playfair)", "Georgia", "serif"],
                body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
            },
            boxShadow: {
                "soft": "0 4px 30px -4px rgba(62, 57, 53, 0.08)",
                "soft-lg": "0 10px 50px -10px rgba(62, 57, 53, 0.12)",
                "soft-gold": "0 4px 20px -2px rgba(212, 175, 55, 0.2)",
                "warm": "0 8px 40px -8px rgba(204, 164, 131, 0.25)",
            },
            animation: {
                "fade-in": "fadeIn 1s ease-out forwards",
                "rise-up": "riseUp 0.8s ease-out forwards",
                "gentle-float": "gentleFloat 8s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                riseUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                gentleFloat: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
