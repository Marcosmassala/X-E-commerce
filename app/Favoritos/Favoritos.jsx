"use client";
import { useState } from "react";

export default function FavoritosContent() {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      nome: "Whey Protein 100% Concentrado",
      marca: "Growth Supplements",
      preco: "R$ 89,90",
      precoOriginal: "R$ 99,90",
      desconto: 10,
      emEstoque: true,
      imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      nome: "Creatina Monohidratada 250g",
      marca: "Max Titanium",
      preco: "R$ 59,90",
      precoOriginal: "R$ 69,90",
      desconto: 14,
      emEstoque: true,
      imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      nome: "BCAA 2:1:1 300g",
      marca: "IntegralMedica",
      preco: "R$ 74,90",
      precoOriginal: "",
      desconto: 0,
      emEstoque: false,
      imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w-150&h=150&fit=crop"
    },
    {
      id: 4,
      nome: "Glutamina 300g",
      marca: "Probiotica",
      preco: "R$ 45,90",
      precoOriginal: "R$ 55,90",
      desconto: 18,
      emEstoque: true,
      imagem: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=150&h=150&fit=crop"
    }
  ]);

  // Função para remover favorito
  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(item => item.id !== id));
  };

  // Função para adicionar ao carrinho
  const adicionarAoCarrinho = (id) => {
    alert(`Produto ${id} adicionado ao carrinho!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Meus Favoritos ({favoritos.length})</h2>
        <button 
          onClick={() => setFavoritos([])}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Limpar todos
        </button>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Nenhum produto favoritado ainda</p>
          <p className="text-sm text-gray-500">Explore nossos produtos e adicione seus favoritos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((produto) => (
            <div key={produto.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {produto.marca}
                    </span>
                  </div>
                  <button
                    onClick={() => removerFavorito(produto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{produto.nome}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{produto.preco}</span>
                      {produto.precoOriginal && (
                        <span className="text-sm text-gray-500 line-through">{produto.precoOriginal}</span>
                      )}
                      {produto.desconto > 0 && (
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          -{produto.desconto}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        produto.emEstoque 
                          ? "text-green-800 bg-green-100" 
                          : "text-red-800 bg-red-100"
                      }`}>
                        {produto.emEstoque ? "Em estoque" : "Fora de estoque"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => adicionarAoCarrinho(produto.id)}
                    disabled={!produto.emEstoque}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm ${
                      produto.emEstoque
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {produto.emEstoque ? "Adicionar ao Carrinho" : "Indisponível"}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}