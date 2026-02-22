"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// FAQ Knowledge Base
const FAQ_KNOWLEDGE = {
  fr: {
    greeting: "Bonjour! Je suis l'assistant Maghrib.Digital. Posez-moi vos questions sur la création de LLC US.",
    fallback: "Je ne suis pas sûr de comprendre. Essayez de poser une question sur: la création de LLC, les prix, les délais, ou Stripe.",
    faqs: [
      {
        keywords: ["prix", "coût", "tarif", "combien", "prix"],
        answer: "Nos forfaits LLC commencent à 1,799 MAD (Starter), 2,299 MAD (Growth), et 3,999 MAD (Business). Le forfait Growth est le plus populaire et inclut la passerelle de paiement."
      },
      {
        keywords: ["délai", "temps", "combien de temps", "durée", "jours"],
        answer: "La création complète prend 5 jours ouvrables. L'EIN est obtenu en 24-48h. Le compte bancaire US est configuré dans les 3-5 jours suivant l'approbation."
      },
      {
        keywords: ["stripe", "paiement", "accepter"],
        answer: "Oui! Nos LLC sont structurées pour être Stripe-ready. Nous garantissons la conformité aux exigences Stripe pour les non-résidents US."
      },
      {
        keywords: ["delaware", "wyoming", "état", "choisir"],
        answer: "Delaware est idéal si vous visez des investisseurs ou une IPO. Wyoming est plus économique avec des frais annuels plus bas. Les deux fonctionnent avec Stripe."
      },
      {
        keywords: ["ein", "fiscal", "irs", "impôt"],
        answer: "L'EIN (Employer Identification Number) est votre numéro fiscal US. Nous l'obtenons pour vous en 24-48h via le service express de l'IRS."
      },
      {
        keywords: ["banque", "compte", "mercury", "brex"],
        answer: "Nous configurons des comptes Mercury, Brex ou Relay pour les non-résidents US. Ces banques fintech acceptent les LLC étrangères sans nécessiter de présence physique."
      },
      {
        keywords: ["document", "papier", "reçu"],
        answer: "Vous recevrez: Certificat LLC, EIN Letter, Operating Agreement, et guide de configuration bancaire. Le tout livré par email en 5 jours."
      },
      {
        keywords: ["maroc", "marocain", "résident"],
        answer: "Absolument! Nous sommes basés à Casablanca et spécialisés dans la création de LLC pour les entrepreneurs marocains. Nous parlons Darija, Français et Anglais."
      },
      {
        keywords: ["anonyme", "privacy", "confidentialité"],
        answer: "Nous offrons des LLC anonymes à partir de 3,499 MAD avec service de nominee et protection maximale de votre identité."
      },
      {
        keywords: ["whatsapp", "contact", "joindre"],
        answer: "Cliquez sur le bouton WhatsApp en bas à droite du site. Nous répondons en moins d'1 heure pendant les heures ouvrables (Lun-Sam)."
      }
    ]
  },
  en: {
    greeting: "Hello! I'm the Maghrib.Digital assistant. Ask me your questions about US LLC formation.",
    fallback: "I'm not sure I understand. Try asking about: LLC formation, pricing, timeline, or Stripe.",
    faqs: [
      {
        keywords: ["price", "cost", "how much", "pricing"],
        answer: "Our LLC packages start at 1,799 MAD (Starter), 2,299 MAD (Growth), and 3,999 MAD (Business). Growth is most popular and includes payment gateway setup."
      },
      {
        keywords: ["timeline", "how long", "time", "days"],
        answer: "Full formation takes 5 business days. EIN is obtained in 24-48h. US bank account is set up within 3-5 days after approval."
      },
      {
        keywords: ["stripe", "payment", "accept"],
        answer: "Yes! Our LLCs are structured to be Stripe-ready. We guarantee compliance with Stripe requirements for non-US residents."
      },
      {
        keywords: ["delaware", "wyoming", "state", "choose"],
        answer: "Delaware is ideal if you're targeting investors or IPO. Wyoming is more economical with lower annual fees. Both work with Stripe."
      },
      {
        keywords: ["ein", "tax", "irs"],
        answer: "EIN (Employer Identification Number) is your US tax ID. We obtain it for you in 24-48h via IRS express service."
      },
      {
        keywords: ["bank", "account", "mercury", "brex"],
        answer: "We set up Mercury, Brex or Relay accounts for non-US residents. These fintech banks accept foreign LLCs without requiring physical presence."
      },
      {
        keywords: ["document", "paper", "receive"],
        answer: "You'll receive: LLC Certificate, EIN Letter, Operating Agreement, and bank setup guide. All delivered via email in 5 days."
      },
      {
        keywords: ["morocco", "moroccan", "resident"],
        answer: "Absolutely! We're based in Casablanca and specialize in LLC formation for Moroccan entrepreneurs. We speak Darija, French and English."
      },
      {
        keywords: ["anonymous", "privacy"],
        answer: "We offer anonymous LLCs starting at 3,499 MAD with nominee service and maximum identity protection."
      },
      {
        keywords: ["whatsapp", "contact", "reach"],
        answer: "Click the WhatsApp button on the bottom right of the site. We respond within 1 hour during business hours (Mon-Sat)."
      }
    ]
  }
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getAIResponse(message: string, locale: string): string {
  const knowledge = FAQ_KNOWLEDGE[locale as "fr" | "en"] || FAQ_KNOWLEDGE.fr;
  const lowerMessage = message.toLowerCase();
  
  for (const faq of knowledge.faqs) {
    if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return faq.answer;
    }
  }
  
  return knowledge.fallback;
}

export function FAQChatbot() {
  const params = useParams();
  const locale = params.locale as string || "fr";
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: FAQ_KNOWLEDGE[locale as "fr" | "en"]?.greeting || FAQ_KNOWLEDGE.fr.greeting }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = getAIResponse(userMessage, locale);
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };
  
  const quickQuestions = locale === "fr" 
    ? ["Quel est le prix?", "Délai de création?", "Stripe est-il inclus?"]
    : ["What's the price?", "Timeline?", "Is Stripe included?"];
  
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
            <Bot className="w-8 h-8 text-maghrib-terracotta" />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-maghrib-charcoal mb-4">
            {locale === "fr" ? "Assistant LLC" : "LLC Assistant"}
          </h1>
          <p className="text-maghrib-taupe max-w-xl mx-auto">
            {locale === "fr" 
              ? "Posez vos questions sur la création de LLC US. Réponses instantanées 24/7."
              : "Ask your questions about US LLC formation. Instant answers 24/7."}
          </p>
        </motion.div>
        
        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="warm-card overflow-hidden"
        >
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" 
                    ? "bg-maghrib-charcoal text-white" 
                    : "bg-maghrib-terracotta/10 text-maghrib-terracotta"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-maghrib-charcoal text-white"
                    : "bg-maghrib-beige border border-maghrib-taupe/20"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-maghrib-terracotta/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-maghrib-terracotta" />
                </div>
                <div className="bg-maghrib-beige border border-maghrib-taupe/20 p-4 rounded-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-maghrib-taupe/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-maghrib-taupe/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-maghrib-taupe/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Questions */}
          <div className="px-6 pb-4">
            <p className="text-xs text-maghrib-taupe mb-2">
              {locale === "fr" ? "Questions rapides:" : "Quick questions:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-xs px-3 py-1.5 bg-maghrib-terracotta/10 text-maghrib-terracotta rounded-full hover:bg-maghrib-terracotta/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="border-t border-maghrib-taupe/20 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={locale === "fr" ? "Posez votre question..." : "Ask your question..."}
                className="flex-1 px-4 py-3 bg-maghrib-beige border border-maghrib-taupe/20 rounded-lg focus:outline-none focus:border-maghrib-gold transition-colors text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-3 bg-maghrib-terracotta text-white rounded-lg hover:bg-maghrib-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-maghrib-taupe text-sm mb-4">
            {locale === "fr" 
              ? "Prêt à créer votre LLC? Contactez notre équipe."
              : "Ready to form your LLC? Contact our team."}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Sparkles className="w-4 h-4" />
            {locale === "fr" ? "Démarrer maintenant" : "Start now"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
