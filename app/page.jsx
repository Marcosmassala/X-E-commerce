'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";

export default function FitnessPage() {
  const [showProducts, setShowProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const slides = [
    {
      id: 1,
      image: "",
      title: "Creatine XPLODE Power",
      subtitle: "Rápida absorção",
      description: "Maximiza força e performance com tecnologia avançada",
      badge: "MAIS VENDIDO",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      image: "",
      title: "Whey Protein Elite",
      subtitle: "Alta concentração",
      description: "Proteína isolada para recuperação muscular acelerada",
      badge: "NOVO",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      image: "",
      title: "Pre-Workout Nitro",
      subtitle: "Energia explosiva",
      description: "Aumente sua performance em até 40%",
      badge: "LANÇAMENTO",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      image: "",
      title: "BCAA Recovery",
      subtitle: "Recuperação rápida",
      description: "Reduza a fadiga muscular pós-treino",
      badge: "RECOMENDADO",
      color: "from-orange-500 to-red-600"
    }
  ];

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShowProducts = (show) => {
    setShowProducts(show);
    if (show) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        const productsSection = document.getElementById('produtos-destaque');
        if (productsSection) {
          // Scroll suave para desktop, instantâneo para mobile
          const behavior = isMobile ? 'auto' : 'smooth';
          productsSection.scrollIntoView({ 
            behavior, 
            block: 'start' 
          });
        }
      }, 100);
    } else {
      // Scroll para o topo
      const behavior = isMobile ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Conteúdo Principal */}
      <main className="relative">
        {/* Hero Section */}
        <section className="w-full">
          <HeroSection 
            onShowProducts={handleShowProducts} 
            showProducts={showProducts} 
          />
        </section>
        
        {/* Products Section */}
        {showProducts && (
          <section 
            id="produtos-destaque" 
            className="w-full animate-fadeIn"
          >
            <ProductsSection 
              onCloseProducts={() => handleShowProducts(false)} 
              slides={slides}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Animações CSS */}
      <style jsx global>{`
        /* Animações responsivas */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Melhorias para telas muito pequenas */
        @media (max-width: 360px) {
          .text-3xl {
            font-size: 1.75rem !important;
          }
          
          .text-4xl {
            font-size: 2rem !important;
          }
          
          .text-5xl {
            font-size: 2.25rem !important;
          }
        }
        
        /* Ajustes para tablets */
        @media (min-width: 768px) and (max-width: 1024px) {
          .md\\:text-4xl {
            font-size: 2.5rem;
          }
        }
        
        /* Otimizações de performance para mobile */
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Suavizar animações em dispositivos móveis */
          .transition-transform,
          .transition-all {
            transition-duration: 150ms;
          }
        }
        
        /* Prevenir zoom em inputs em iOS */
        @media screen and (max-width: 768px) {
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          input[type="number"],
          textarea {
            font-size: 16px !important;
          }
        }
        
        /* Melhorar legibilidade em mobile */
        @media (max-width: 640px) {
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        }
        
        /* Otimizar imagens para mobile */
        @media (max-width: 768px) {
          img {
            max-width: 100%;
            height: auto;
          }
        }
        
        /* Melhorar toque em botões mobile */
        button,
        [role="button"] {
          touch-action: manipulation;
        }
        
        /* Prevenir seleção de texto acidental em mobile */
        @media (max-width: 768px) {
          p, h1, h2, h3, h4, h5, h6 {
            user-select: none;
          }
        }
        
        /* Scroll suave para toda a página */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          .animate-fadeIn {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}