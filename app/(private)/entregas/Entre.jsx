'use client'
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Truck, Package, Clock, Shield, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function DeliveryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  
  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/produtos", label: "PRODUTOS" },
    { href: "/new", label: "NOVIDADES" },
    { href: "/delivery", label: "ENTREGA" },
  ];

  const deliverySteps = [
    {
      icon: Package,
      title: "Faça seu pedido",
      description: "Escolha entre milhares de produtos no nosso catálogo"
    },
    {
      icon: Clock,
      title: "Processamento rápido",
      description: "Seu pedido é processado em até 2 horas úteis"
    },
    {
      icon: Truck,
      title: "Envio seguro",
      description: "Entregamos com máxima segurança e cuidado"
    },
    {
      icon: CheckCircle,
      title: "Receba em casa",
      description: "Produto entregue diretamente na sua porta"
    }
  ];

  const coverageAreas = [
    "Luanda (Todas as zonas)",
    "Benguela",
    "Huíla (Lubango)",
    "Huambo",
    "Cabinda",
    "Namibe",
    "Kwanza Sul",
    "Kwanza Norte",
    "Uíge"
  ];

  const shippingOptions = [
    {
      name: "Expresso",
      time: "24-48 horas",
      price: "Kz 2.500",
      description: "Entrega prioritária para Luanda",
      icon: "🚚"
    },
    {
      name: "Padrão",
      time: "3-5 dias úteis",
      price: "Kz 1.500",
      description: "Entrega para todo país",
      icon: "📦"
    },
    {
      name: "Económico",
      time: "5-10 dias úteis",
      price: "Kz 800",
      description: "Opção mais económica",
      icon: "💰"
    }
  ];

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

  const faqs = [
    {
      question: "Quanto tempo leva para receber meu pedido?",
      answer: "O tempo de entrega varia conforme a região. Em Luanda, entregamos em 24-48 horas. Para outras províncias, o prazo é de 3-10 dias úteis."
    },
    {
      question: "Posso rastrear meu pedido?",
      answer: "Sim! Após a confirmação do pagamento, você receberá um código de rastreamento por SMS e email."
    },
    {
      question: "Vocês entregam em todo Angola?",
      answer: "Sim, entregamos em todas as províncias de Angola. Algumas áreas remotas podem ter prazos mais longos."
    },
    {
      question: "Qual o custo de envio?",
      answer: "O custo varia conforme a localidade e opção escolhida. Consulte nossa tabela de fretes acima."
    }
  ];

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
                    item.href === "/delivery" ? "text-green-400" : ""
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
                      item.href === "/delivery" ? "text-green-400 bg-gray-800" : ""
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
        {/* Hero Section Entrega */}
        <section className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                  <Truck className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">ENTREGA RÁPIDA</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white">Entrega</span>
                  <span className="block text-green-400">Rápida & Segura</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  Entregamos seus suplementos e equipamentos fitness em todo Angola com segurança, 
                  rapidez e qualidade. Nossa rede de distribuição garante que seus produtos cheguem 
                  intactos e no prazo prometido.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-bold">100% Seguro</div>
                      <div className="text-sm text-gray-400">Embalagem especial</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-bold">Até 48h</div>
                      <div className="text-sm text-gray-400">Para Luanda</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-square relative rounded-2xl overflow-hidden">
                    <Image 
                      src="/delivery-hero.jpg" 
                      alt="Serviço de entrega" 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-black/50 border border-green-500/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-400">24-48h</div>
                      <div className="text-sm text-gray-300">Luanda</div>
                    </div>
                    
                    <div className="bg-black/50 border border-gray-800 rounded-xl p-4">
                      <div className="text-2xl font-bold text-white">3-10 dias</div>
                      <div className="text-sm text-gray-300">Outras províncias</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processo de Entrega */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona nossa entrega</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Um processo simples e transparente do pedido até a entrega na sua porta
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {deliverySteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-green-500/50 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                      <step.icon className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opções de Envio */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Opções de Envio</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Escolha a opção que melhor se adapta às suas necessidades
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {shippingOptions.map((option, index) => (
                <div key={index} className={`border rounded-2xl p-6 transition-all duration-300 ${
                  index === 0 
                    ? 'border-green-500 bg-green-500/5' 
                    : 'border-gray-800 bg-gray-900 hover:border-green-500/50'
                }`}>
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <div className="text-2xl font-bold text-green-400 mb-2">{option.price}</div>
                  <div className="text-gray-300 mb-4">{option.time}</div>
                  <p className="text-gray-400 mb-6">{option.description}</p>
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    index === 0
                      ? 'bg-green-500 hover:bg-green-600 text-black'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}>
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Áreas de Cobertura */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Áreas de Cobertura</h2>
                <p className="text-gray-400 mb-8">
                  Entregamos em todas as principais províncias de Angola com uma rede 
                  de distribuição que cresce constantemente para servir você melhor.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {coverageAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Precisa de ajuda com a entrega?</h4>
                      <p className="text-gray-400 mb-3">
                        Nossa equipe está disponível para esclarecer dúvidas sobre prazos e áreas de entrega.
                      </p>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-sm text-gray-400">Telefone</div>
                          <div className="font-bold">+244 923 456 789</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <div className="font-bold">entregas@fitnessstore.ao</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8">
                  <div className="aspect-video relative rounded-xl overflow-hidden">
                    <Image 
                      src="/map-delivery.jpg" 
                      alt="Mapa de cobertura de entrega" 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm">Entrega rápida (24-48h)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Entrega padrão (3-10 dias)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tire suas dúvidas sobre nosso serviço de entrega
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-800/50 transition-colors">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <div className="flex-shrink-0 ml-4">
                        <svg className="w-6 h-6 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}