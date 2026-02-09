"use client";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Produto() {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Imagens do produto
  const productImages = [
    "/imagem2.png",
    "/imagem1.png",
    "/imagem3.png",
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Botão Voltar para Mobile */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 md:hidden">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Voltar</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 md:py-8">
        {/* Botão Voltar Desktop */}
        <button
          onClick={() => router.back()}
          className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar aos produtos</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          
          {/* Seção de Imagens */}
          <div className="flex-1">
            {/* Imagem Principal */}
            <div className="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96">
                <Image
                  src={productImages[activeImage]}
                  alt="Creatine Xplode Power"
                  fill
                  className="object-contain transform hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            </div>
            
            {/* Miniaturas */}
            <div className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 rounded-lg md:rounded-xl p-2 transition-all duration-200 ${
                    activeImage === index
                      ? 'bg-gray-700 border-2 border-green-500'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Nome e Avaliações */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                CREATINE XPLODE POWER
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-1 md:mt-2">
                By Supplement Brand
              </p>
              
              {/* Avaliações - Apenas em Desktop */}
              <div className="hidden md:flex items-center mt-3 md:mt-4 space-x-2">
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(5)}
                </div>
                <span className="text-gray-400 text-sm">
                  1,234 reviews
                </span>
              </div>
            </div>

            {/* Preço e Disponibilidade */}
            <div className="bg-gray-900 rounded-xl p-4 md:p-6">
              <p className="text-3xl sm:text-4xl font-bold text-green-500">
                KZ 299.90
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1 md:mt-2">
                <span className="text-gray-400 text-sm">
                  Em stock
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 text-sm">
                  Entrega grátis
                </span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-gray-400 text-sm hidden sm:inline">
                  300g
                </span>
              </div>
            </div>

            {/* Seletor de Quantidade */}
            <div className="bg-gray-900 rounded-xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-base sm:text-lg font-semibold">
                  Quantidade:
                </span>
                <div className="flex items-center justify-between sm:justify-start space-x-4 bg-gray-800 rounded-full px-4 py-2 w-full sm:w-auto">
                  <button
                    onClick={diminuir}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors active:scale-95"
                    aria-label="Diminuir quantidade"
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className="text-xl font-bold min-w-10 text-center">
                    {quantidade}
                  </span>
                  <button
                    onClick={aumentar}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors active:scale-95"
                    aria-label="Aumentar quantidade"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
              
              {/* Preço Total para Mobile */}
              <div className="mt-4 text-center sm:hidden">
                <p className="text-gray-400 text-sm">Total:</p>
                <p className="text-2xl font-bold text-green-500">
                  KZ {(299.90 * quantidade).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Botão Adicionar ao Carrinho */}
            <div className="sticky bottom-0 bg-gray-950/95 backdrop-blur-sm py-3 -mx-4 px-4 md:static md:bg-transparent md:py-0 md:mx-0 md:px-0 border-t border-gray-800 md:border-0">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-colors ${
                  isAddingToCart 
                    ? 'bg-green-700 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500'
                } flex items-center justify-center space-x-2`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adicionando...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
              
              {/* Preço Total para Desktop */}
              <div className="hidden sm:block mt-3 text-center">
                <p className="text-gray-400">Total: <span className="text-green-500 font-bold text-lg ml-2">
                  KZ {(299.90 * quantidade).toFixed(2)}
                </span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Detalhes */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="flex overflow-x-auto border-b border-gray-700 -mx-4 px-4 md:mx-0 md:px-0 md:space-x-8">
            {[
              { id: "descricao", label: "Descrição" },
              { id: "nutricao", label: "Nutrição" },
              { id: "avaliacoes", label: "Avaliações" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 pb-3 px-2 md:px-1 font-semibold text-sm md:text-base transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conteúdo das Tabs */}
          <div className="mt-4 md:mt-6 text-gray-300">
            {activeTab === "descricao" && (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-white mb-3">
                    Descrição do Produto
                  </h2>
                  <p className="leading-relaxed text-sm md:text-base">
                    A creatina é um composto orgânico produzido naturalmente pelo
                    organismo a partir dos aminoácidos arginina, glicina e metionina.
                    Sua síntese ocorre predominantemente no fígado, rins e pâncreas,
                    e sua principal função está ligada ao fornecimento rápido de energia
                    para as células.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-bold text-white mb-3">
                    Como Usar
                  </h2>
                  <p className="leading-relaxed text-sm md:text-base">
                    Recomenda-se a ingestão de 3-5g de creatina monohidratada por dia,
                    preferencialmente após o treino. Misture uma colher de medida (5g)
                    em 200-300ml de água ou suco. Mantenha-se hidratado durante o uso.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "avaliacoes" && (
              <div>
                <div className="bg-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-3xl font-bold">4.5</span>
                      <span className="text-yellow-400 text-lg md:text-xl">★★★★☆</span>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">
                      Baseado em 1,234 avaliações
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-400"></span>
                      <span className="font-semibold">João Silva</span>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">
                      &quot;Produto excelente! Resultados visíveis em poucas semanas.&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Otimizações para mobile */
        @media (max-width: 640px) {
          /* Melhorar área de toque */
          button {
            min-height: 44px;
          }
          
          /* Suavizar scroll horizontal */
          .overflow-x-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        }
        
        /* Prevenir zoom em iOS */
        @media screen and (max-width: 768px) {
          input[type="email"],
          input[type="text"],
          textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}