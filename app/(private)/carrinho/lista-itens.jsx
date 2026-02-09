"use client";

import { Minus, Plus, Trash2, Package, CheckCircle, AlertCircle } from 'lucide-react';

export default function CartItem({ item, formatarPreco, atualizarQuantidade, removerItem }) {
  return (
    <div className="p-4 sm:p-6 hover:bg-gray-800/50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        
        {/* Imagem do Produto - Responsiva */}
        <div className="flex-shrink-0 relative self-center sm:self-start">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <Package 
                size={24} 
                className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-500 mx-auto" 
              />
              <span className="text-gray-500 text-xs mt-1 block">Produto</span>
            </div>
          </div>
        </div>

        {/* Informações do Produto - Responsiva */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
            <div className="pr-4 flex-1">
              {/* Nome do Produto */}
              <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2">
                {item.nome}
              </h3>
              
              {/* Marca e Sabor */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs sm:text-sm">
                  {item.marca}
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-400 text-xs sm:text-sm">
                  {item.sabor}
                </span>
              </div>
              
              {/* Preço */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-lg sm:text-xl font-bold">
                  {formatarPreco(item.preco * item.quantidade)}
                </span>
                {item.emPromocao && item.precoOriginal && (
                  <>
                    <span className="text-gray-500 text-xs sm:text-sm line-through">
                      {formatarPreco(item.precoOriginal * item.quantidade)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Economizou {formatarPreco((item.precoOriginal - item.preco) * item.quantidade)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Botão Remover - Responsivo */}
            <button
              onClick={() => removerItem(item.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors p-1.5 sm:p-2 rounded-lg self-end sm:self-start"
              title="Eliminar produto"
              aria-label={`Remover ${item.nome} do carrinho`}
            >
              <Trash2 size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Controles de Quantidade e Informações - Responsivos */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 sm:mt-6">
            
            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <button
                  onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                  className="p-1.5 sm:p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                  disabled={item.quantidade <= 1}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={16} className="sm:w-4 sm:h-4" />
                </button>
                
                <span className="px-3 sm:px-6 py-1.5 sm:py-2 font-medium bg-gray-800 min-w-[40px] sm:min-w-[60px] text-center text-sm sm:text-base">
                  {item.quantidade}
                </span>
                
                <button
                  onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                  className="p-1.5 sm:p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                  disabled={item.quantidade >= item.estoque}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Preço Unitário e Estoque - Responsivo */}
            <div className="text-right sm:text-left w-full sm:w-auto">
              <p className="text-gray-400 text-xs sm:text-sm">
                {formatarPreco(item.preco)} cada
              </p>
              
              {/* Status do Estoque */}
              <div className="mt-1 sm:mt-2">
                {item.estoque <= 5 ? (
                  <div className="flex items-center text-amber-400 text-xs sm:text-sm">
                    <AlertCircle 
                      size={12} 
                      className="sm:w-3 sm:h-3 mr-1 flex-shrink-0" 
                    />
                    <span className="truncate">
                      Apenas {item.estoque} em estoque
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-400 text-xs sm:text-sm">
                    <CheckCircle 
                      size={12} 
                      className="sm:w-3 sm:h-3 mr-1 flex-shrink-0" 
                    />
                    <span>Em estoque</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}