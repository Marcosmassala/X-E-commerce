"use client";
import { useState } from "react";

export default function Produto() {
  const [quantidade, setQuantidade] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
//simular requição
    setTimeout(() => {
      setIsAddingToCart(false);
      
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="flex-1">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <img
                src="/imagem2.png"
                alt="Creatine Xplode Power"
                className="w-full h-80 md:h-96 object-contain transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-gray-800 rounded-xl p-2 cursor-pointer transform hover:scale-110 transition-all duration-300 hover:border-2 hover:border-green-500"
                >
                  <img 
                    src="/imagem2.png" 
                    className="w-16 h-16 object-contain" 
                    alt={`Thumbnail ${item}`}
                  />
                </div>
              ))}
            </div>
          </div>

        
          <div className="flex-1 space-y-6">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CREATINE XPLODE POWER
              </h1>
              <p className="text-gray-400 text-lg mt-2">By Supplement Brand</p>
              
              <div className="flex items-center mt-4 space-x-2">
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(5)}
                </div>
                <span className="text-gray-400 underline hover:text-white transition-colors cursor-pointer">
                  1,234 reviews
                </span>
              </div>
            </div>

            <div className="animate-slide-up delay-100">
              <p className="text-4xl font-bold text-green-500">KZ 299.90</p>
              <p className="text-gray-400 text-sm mt-1">Em stock • Entrega grátis</p>
            </div>

            <div className="animate-slide-up delay-200">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">Quantidade:</span>
                <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2">
                  <button
                    onClick={diminuir}
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className="text-xl font-bold min-w-8 text-center">{quantidade}</span>
                  <button
                    onClick={aumentar}
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="animate-slide-up delay-300">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full max-w-xs py-4 px-8 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 ${
                  isAddingToCart 
                    ? 'bg-green-700 cursor-not-allowed' 
                    : 'bg-gray-800 hover:from-green-500 hover:to-emerald-500'
                } shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adicionando...</span>
                  </>
                ) : (
                  <>
                    
                    <span>Adicionar no Carrinho</span>
                  </>
                )}
              </button>
            </div>

          
     
          </div>
        </div>


        <div className="mt-12 lg:mt-16 animate-fade-in">
          <div className="flex space-x-8 border-b border-gray-700 pb-2">
            {[
              { id: "descricao", label: "Descrição" },
              { id: "nutricao", label: "Informação Nutricional" },
              { id: "avaliacoes", label: "Avaliações" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 text-gray-300 space-y-6">
            {activeTab === "descricao" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-800/50 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-3">Descrição do Produto</h2>
                  <p className="leading-relaxed">
                    A creatina é um composto orgânico produzido naturalmente pelo
                    organismo a partir dos aminoácidos arginina, glicina e metionina.
                    Sua síntese ocorre predominantemente no fígado, rins e pâncreas,
                    e sua principal função está ligada ao fornecimento rápido de energia
                    para as células.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-3">Como Usar</h2>
                  <p className="leading-relaxed">
                    Recomenda-se a ingestão de 3-5g de creatina monohidratada por dia,
                    preferencialmente após o treino. Misture uma colher de medida (5g)
                    em 200-300ml de água ou suco. Mantenha-se hidratado durante o uso.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "avaliacoes" && (
              <div className="animate-fade-in">
                <div className="bg-gray-800/50 rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold">4.5</span>
                    <span className="text-yellow-400 text-xl">★★★★☆</span>
                    <p className="text-gray-400">Baseado em 1,234 avaliações</p>
                  </div>
                  
               
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="font-semibold">João Silva</span>
                    </div>
                    <p className="text-gray-300">
                      "Produto excelente! Resultados visíveis em poucas semanas."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}