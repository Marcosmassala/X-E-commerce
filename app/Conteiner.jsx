'use client'
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function FitnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [showProducts, setShowProducts] = useState(false);
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "PRODUTOS" },
    { href: "/NEW", label: "NOVIDADES" },
    { href: "/delivery", label: "ENTREGA" },
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
    // Rolar suavemente até a seção de produtos
    setTimeout(() => {
      const productsSection = document.getElementById('produtos-destaque');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
    // Rolar de volta para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {/* Seção Hero com 100vh e tudo visível */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-b from-black">
          <div className="container mx-auto px-4 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              <div className="relative z-10 space-y-6">
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
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">Resultados Científicos</h4>
                      <p className="text-gray-400">Fórmulas baseadas em pesquisas e estudos avançados</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">Energia Explosiva</h4>
                      <p className="text-gray-400">Aumente sua performance e resistência nos treinos</p>
                    </div>
                  </div>
                </div>
                
                {/* Botão para mostrar produtos */}
                <div className="pt-6">
                  {!showProducts ? (
                    <button 
                      onClick={handleShowProducts}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center gap-3"
                    >
                      <ShoppingCart size={22} />
                      VER NOSSOS PRODUTOS
                    </button>
                  ) : (
                    <button 
                      onClick={handleCloseProducts}
                      className="px-8 py-4 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                    >
                      <X size={22} />
                      FECHAR PRODUTOS
                    </button>
                  )}
                </div>
              </div>
              
              {/* Imagem mais para cima */}
              <div className="relative -mt-4 lg:-mt-8">
                <div className="absolute -inset-4 lg:-inset-8 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-3xl blur-2xl"></div>
                
                <div className="relative">
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
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
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
                  
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-xl"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-full blur-xl"></div>
                </div>
                
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

        {/* Seção de Produtos (aparece apenas quando showProducts é true) */}
        {showProducts && (
          <section id="produtos-destaque" className="container mx-auto px-4 lg:px-8 py-16 animate-fadeIn">
            {/* Cabeçalho com botão de fechar */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Produtos em Destaque</h2>
                <p className="text-gray-400 max-w-2xl">
                  Descubra nossa seleção premium de produtos para fitness e bem-estar
                </p>
              </div>
              
              <button
                onClick={handleCloseProducts}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all duration-200 group"
                aria-label="Fechar produtos"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">Fechar</span>
              </button>
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
                      height={250}
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
              <Link href="/produtos">
                <button className="px-8 py-3 border border-gray-600 hover:border-green-400 hover:bg-green-400 hover:text-black rounded-full font-semibold transition-all duration-200">
                  VER TODOS OS PRODUTOS
                </button>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Adicionar animação CSS */}
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
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}