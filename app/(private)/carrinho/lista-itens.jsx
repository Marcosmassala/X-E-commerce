"use client";

import { Minus, Plus, Trash2, Package, CheckCircle, AlertCircle } from 'lucide-react';

export default function CartItem({ item, formatarPreco, atualizarQuantidade, removerItem }) {
  return (
    <div className="p-6 hover:bg-gray-800/50 transition-colors duration-200">
      <div className="flex gap-5">
        
        
        <div className="flex-shrink-0 relative">
          <div className="w-28 h-28 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <Package size={32} className="text-gray-500 mx-auto" />
              <span className="text-gray-500 text-xs mt-1 block">Produto</span>
            </div>
          </div>
        </div>

        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="pr-4">
              <h3 className="text-lg font-semibold mb-1">{item.nome}</h3>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-400 text-sm">{item.marca}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-sm">{item.sabor}</span>
              </div>
              
              
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl font-bold">
                  {formatarPreco(item.preco * item.quantidade)}
                </span>
                {item.emPromocao && item.precoOriginal && (
                  <>
                    <span className="text-gray-500 text-sm line-through">
                      {formatarPreco(item.precoOriginal * item.quantidade)}
                    </span>
                    <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Economizou {formatarPreco((item.precoOriginal - item.preco) * item.quantidade)}
                    </span>
                  </>
                )}
              </div>
            </div>

            
            <button
              onClick={() => removerItem(item.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors p-2 rounded-lg"
              title="Eliminar produto"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-6">
            
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <button
                  onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                  className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={item.quantidade <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-2 font-medium bg-gray-800 min-w-[60px] text-center">
                  {item.quantidade}
                </span>
                <button
                  onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                  className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={item.quantidade >= item.estoque}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                {formatarPreco(item.preco)} cada
              </p>
              
              <div className="mt-2">
                {item.estoque <= 5 ? (
                  <div className="flex items-center text-amber-400 text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    Apenas {item.estoque} em estoque
                  </div>
                ) : (
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    Em estoque
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