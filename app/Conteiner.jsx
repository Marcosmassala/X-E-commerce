'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Check, Zap, Shield, Star } from 'lucide-react'

// Constantes separadas para melhor organização
const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/produtos", label: "PRODUTOS" },
  { href: "/NEW", label: "NOVIDADES" },
  { href: "/delivery", label: "ENTREGA" },
]

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
      
      
      
    </div>
  )
}