'use client'
import Image from "next/image";
import Link from "next/link";
import { 
  Truck, 
  Package, 
  Clock, 
  Shield, 
  MapPin, 
  Phone, 
  Zap, 
  Globe, 
  DollarSign,
  Rocket,
  Box,
  Wallet
} from "lucide-react";
import Navbar from "../../../components/Navbar"; 
import Footer from "@/components/Footer";

export default function DeliveryPage() {
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
      icon: Rocket,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      name: "Padrão",
      time: "3-5 dias úteis",
      price: "Kz 1.500",
      description: "Entrega para todo país",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Económico",
      time: "5-10 dias úteis",
      price: "Kz 800",
      description: "Opção mais económica",
      icon: Wallet,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    }
  ];

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
      <Navbar />

      <main className="pb-16">
        {/* Hero Section Entrega */}
        <section className="relative overflow-hidden from-black py-12 md:py-20">
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

        {/* Opções de Envio Melhoradas */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Opções de Envio</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Escolha a opção que melhor se adapta às suas necessidades
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {shippingOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={index} className={`border rounded-2xl p-6 transition-all duration-300 group hover:scale-[1.02] ${
                    index === 0 
                      ? 'border-green-500/50 bg-gradient-to-b from-gray-900 to-black shadow-lg shadow-green-500/10' 
                      : 'border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-green-500/30 hover:shadow-xl'
                  }`}>
                    {/* Ícone com efeito visual */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 ${option.bgColor} rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                      <div className={`relative w-16 h-16 ${option.bgColor} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${option.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className={index === 0 ? 'text-green-400' : 'text-white'}>{option.name}</span>
                      {index === 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                          <Zap className="w-3 h-3" />
                          RECOMENDADO
                        </span>
                      )}
                    </h3>
                    
                    <div className="text-2xl font-bold text-green-400 mb-3">{option.price}</div>
                    
                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{option.time}</span>
                    </div>
                    
                    <p className="text-gray-400 mb-8 leading-relaxed">{option.description}</p>
                    
                    <button className={`w-full py-3 rounded-xl font-semibold transition-all group-hover:shadow-lg ${
                      index === 0
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black shadow-green-500/25'
                        : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                    }`}>
                      <span className="flex items-center justify-center gap-2">
                        {index === 0 && <Rocket className="w-4 h-4" />}
                        Selecionar
                      </span>
                    </button>
                  </div>
                );
              })}
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
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/10 rounded-full blur-sm group-hover:blur-md transition-all"></div>
                        <MapPin className="w-5 h-5 text-green-400 relative group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="group-hover:text-green-300 transition-colors">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
                
                
    
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-green-500/5 to-emerald-600/5 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-green-500/30 transition-all">
                  <div className="aspect-video relative rounded-xl overflow-hidden">
                    <Image 
                      src="/map-delivery.jpg" 
                      alt="Mapa de cobertura de entrega" 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold">Cobertura Nacional</div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Truck className="w-5 h-5" />
                        <span className="font-bold">100% Angola</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-gray-300">Entrega rápida (24-48h)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-300">Entrega padrão (3-10 dias)</span>
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
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500/30 transition-all group">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-800/30 transition-colors group-open:bg-gray-800/50">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center group-open:bg-green-500/20 transition-all">
                          <span className="text-green-400 font-bold">{index + 1}</span>
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-green-300 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg className="w-6 h-6 text-gray-400 group-open:text-green-400 group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}