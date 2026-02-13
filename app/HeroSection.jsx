'use client'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ShoppingCart, X, Star, Zap, Shield, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = ({ onShowProducts, showProducts }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
      color: "from-blue-500 to-cyan-600"
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
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (showProducts) return; 
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, showProducts, nextSlide]);

  const currentSlideData = slides[currentSlide];

  const handleCloseProducts = () => {
    onShowProducts(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)] flex items-center overflow-hidden bg-gradient-to-b from-black pt-4 sm:pt-6 lg:pt-8">
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
                  onClick={() => onShowProducts(true)}
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
  );
};

export default HeroSection;