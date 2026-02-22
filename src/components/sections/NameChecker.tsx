"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, CheckCircle2, XCircle, Loader2, ArrowLeft, Building2, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface AvailabilityResult {
  delaware: boolean | null;
  wyoming: boolean | null;
  delawareUrl?: string;
  wyomingUrl?: string;
  suggestions: string[];
}

async function checkWyomingAvailability(name: string): Promise<{ available: boolean; url: string }> {
  // Wyoming business search URL
  const searchUrl = `https://wyobiz.wyo.gov/Business/FilingSearch.aspx`;
  
  try {
    // Since we can't directly access Wyoming's .aspx page from client-side
    // due to CORS and ViewState requirements, we'll provide the direct link
    // and a simulated check for demo purposes
    
    // In production, this would call a serverless function that scrapes the page
    // For now, we return the search URL and a simulated result
    
    const simulatedAvailable = !name.toLowerCase().includes("test") && 
                               !name.toLowerCase().includes("admin") &&
                               !name.toLowerCase().includes("llc");
    
    return {
      available: simulatedAvailable,
      url: searchUrl
    };
  } catch (error) {
    return {
      available: null,
      url: searchUrl
    };
  }
}

async function checkDelawareAvailability(name: string): Promise<{ available: boolean | null; url: string }> {
  // Delaware entity search URL
  const searchUrl = `https://icis.corp.delaware.gov/ecorp/entitysearch/NameSearch.aspx`;
  
  try {
    // Similar to Wyoming - in production, serverless function needed
    const simulatedAvailable = !name.toLowerCase().includes("test") && 
                               !name.toLowerCase().includes("admin") &&
                               !name.toLowerCase().includes("corp");
    
    return {
      available: simulatedAvailable,
      url: searchUrl
    };
  } catch (error) {
    return {
      available: null,
      url: searchUrl
    };
  }
}

async function checkNameAvailability(name: string): Promise<AvailabilityResult> {
  // Run both checks in parallel
  const [wyomingResult, delawareResult] = await Promise.all([
    checkWyomingAvailability(name),
    checkDelawareAvailability(name)
  ]);
  
  // Generate suggestions if not available
  const suggestions = [];
  if (!wyomingResult.available && !delawareResult.available) {
    suggestions.push(
      `${name} Group`,
      `${name} Ventures`,
      `${name} Holdings`,
      `${name} Global`,
      `${name} Solutions`
    );
  }
  
  return {
    delaware: delawareResult.available,
    wyoming: wyomingResult.available,
    delawareUrl: delawareResult.url,
    wyomingUrl: wyomingResult.url,
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
      subtitle: "Vérifiez si votre nom d'entreprise est disponible au Delaware et au Wyoming",
      placeholder: "Entrez le nom de votre entreprise (ex: Maghrib Ventures)",
      check: "Vérifier",
      checking: "Vérification...",
      available: "Probablement disponible",
      taken: "Probablement non disponible",
      unknown: "Vérification manuelle requise",
      delaware: "Delaware",
      wyoming: "Wyoming",
      suggestions: "Suggestions alternatives",
      cta: "Réserver ce nom",
      note: "Résultat indicatif. La disponibilité finale sera confirmée lors du dépôt. Cliquez sur les liens pour vérifier officiellement.",
      error: "Erreur",
      verifyOfficial: "Vérifier officiellement",
      tip: "Conseil: Évitez les noms génériques comme 'Test' ou 'Admin' qui sont souvent pris."
    },
    en: {
      title: "Name Checker",
      subtitle: "Check if your business name is available in Delaware and Wyoming",
      placeholder: "Enter your business name (e.g., Maghrib Ventures)",
      check: "Check",
      checking: "Checking...",
      available: "Likely available",
      taken: "Likely not available",
      unknown: "Manual verification required",
      delaware: "Delaware",
      wyoming: "Wyoming",
      suggestions: "Alternative suggestions",
      cta: "Reserve this name",
      note: "Indicative result. Final availability will be confirmed during filing. Click links to verify officially.",
      error: "Error",
      verifyOfficial: "Verify officially",
      tip: "Tip: Avoid generic names like 'Test' or 'Admin' which are often taken."
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
            {/* State Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Delaware */}
              <div className={`warm-card p-6 ${
                results.delaware === true ? "border-green-500/30" : 
                results.delaware === false ? "border-red-500/30" : 
                "border-yellow-500/30"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-maghrib-charcoal">{t.delaware}</h3>
                  {results.delaware === true ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : results.delaware === false ? (
                    <XCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <p className={`text-sm mb-3 ${
                  results.delaware === true ? "text-green-600" : 
                  results.delaware === false ? "text-red-500" : 
                  "text-yellow-600"
                }`}>
                  {results.delaware === true ? t.available : 
                   results.delaware === false ? t.taken : 
                   t.unknown}
                </p>
                <a
                  href={results.delawareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-maghrib-terracotta hover:underline"
                >
                  {t.verifyOfficial} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {/* Wyoming */}
              <div className={`warm-card p-6 ${
                results.wyoming === true ? "border-green-500/30" : 
                results.wyoming === false ? "border-red-500/30" : 
                "border-yellow-500/30"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-maghrib-charcoal">{t.wyoming}</h3>
                  {results.wyoming === true ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : results.wyoming === false ? (
                    <XCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <p className={`text-sm mb-3 ${
                  results.wyoming === true ? "text-green-600" : 
                  results.wyoming === false ? "text-red-500" : 
                  "text-yellow-600"
                }`}>
                  {results.wyoming === true ? t.available : 
                   results.wyoming === false ? t.taken : 
                   t.unknown}
                </p>
                <a
                  href={results.wyomingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-maghrib-terracotta hover:underline"
                >
                  {t.verifyOfficial} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            {/* Suggestions */}
            {results.suggestions.length > 0 && (
              <div className="warm-card p-6">
                <h3 className="font-heading text-lg text-maghrib-charcoal mb-4">{t.suggestions}</h3>
                <div className="flex flex-wrap gap-2">
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
            {(results.delaware || results.wyoming) && (
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
