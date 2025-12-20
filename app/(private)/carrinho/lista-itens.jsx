
"use client";

import { X, Plus, Minus, Truck, Shield, CreditCard } from 'lucide-react';

export default function ListaItens({ itens, onAtualizarQuantidade, onRemoverItem }) {
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(preco);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-950">
        
        {/* Cabeçalho do Carrinho */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Carrinho de Compras</h1>
          <p className="text-gray-600 mt-1">{itens.length} {itens.length === 1 ? 'item' : 'itens'} no carrinho</p>
        </div>

        {/* Lista de Itens */}
        <div className="divide-y divide-gray-200">
          {itens.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex gap-4">
                
                {/* Imagem do Produto */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs text-center">Imagem</span>
                  </div>
                </div>

                {/* Informações do Produto */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.nome}</h3>
                      <p className="text-gray-600 text-sm">{item.marca} - {item.sabor}</p>
                    </div>
                    <button
                      onClick={() => onRemoverItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    
                    {/* Seletor de Quantidade */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantidade <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-medium">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantidade >= item.estoque}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Preço */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatarPreco(item.preco * item.quantidade)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatarPreco(item.preco)} cada
                      </p>
                    </div>
                  </div>

                  {/* Estoque */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {item.estoque} unidades em estoque
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carrinho Vazio */}
        {itens.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Seu carrinho está vazio</h3>
            <p className="text-gray-600 mb-6">Adicione alguns produtos incríveis!</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Continuar Comprando
            </button>
          </div>
        )}
      </div>

      {/* Benefícios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">Entrega Grátis</h4>
          <p className="text-sm text-gray-600">Acima de 50.000 Kz</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">Compra Segura</h4>
          <p className="text-sm text-gray-600">Seus dados protegidos</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900">Parcele em 3x</h4>
          <p className="text-sm text-gray-600">Sem juros no cartão</p>
        </div>
      </div>
    </>
  );
}