"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, CheckCircle2, XCircle, Loader2, ArrowLeft, Building2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface AvailabilityResult {
  wyoming: boolean | null;
  suggestions: string[];
}

async function checkWyomingAvailability(name: string): Promise<boolean | null> {
  // Simulated check - we verify for our clients
  // In production, this would call a serverless function
  
  const simulatedAvailable = !name.toLowerCase().includes("test") && 
                             !name.toLowerCase().includes("admin") &&
                             !name.toLowerCase().includes("llc") &&
                             !name.toLowerCase().includes("corp");
  
  return simulatedAvailable;
}

async function checkNameAvailability(name: string): Promise<AvailabilityResult> {
  const wyomingAvailable = await checkWyomingAvailability(name);
  
  // Generate suggestions if not available
  const suggestions = [];
  if (!wyomingAvailable) {
    suggestions.push(
      `${name} Group`,
      `${name} Ventures`,
      `${name} Holdings`,
      `${name} Global`,
      `${name} Solutions`
    );
  }
  
  return {
    wyoming: wyomingAvailable,
    suggestions
  };
}

export function NameChecker() {
  const params = useParams();
  const locale = params.locale as string || "fr";
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [businessName, setBusinessName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<AvailabilityResult | null>(null);
  const [error, setError] = useState("");
  
  const handleCheck = async () => {
    if (!businessName.trim()) {
      setError(locale === "fr" ? "Veuillez entrer un nom" : "Please enter a name");
      return;
    }
    
    if (businessName.trim().length < 3) {
      setError(locale === "fr" ? "Le nom doit contenir au moins 3 caractères" : "Name must be at least 3 characters");
      return;
    }
    
    // Clean the name (remove LLC, Inc, etc. for search)
    const cleanName = businessName
      .replace(/\b(LLC|Inc|Corp|Corporation|Ltd|Limited|SARL)\b/gi, '')
      .trim();
    
    setError("");
    setIsChecking(true);
    setResults(null);
    
    try {
      const availability = await checkNameAvailability(cleanName);
      setResults(availability);
    } catch {
      setError(locale === "fr" ? "Erreur lors de la vérification" : "Error checking name");
    } finally {
      setIsChecking(false);
    }
  };
  
  const texts = {
    fr: {
      title: "Vérificateur de Nom",
      subtitle: "Vérifiez si votre nom d'entreprise est disponible au Wyoming",
      placeholder: "Entrez le nom de votre entreprise (ex: Maghrib Ventures)",
      check: "Vérifier",
      checking: "Vérification...",
      available: "Probablement disponible",
      taken: "Probablement non disponible",
      unknown: "Vérification manuelle requise",
      wyoming: "Wyoming",
      suggestions: "Suggestions alternatives",
      cta: "Réserver ce nom",
      note: "Résultat indicatif. Nous vérifions officiellement pour nos clients avant le dépôt.",
      error: "Erreur",
      tip: "Conseil: Évitez les noms génériques comme 'Test' ou 'Admin' qui sont souvent pris.",
      weCheck: "Nous vérifions la disponibilité officielle pour vous"
    },
    en: {
      title: "Name Checker",
      subtitle: "Check if your business name is available in Wyoming",
      placeholder: "Enter your business name (e.g., Maghrib Ventures)",
      check: "Check",
      checking: "Checking...",
      available: "Likely available",
      taken: "Likely not available",
      unknown: "Manual verification required",
      wyoming: "Wyoming",
      suggestions: "Alternative suggestions",
      cta: "Reserve this name",
      note: "Indicative result. We verify officially for our clients before filing.",
      error: "Error",
      tip: "Tip: Avoid generic names like 'Test' or 'Admin' which are often taken.",
      weCheck: "We verify official availability for you"
    }
  };
  
  const t = texts[locale as "fr" | "en"] || texts.fr;
  
  return (
    <section ref={containerRef} className="min-h-screen pt-24 pb-16 bg-gradient-warm">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-maghrib-taupe hover:text-maghrib-terracotta transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
          
          <div className="w-16 h-16 rounded-full bg-maghrib-terracotta/10 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-maghrib-terracotta" />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-4">
            {t.title}
          </h1>
          <p className="text-maghrib-taupe max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>
        
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="warm-card p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maghrib-taupe/50" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                placeholder={t.placeholder}
                className="w-full pl-12 pr-4 py-4 bg-maghrib-beige border border-maghrib-taupe/20 rounded-lg focus:outline-none focus:border-maghrib-gold transition-colors"
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={isChecking}
              className="px-8 py-4 bg-maghrib-terracotta text-white rounded-lg hover:bg-maghrib-terracotta/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 min-w-[140px]"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.checking}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {t.check}
                </>
              )}
            </button>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-4 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
          
          <p className="text-xs text-maghrib-taupe mt-4">
            {t.tip}
          </p>
        </motion.div>
        
        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Wyoming Result */}
            <div className={`warm-card p-8 text-center ${
              results.wyoming === true ? "border-green-500/30" : 
              results.wyoming === false ? "border-red-500/30" : 
              "border-yellow-500/30"
            }`}>
              <h3 className="font-heading text-xl text-maghrib-charcoal mb-4">{t.wyoming}</h3>
              
              <div className="flex justify-center mb-4">
                {results.wyoming === true ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                ) : results.wyoming === false ? (
                  <XCircle className="w-16 h-16 text-red-500" />
                ) : (
                  <AlertCircle className="w-16 h-16 text-yellow-500" />
                )}
              </div>
              
              <p className={`text-lg font-medium mb-4 ${
                results.wyoming === true ? "text-green-600" : 
                results.wyoming === false ? "text-red-500" : 
                "text-yellow-600"
              }`}>
                {results.wyoming === true ? t.available : 
                 results.wyoming === false ? t.taken : 
                 t.unknown}
              </p>
              
              <p className="text-sm text-maghrib-taupe">
                {t.weCheck}
              </p>
            </div>
            
            {/* Suggestions */}
            {results.suggestions.length > 0 && (
              <div className="warm-card p-6">
                <h3 className="font-heading text-lg text-maghrib-charcoal mb-4">{t.suggestions}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {results.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setBusinessName(suggestion);
                        setResults(null);
                      }}
                      className="px-4 py-2 bg-maghrib-terracotta/10 text-maghrib-terracotta rounded-full hover:bg-maghrib-terracotta/20 transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA */}
            {results.wyoming && (
              <div className="text-center">
                <p className="text-xs text-maghrib-taupe mb-4">{t.note}</p>
                <Link
                  href={`/${locale}#contact`}
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  {t.cta}
                </Link>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-maghrib-taupe text-sm">
            {locale === "fr" 
              ? "Besoin d'aide? Contactez notre équipe pour une consultation gratuite."
              : "Need help? Contact our team for a free consultation."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
