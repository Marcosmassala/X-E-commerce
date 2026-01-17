'use client'
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Star, Zap, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function FitnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [showProducts, setShowProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slides data
  const slides = [
    {
      id: 1,
      image: "/image13.png",
      title: "Creatine XPLODE Power",
      subtitle: "Rápida absorção",
      description: "Maximiza força e performance com tecnologia avançada",
      badge: "MAIS VENDIDO",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      image: "/image4.png",
      title: "Whey Protein Elite",
      subtitle: "Alta concentração",
      description: "Proteína isolada para recuperação muscular acelerada",
      badge: "NOVO",
      color: "from-blue-500 to-cyan-600",
    
      
      
    },
    {
      id: 3,
      image: "/image11.png",
      title: "Pre-Workout Nitro",
      subtitle: "Energia explosiva",
      description: "Aumente sua performance em até 40%",
      badge: "LANÇAMENTO",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      image: "/imagem2.png",
      title: "BCAA Recovery",
      subtitle: "Recuperação rápida",
      description: "Reduza a fadiga muscular pós-treino",
      badge: "RECOMENDADO",
      color: "from-orange-500 to-red-600"
    }
  ];
  
  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto slide
  useEffect(() => {
    if (showProducts) return; // Não avançar slides quando produtos estão abertos
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, showProducts]);
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "PRODUTOS" },
    { href: "/novidades", label: "NOVIDADES" },
    { href: "/entregas", label: "ENTREGA" },
  ];

  const products = Array(6).fill({
    name: "Creatine XPLODE Power",
    description: "Rápida absorção",
    price: 29990, 
    originalPrice: 39990, 
    badge: "NEW",
  });

  const footerLinks = {
    quickLinks: [
      { href: "/about", label: "Sobre Nós" },
      { href: "/contact", label: "Contato" },
      { href: "/faq", label: "FAQ" },
    ],
    categories: [
      { href: "/supplements", label: "Suplementos" },
      { href: "/equipment", label: "Equipamentos" },
      { href: "/clothing", label: "Vestuário" },
    ],
  };
 
  const formatKz = (value) => {
    return value.toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('AOA', 'Kz');
  };

  const handleShowProducts = () => {
    setShowProducts(true);
    setTimeout(() => {
      const productsSection = document.getElementById('produtos-destaque');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => { // Removido : number
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header responsivo */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm supports-[backdrop-filter]:bg-black/80">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <nav className="flex items-center justify-between">
            {/* Logo e menu mobile */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-md p-2 hover:bg-gray-800 lg:hidden"
                aria-label="Abrir menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={isMobile ? 20 : 24} /> : <Menu size={isMobile ? 20 : 24} />}
              </button>
              
              <Link 
                href="/" 
                className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold hover:text-green-400 transition-colors"
              >
                <span className="text-green-400 text-2xl sm:text-3xl">⚡</span>
                <span className="hidden xs:inline">LOGO</span>
              </Link>
            </div>

            {/* Navegação desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="font-medium hover:text-green-400 transition-colors duration-200 text-sm xl:text-base px-2 py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Ícones de ação */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Barra de pesquisa - apenas desktop */}
              <div className="hidden sm:block">
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    size={isMobile ? 16 : 18} 
                  />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 rounded-full border border-gray-700 bg-gray-900 py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <Link 
                  href="/carrinho"
                  className="group relative rounded-full p-1.5 sm:p-2 hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Carrinho de compras"
                >
                  <ShoppingCart 
                    size={isMobile ? 18 : 20} 
                    className="group-hover:text-green-400 transition-colors" 
                  />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-green-500 text-[10px] sm:text-xs font-bold text-black">
                    {cartItems}
                  </span>
                </Link>

                <Link 
                  href="/perfil"
                  className="rounded-full p-1.5 sm:p-2 hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Perfil do usuário"
                >
                  <User size={isMobile ? 18 : 20} className="hover:text-green-400 transition-colors" />
                </Link>
              </div>
            </div>
          </nav>

          {/* Menu mobile expandido */}
          {isMenuOpen && (
            <div className="mt-3 border-t border-gray-800 pt-3 lg:hidden animate-slideDown">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2 font-medium hover:bg-gray-800 hover:text-green-400 transition-colors text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Barra de pesquisa mobile no menu */}
              <div className="mt-3 pt-3 border-t border-gray-800">
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    size={18} 
                  />
                  <input
                    type="search"
                    placeholder="Pesquisar produtos..."
                    className="w-full rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barra de pesquisa mobile separada */}
        <div className="border-b border-gray-800 px-3 sm:px-4 py-2 sm:hidden">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={16} 
            />
            <input
              type="search"
              placeholder="Pesquisar produtos..."
              className="w-full rounded-full border border-gray-700 bg-gray-900 py-2 pl-9 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>
      </header>

      <main className="overflow-x-hidden">
        {/* Seção Hero com Slider */}
        <section className="relative min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)] flex items-center overflow-hidden bg-gradient-to-b from-black  pt-4 sm:pt-6 lg:pt-8">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
              
              {/* Conteúdo textual */}
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    <span className="block text-white">MOLDE O CORPO</span>
                    <span className={`block bg-gradient-to-r ${currentSlideData.color} bg-clip-text text-transparent mt-1 sm:mt-2 transition-all duration-500`}>
                      DOS SEUS SONHOS
                    </span>
                  </h1>
                </div>
                
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed sm:leading-relaxed max-w-lg">
                  {currentSlideData.description}
                </p>
                
                {/* Benefícios */}
                <div className="space-y-3 sm:space-y-4 pt-2">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${currentSlideData.color.replace('from-', 'from-').replace('to-', 'to-')}/10 flex items-center justify-center`}>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-1">{currentSlideData.title}</h4>
                      <p className="text-gray-400 text-sm sm:text-base">{currentSlideData.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${currentSlideData.color.replace('from-', 'from-').replace('to-', 'to-')}/10 flex items-center justify-center`}>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-1">Energia Explosiva</h4>
                      <p className="text-gray-400 text-sm sm:text-base">Aumente performance e resistência</p>
                    </div>
                  </div>
                </div>
                
                {/* Botão principal */}
                <div className="pt-4 sm:pt-6">
                  {!showProducts ? (
                    <button 
                      onClick={handleShowProducts}
                      className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 text-black font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3`}
                    >
                      <ShoppingCart size={isMobile ? 18 : 22} />
                      <span>VER NOSSOS PRODUTOS</span>
                    </button>
                  ) : (
                    <button 
                      onClick={handleCloseProducts}
                      className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 bg-gradient-to-r ${currentSlideData.color} border-transparent text-black font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3`}
                    >
                      <X size={isMobile ? 18 : 22} />
                      <span>FECHAR PRODUTOS</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Slider de Imagens */}
              <div className="relative mt-6 lg:mt-0">
                {/* Container do Slider */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Slides */}
                  <div className="relative aspect-[4/3]">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                    ))}
                    
                    {/* Badge do produto atual */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-[180px] sm:max-w-xs border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${currentSlideData.color} text-black`}>
                          {currentSlideData.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-1">
                        {currentSlideData.title}
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm mb-2">{currentSlideData.subtitle}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-white text-xs sm:text-sm font-semibold">4.8/5</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Controles do Slider */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-green-400 transition-colors" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-green-400 transition-colors" />
                  </button>
                  
                  {/* Indicadores de slide */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 sm:gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? `bg-gradient-to-r ${currentSlideData.color} w-4 sm:w-6` 
                            : 'bg-gray-600 hover:bg-gray-400'
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Elementos decorativos */}
                <div className={`absolute -bottom-3 -left-3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br ${currentSlideData.color.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-full blur-lg sm:blur-xl transition-all duration-500`}></div>
                <div className={`absolute -top-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br ${currentSlideData.color.replace('from-', 'from-').replace('to-', 'to-')}/5 rounded-full blur-lg sm:blur-xl transition-all duration-500`}></div>
                
                {/* Badge de garantia */}
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${currentSlideData.color.replace('from-', 'from-').replace('to-', 'to-')}/20 flex items-center justify-center`}>
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm">GARANTIA</div>
                      <div className={`bg-gradient-to-r ${currentSlideData.color} bg-clip-text text-transparent text-xs`}>30 DIAS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Produtos */}
        {showProducts && (
          <section id="produtos-destaque" className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-fadeIn">
            {/* Cabeçalho responsivo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Produtos em Destaque</h2>
                <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
                  Descubra nossa seleção premium de produtos para fitness
                </p>
              </div>
              
              <button
                onClick={handleCloseProducts}
                className="self-end sm:self-center flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-600 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all duration-200 group text-sm"
                aria-label="Fechar produtos"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                <span>Fechar</span>
              </button>
            </div>
            
            {/* Grid de produtos responsivo */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="relative h-48 sm:h-56 md:h-64 w-full">
                      <Image
                        src={slides[index % slides.length].image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 sm:mt-6">
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-center line-clamp-1">{slides[index % slides.length].title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 text-center">{slides[index % slides.length].subtitle}</p>
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 flex-wrap">
                      <span className="text-green-400 font-bold text-lg sm:text-xl">
                        {formatKz(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-xs sm:text-sm">
                          {formatKz(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95">
                      <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão ver todos */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <Link href="/produtos" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-600 hover:border-green-400 hover:bg-green-400 hover:text-black rounded-full font-semibold transition-all duration-200 text-sm sm:text-base">
                  VER TODOS OS PRODUTOS
                </button>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Animações CSS */}
      <style jsx>{`
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* Melhorias para telas muito pequenas */
        @media (max-width: 360px) {
          .xs\:text-3xl {
            font-size: 1.75rem;
          }
          
          .xs\:inline {
            display: inline !important;
          }
          
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Ajustes para telas muito grandes */
        @media (min-width: 1920px) {
          .container {
            max-width: 1800px;
          }
        }
        
        /* Suporte para dispositivos com telas altas */
        @media (min-height: 900px) {
          section {
            min-height: calc(100vh - 80px);
          }
        }
      `}</style>
    </div>
  );
}