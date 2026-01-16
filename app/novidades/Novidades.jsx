'use client'
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Flame, TrendingUp, Star, Calendar, ArrowRight, Tag, Clock, Eye } from "lucide-react";
import { useState } from "react";

export default function NewPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "PRODUTOS" },
    { href: "/new", label: "NOVIDADES" },
    { href: "/delivery", label: "ENTREGA" },
  ];

  const newProducts = [
    {
      id: 1,
      name: "Creatina Monohidratada Ultra",
      description: "Pureza 99.9%, aumento de força máximo",
      price: 32990,
      originalPrice: 39990,
      badge: "NEW",
      category: "suplementos",
      rating: 4.9,
      releaseDate: "2024-03-15",
      image: "/products/creatine-ultra.jpg"
    },
    {
      id: 2,
      name: "Whey Protein Isolate",
      description: "Zero lactose, absorção instantânea",
      price: 42990,
      originalPrice: 49990,
      badge: "HOT",
      category: "suplementos",
      rating: 4.8,
      releaseDate: "2024-03-10",
      image: "/products/whey-isolate.jpg"
    },
    {
      id: 3,
      name: "Smart Watch Pro Fitness",
      description: "Monitor avançado de performance",
      price: 89990,
      originalPrice: 99990,
      badge: "TECH",
      category: "equipamentos",
      rating: 4.7,
      releaseDate: "2024-03-05",
      image: "/products/smartwatch-fitness.jpg"
    },
    {
      id: 4,
      name: "BCAA Xtreme 2:1:1",
      description: "Recuperação muscular acelerada",
      price: 24990,
      originalPrice: 29990,
      badge: "LIMITED",
      category: "suplementos",
      rating: 4.6,
      releaseDate: "2024-02-28",
      image: "/products/bcaa-xtreme.jpg"
    },
    {
      id: 5,
      name: "Camiseta Dry Fit Pro",
      description: "Tecnologia de secagem rápida",
      price: 14990,
      originalPrice: 19990,
      badge: "NEW",
      category: "vestuario",
      rating: 4.5,
      releaseDate: "2024-02-25",
      image: "/products/dryfit-shirt.jpg"
    },
    {
      id: 6,
      name: "Barra Paralelas Portátil",
      description: "Treino em qualquer lugar",
      price: 59990,
      originalPrice: 69990,
      badge: "NEW",
      category: "equipamentos",
      rating: 4.8,
      releaseDate: "2024-02-20",
      image: "/products/parallel-bars.jpg"
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Novas Tendências em Suplementação 2024",
      excerpt: "Descubra as últimas inovações científicas que estão revolucionando o mundo do fitness...",
      category: "Tendências",
      date: "15 Mar 2024",
      readTime: "5 min",
      image: "/blog/trends-2024.jpg"
    },
    {
      id: 2,
      title: "Como Maximizar Resultados com Creatina",
      excerpt: "Guia completo sobre dosagem, timing e combinações ideais para obter os melhores resultados...",
      category: "Otimização",
      date: "12 Mar 2024",
      readTime: "7 min",
      image: "/blog/creatine-guide.jpg"
    },
    {
      id: 3,
      title: "Lançamento Exclusivo: Linha Vegan Pro",
      excerpt: "Conheça nossa nova linha 100% vegetal de suplementos para atletas veganos...",
      category: "Lançamentos",
      date: "10 Mar 2024",
      readTime: "4 min",
      image: "/blog/vegan-line.jpg"
    },
  ];

  const upcomingReleases = [
    {
      name: "Energy Gel Pro",
      description: "Energia instantânea para treinos longos",
      releaseDate: "25 Mar 2024",
      category: "suplementos"
    },
    {
      name: "Smart Scale 2.0",
      description: "Balança inteligente com análise corporal",
      releaseDate: "30 Mar 2024",
      category: "equipamentos"
    },
    {
      name: "Collection Verão 2024",
      description: "Nova linha de roupas fitness",
      releaseDate: "5 Abr 2024",
      category: "vestuario"
    },
  ];

  const filters = [
    { id: "all", label: "Todos", icon: Flame },
    { id: "suplementos", label: "Suplementos", icon: TrendingUp },
    { id: "equipamentos", label: "Equipamentos", icon: Star },
    { id: "vestuario", label: "Vestuário", icon: Tag },
  ];

  const formatKz = (value) => {
    return value.toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('AOA', 'Kz');
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-AO', options);
  };

  const filteredProducts = activeFilter === "all" 
    ? newProducts 
    : newProducts.filter(product => product.category === activeFilter);

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
                  className={`font-medium hover:text-green-400 transition-colors duration-200 ${
                    item.href === "/new" ? "text-green-400" : ""
                  }`}
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
                    className={`rounded-md px-3 py-2 font-medium hover:bg-gray-800 hover:text-green-400 transition-colors ${
                      item.href === "/new" ? "text-green-400 bg-gray-800" : ""
                    }`}
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

      <main className="pb-16">
        {/* Hero Section Novidades */}
        <section className="relative overflow-hidden bg-gradient-to-b from-black via-black  py-12 md:py-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
                <Flame className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">ÚLTIMAS NOVIDADES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block text-white">Descubra as</span>
                <span className="block text-green-400">Últimas Novidades</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Fique por dentro dos lançamentos exclusivos, tendências emergentes e 
                inovações que estão transformando o mundo do fitness.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3">
                  <div className="text-2xl font-bold text-green-400">15+</div>
                  <div className="text-sm text-gray-400">Novos produtos</div>
                </div>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3">
                  <div className="text-2xl font-bold text-green-400">3</div>
                  <div className="text-sm text-gray-400">Lançamentos semanais</div>
                </div>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3">
                  <div className="text-2xl font-bold text-green-400">24h</div>
                  <div className="text-sm text-gray-400">Entrega rápida</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-gray-800 hover:border-green-500/50 hover:bg-gray-900"
                  }`}
                >
                  <filter.icon size={18} />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {activeFilter === "all" ? "Todos os Lançamentos" : 
                   activeFilter === "suplementos" ? "Suplementos" :
                   activeFilter === "equipamentos" ? "Equipamentos" : "Vestuário"}
                </h2>
                <p className="text-gray-400">
                  {filteredProducts.length} produtos encontrados
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <span className="text-gray-400">Ordenar por:</span>
                <select className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
                  <option>Mais Recentes</option>
                  <option>Mais Populares</option>
                  <option>Preço: Menor para Maior</option>
                  <option>Preço: Maior para Menor</option>
                </select>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className="aspect-square relative rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5"></div>
                      <Image
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.badge === "NEW" ? "bg-green-500 text-black" :
                        product.badge === "HOT" ? "bg-red-500 text-white" :
                        product.badge === "LIMITED" ? "bg-purple-500 text-white" :
                        "bg-blue-500 text-white"
                      }`}>
                        {product.badge}
                      </div>
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <button className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors">
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < Math.floor(product.rating) ? "fill-current" : ""}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">({product.rating})</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {formatKz(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatKz(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(product.releaseDate)}
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                      <ShoppingCart size={18} />
                      <span>Adicionar ao Carrinho</span>
                      <ArrowRight size={18} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Próximos Lançamentos */}
        <section className="py-16 bg-gradient-to-b from-gray-900/30 to-black">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-medium">EM BREVE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Próximos Lançamentos</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Fique atento aos produtos que estão por vir em nosso catálogo
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {upcomingReleases.map((release, index) => (
                <div key={index} className="bg-black/50 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 mb-1">
                        {release.releaseDate}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{release.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{release.description}</p>
                      <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs">
                        {release.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog & Conteúdo */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Conteúdo Exclusivo</h2>
                <p className="text-gray-400">Artigos, guias e dicas sobre fitness</p>
              </div>
              
              <Link 
                href="/blog" 
                className="hidden md:flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                Ver todos os artigos
                <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5"></div>
                      <Image
                        src={post.image || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium">
                        {post.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} leitura
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors group/link"
                    >
                      Ler artigo completo
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black rounded-full transition-all duration-200"
              >
                Ver todos os artigos
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
                <Flame className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">FIQUE POR DENTRO</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seja o Primeiro a Saber
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Receba em primeira mão informações sobre novos produtos, promoções exclusivas e conteúdo especial.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-6 py-3 bg-gray-900 border border-gray-800 rounded-full focus:border-green-500 focus:outline-none"
                />
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-200 transform hover:scale-105">
                  Inscrever-se
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Prometemos não enviar spam. Você pode cancelar a qualquer momento.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}