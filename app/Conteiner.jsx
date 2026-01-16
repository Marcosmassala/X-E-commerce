'use client'
<<<<<<< HEAD

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Check, Zap, Shield, Star } from 'lucide-react'
=======
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Star, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function FitnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [showProducts, setShowProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "PRODUTOS" },
    { href: "/NEW", label: "NOVIDADES" },
    { href: "/entregas", label: "ENTREGA" },
  ];
>>>>>>> 0bc9147bd95baebaab6bcad4044a838c4210417d

// Constantes separadas para melhor organização
const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/produtos", label: "PRODUTOS" },
  { href: "/NEW", label: "NOVIDADES" },
  { href: "/delivery", label: "ENTREGA" },
]

<<<<<<< HEAD
const PRODUCTS = Array(6).fill({
  name: "Creatine XPLODE Power",
  description: "Rápida absorção",
  price: 29990,
  originalPrice: 39990,
  badge: "NEW",
  rating: 4.8
})

const FOOTER_LINKS = {
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
}

const HERO_FEATURES = [
  {
    icon: Check,
    title: "Resultados Científicos",
    description: "Fórmulas baseadas em pesquisas e estudos avançados"
  },
  {
    icon: Zap,
    title: "Energia Explosiva",
    description: "Aumente sua performance e resistência nos treinos"
  }
]

// Componentes separados para melhor modularização
const SearchBar = ({ mobile = false }) => (
  <div className={`relative ${mobile ? 'w-full' : 'hidden md:block'}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input
      type="search"
      placeholder="Pesquisar produto..."
      className={`rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm 
        focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 
        transition-all duration-200 ${mobile ? 'w-full' : 'w-64'}`}
      aria-label="Campo de pesquisa"
    />
  </div>
)

const RatingStars = ({ rating = 4.8 }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <span className="text-white text-sm font-semibold">{rating}/5</span>
  </div>
)

const ProductCard = ({ product, index }) => {
=======
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
 
>>>>>>> 0bc9147bd95baebaab6bcad4044a838c4210417d
  const formatKz = (value) => {
    return value.toLocaleString('pt-AO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('AOA', 'Kz')
  }

  return (
    <div
      className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg 
        hover:shadow-xl hover:border-green-500/50 transition-all duration-300 group"
    >
      <div className="relative">
        <div className="aspect-square relative overflow-hidden rounded-xl">
          <Image
            src="/imagem2.png"
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {product.badge && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2 text-center text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-3 text-center">{product.description}</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-green-400 font-bold text-xl">
            {formatKz(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              {formatKz(product.originalPrice)}
            </span>
          )}
        </div>
        
        <button 
          className="w-full bg-green-500 hover:bg-green-600 text-black py-3 
            rounded-xl font-semibold transition-all duration-200 flex items-center 
            justify-center gap-2 group-hover:shadow-lg group-hover:shadow-green-500/20"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart size={18} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}

const Header = ({ isMenuOpen, setIsMenuOpen, cartItems }) => (
  <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm supports-[backdrop-filter]:bg-black/80">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 hover:bg-gray-800 lg:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold hover:text-green-400 
              transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
            aria-label="Ir para página inicial"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md" />
            LOGO
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="font-medium hover:text-green-400 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          
          <div className="flex items-center gap-2">
            <Link 
              href="/carrinho"
              className="group relative rounded-full p-2 hover:bg-gray-800 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={`Carrinho com ${cartItems} itens`}
            >
              <ShoppingCart 
                size={20} 
                className="group-hover:text-green-400 transition-colors" 
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center 
                rounded-full bg-green-500 text-xs font-bold text-black">
                {cartItems}
              </span>
            </Link>

            <Link 
              href="/perfil"
              className="rounded-full p-2 hover:bg-gray-800 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Acessar perfil"
            >
              <User size={20} className="hover:text-green-400 transition-colors" />
            </Link>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mt-4 border-t border-gray-800 pt-4 lg:hidden animate-fadeIn">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-3 py-2 font-medium hover:bg-gray-800 
                  hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <SearchBar mobile />
          </div>
        </div>
      )}
    </div>
  </header>
)

const HeroSection = ({ onShowProducts, showProducts }) => (
  <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-black">
    <div className="container mx-auto px-4 py-12 lg:py-0">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-white">MOLDE O CORPO</span>
              <span className="block text-green-400 bg-clip-text">DOS SEUS SONHOS</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-emerald-600 mt-4 rounded-full" />
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
            Descubra a revolução em suplementação esportiva. Nossas fórmulas exclusivas são 
            desenvolvidas com tecnologia de ponta para proporcionar resultados visíveis e 
            duradouros.
          </p>
          
          <div className="space-y-4 pt-2">
            {HERO_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 
                  flex items-center justify-center ring-1 ring-green-500/20">
                  <feature.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            {!showProducts ? (
              <button 
                onClick={onShowProducts}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 
                  hover:from-green-600 hover:to-emerald-700 text-black font-bold 
                  text-lg rounded-full transition-all duration-300 transform 
                  hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center gap-3
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500"
                aria-label="Ver nossos produtos"
              >
                <ShoppingCart size={22} />
                VER NOSSOS PRODUTOS
              </button>
            ) : (
              <button 
                onClick={onShowProducts}
                className="px-8 py-4 border-2 border-green-500 text-green-400 
                  hover:bg-green-500 hover:text-black font-bold text-lg rounded-full 
                  transition-all duration-300 transform hover:scale-105 flex items-center gap-3
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500"
                aria-label="Fechar produtos"
              >
                <X size={22} />
                FECHAR PRODUTOS
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-4 lg:-inset-8 bg-gradient-to-br from-green-500/5 
            to-emerald-600/5 rounded-3xl blur-2xl" />
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] relative">
              <Image 
                src="/imagem2.png" 
                alt="Suplementos para transformação corporal" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm 
              rounded-2xl p-4 max-w-xs border border-green-500/20">
              <h4 className="font-bold text-white text-lg mb-1">Creatina Monohidratada</h4>
              <p className="text-green-400 text-sm mb-2">Maximiza força e performance</p>
              <RatingStars />
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-black/90 backdrop-blur-sm 
            border border-green-500/30 rounded-2xl p-3 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">GARANTIA</div>
                <div className="text-green-400 text-sm font-semibold">30 DIAS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const ProductsSection = ({ showProducts, onCloseProducts }) => {
  if (!showProducts) return null

  return (
    <section 
      id="produtos-destaque" 
      className="container mx-auto px-4 py-16 animate-fadeIn mb-32" // MODIFICAÇÃO AQUI: adicionei mb-32
      aria-labelledby="produtos-title"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 id="produtos-title" className="text-3xl lg:text-4xl font-bold mb-2">
            Produtos em Destaque
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Descubra nossa seleção premium de produtos para fitness e bem-estar
          </p>
        </div>
        
        <button
          onClick={onCloseProducts}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 
            hover:border-red-500 hover:bg-red-500 hover:text-white rounded-full 
            transition-all duration-200 group self-end sm:self-auto"
          aria-label="Fechar seção de produtos"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Fechar</span>
        </button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PRODUCTS.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>

      <div className="flex justify-center mt-12 mb-8">
        <Link href="/produtos">
          <button className="px-8 py-3 border border-gray-600 hover:border-green-400 
            hover:bg-green-400 hover:text-black rounded-full font-semibold 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
            VER TODOS OS PRODUTOS
          </button>
        </Link>
      </div>
      
      {/* ESPAÇO ADICIONAL PARA SEPARAR DO FOOTER */}
      <div className="h-16"></div>
    </section>
  )
}

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md" />
            <span className="text-xl font-bold">LOGO</span>
          </div>
          <p className="text-gray-400 max-w-xs">
            Transforme seu corpo e alcance seus objetivos com nossos produtos premium para fitness.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-green-400">Links Rápidos</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.quickLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-green-400">Categorias</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.categories.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm gap">
        <p>© {new Date().getFullYear()} Fitness Store. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
)

export default function FitnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const cartItems = 3
  
  const productsSectionRef = useRef(null)

  const handleShowProducts = () => {
<<<<<<< HEAD
    setShowProducts(true)
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  const handleCloseProducts = () => {
    setShowProducts(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cartItems={cartItems}
      />
      
      <main>
        <HeroSection 
          onShowProducts={handleShowProducts}
          showProducts={showProducts}
        />
        
        <div ref={productsSectionRef}>
          <ProductsSection 
            showProducts={showProducts}
            onCloseProducts={handleCloseProducts}
          />
        </div>
      </main>
      
      
      
=======
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
        {/* Seção Hero - Totalmente responsiva */}
        <section className="relative min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)] flex items-center overflow-hidden bg-gradient-to-b from-black  pt-4 sm:pt-6 lg:pt-8">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
              
              {/* Conteúdo textual */}
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                    <span className="block text-white">MOLDE O CORPO</span>
                    <span className="block text-green-400 mt-1 sm:mt-2">DOS SEUS SONHOS</span>
                  </h1>
                </div>
                
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed sm:leading-relaxed max-w-lg">
                  Descubra a revolução em suplementação esportiva. Nossas fórmulas exclusivas são 
                  desenvolvidas com tecnologia de ponta para proporcionar resultados visíveis e 
                  duradouros.
                </p>
                
                {/* Benefícios */}
                <div className="space-y-3 sm:space-y-4 pt-2">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-1">Resultados Científicos</h4>
                      <p className="text-gray-400 text-sm sm:text-base">Fórmulas baseadas em pesquisas avançadas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/10 flex items-center justify-center">
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
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ShoppingCart size={isMobile ? 18 : 22} />
                      <span>VER NOSSOS PRODUTOS</span>
                    </button>
                  ) : (
                    <button 
                      onClick={handleCloseProducts}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <X size={isMobile ? 18 : 22} />
                      <span>FECHAR PRODUTOS</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Imagem responsiva */}
              <div className="relative mt-6 lg:mt-0">
                <div className="absolute -inset-3 sm:-inset-4 lg:-inset-6 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-2xl sm:rounded-3xl blur-xl"></div>
                
                <div className="relative">
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <div className="aspect-[4/3] relative">
                      <Image 
                        src="/imagem2.png" 
                        alt="Suplementos para transformação corporal" 
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        priority
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Badge do produto */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-[180px] sm:max-w-xs border border-green-500/20">
                      <h4 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-1">Creatina Monohidratada</h4>
                      <p className="text-green-400 text-xs sm:text-sm mb-2">Maximiza força e performance</p>
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
                  
                  {/* Elementos decorativos */}
                  <div className="absolute -bottom-3 -left-3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-lg sm:blur-xl"></div>
                  <div className="absolute -top-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-full blur-lg sm:blur-xl"></div>
                </div>
                
                {/* Badge de garantia */}
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs sm:text-sm">GARANTIA</div>
                      <div className="text-green-400 text-xs">30 DIAS</div>
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
                        src="/imagem2.png"
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
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-center line-clamp-1">{product.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 text-center">{product.description}</p>
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
>>>>>>> 0bc9147bd95baebaab6bcad4044a838c4210417d
    </div>
  )
}