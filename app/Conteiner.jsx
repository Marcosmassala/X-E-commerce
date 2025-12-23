'use client'
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function FitnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "produtos" },
    { href: "/NEW", label: "NEW" },
    { href: "/delivery", label: "DELIVERY" },
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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-md p-2 hover:bg-gray-800 lg:hidden"
                aria-label="Abrir menu"
                aria-expanded={isMenuOpen}
              >
                <Menu size={24} />
              </button>
              
              <Link 
                href="/" 
                className="flex items-center gap-2 text-xl font-bold hover:text-green-400 transition-colors"
              >
                LOGO
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="font-medium hover:text-green-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="w-64 rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* ÍCONE DO CARRINHO COM LINK */}
                <Link 
                  href="/carrinho"
                  className="group relative rounded-full p-2 hover:bg-gray-800 transition-colors duration-200"
                >
                  <ShoppingCart 
                    size={20} 
                    className="group-hover:text-green-400 transition-colors" 
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                    {cartItems}
                  </span>
                </Link>

                {/* ÍCONE DO PERFIL COM LINK */}
                <Link 
                  href="/perfil"
                  className="rounded-full p-2 hover:bg-gray-800 transition-colors duration-200"
                >
                  <User size={20} className="hover:text-green-400 transition-colors" />
                </Link>
              </div>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="mt-4 border-t border-gray-800 pt-4 lg:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2 font-medium hover:bg-gray-800 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-800 px-4 py-3 md:hidden">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            <input
              type="search"
              placeholder="Search Product..."
              className="w-full rounded-full border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
        </div>
      </header>

      <main>
      <section className="relative min-h-screen overflow-hidden bg-black">
  <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Conteúdo Textual */}
      <div className="relative z-10 space-y-8">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="block text-white">TRANSFORME</span>
          <span className="block text-green-400">SEU CORPO</span>
          <span className="block text-white">
            COM ATÉ{' '}
            <span className="relative">
              50% OFF
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></span>
            </span>
          </span>
        </h1>
        
        <p className="text-lg text-gray-300 md:text-xl max-w-lg">
         Nossos produtos de alta qualidade combinam tecnologia de ponta com ingredientes premium para atletas exigentes que buscam superar limites e alcançar a excelência física.

<span className="block mt-2 text-green-400 font-semibold">
            Whey Protein • Creatina • Pré-treino • BCAA • Vitaminas
          </span>
        </p>
        
        
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-800">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">+10K</div>
            <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">24h</div>
            <div className="text-sm text-gray-400">Entrega Rápida</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">100%</div>
            <div className="text-sm text-gray-400">Produtos Originais</div>
          </div>
        </div>
      </div>
      
      {/* Imagem dos Produtos */}
      <div className="relative">
        {/* Container da imagem */}
        <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/imagen1.png"
            alt="Suplementos de alta performance: Whey Protein, Creatina, Pré-treino e Vitaminas"
            width={800}
            height={800}
            priority
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
        </div>
        
      </div>
    </div>
    
    {/* Scroll indicator */}
    <div className="flex justify-center pt-12 lg:pt-20">
      <button 
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        className="group flex flex-col items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
        aria-label="Ver produtos"
      >
        <span className="text-sm font-medium">DESCUBRA MAIS</span>
        <div className="animate-bounce group-hover:animate-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</section>

<section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-black">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      
      {/* Conteúdo Textual */}
      <div className="relative z-10 space-y-8">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block text-white">MOLDE O CORPO</span>
            <span className="block text-green-400">DOS SEUS SONHOS</span>
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
          Descubra a revolução em suplementação esportiva. Nossas fórmulas exclusivas são 
          desenvolvidas com tecnologia de ponta para proporcionar resultados visíveis e 
          duradouros. Cada produto é cientificamente formulado para maximizar ganhos, 
          acelerar recuperação e transformar sua performance.
        </p>
        
        <div className="space-y-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-1">Resultados Científicos</h4>
              <p className="text-gray-400">Fórmulas baseadas em pesquisas e estudos avançados</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-1">Energia Explosiva</h4>
              <p className="text-gray-400">Aumente sua performance e resistência nos treinos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container da Imagem */}
      <div className="relative">
        {/* Efeito de fundo decorativo */}
        <div className="absolute -inset-4 lg:-inset-8 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-3xl blur-2xl"></div>
        
        <div className="relative">
          {/* Imagem principal */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/imagem2.png" 
              alt="Suplementos para transformação corporal - Ganho muscular e definição" 
              width={700}
              height={500}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              priority
            />
            
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            {/* Informação do produto na imagem */}
            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm rounded-2xl p-4 max-w-xs border border-green-500/20">
              <h4 className="font-bold text-white text-lg mb-1">Creatina Monohidratada</h4>
              <p className="text-green-400 text-sm mb-2">Maximiza força e performance</p>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-sm font-semibold">4.8/5</span>
              </div>
            </div>
          </div>
          
          {/* Elementos decorativos flutuantes */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-xl"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-full blur-xl"></div>
        </div>
        
        {/* Selo de garantia */}
        <div className="absolute -bottom-4 -right-4 bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-2xl p-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold">GARANTIA</div>
              <div className="text-green-400 text-sm">30 DIAS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        <section className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubra nossa seleção premium de produtos para fitness e bem-estar
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    src="/imagem2.png"
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2 text-center">{product.name}</h3>
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
                  
                  <button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 border border-gray-600 hover:border-green-400 hover:bg-green-400 hover:text-black rounded-full font-semibold transition-all duration-200">
              VER MAIS PRODUTOS
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}