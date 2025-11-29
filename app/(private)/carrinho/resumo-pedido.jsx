// components/ResumoPedido.jsx
"use client";

import { Shield } from 'lucide-react';

export default function ResumoPedido({ itens, subtotal }) {
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(preco);
  };

  const calcularDesconto = () => {
    return subtotal * 0.1; // 10% de desconto
  };

  const calcularTotal = () => {
    return subtotal - calcularDesconto() + 1500; // + frete
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
        
        {/* Cabeçalho do Resumo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Resumo do Pedido</h2>
        </div>

        {/* Detalhes do Preço */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({itens.length} itens)</span>
            <span>{formatarPreco(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>Desconto (10%)</span>
            <span>-{formatarPreco(calcularDesconto())}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Frete</span>
            <span>{subtotal > 50000 ? 'Grátis' : formatarPreco(1500)}</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{formatarPreco(calcularTotal())}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Em até 3x sem juros</p>
          </div>

          {/* Cupom de Desconto */}
          <div className="border-t border-gray-200 pt-4">
            <label htmlFor="cupom" className="block text-sm font-medium text-gray-700 mb-2">
              Cupom de Desconto
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="cupom"
                placeholder="Digite seu cupom"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                Aplicar
              </button>
            </div>
          </div>

          {/* Botão Finalizar Compra */}
          <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg mt-4">
            Finalizar Compra
          </button>

          {/* Métodos de Pagamento */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Métodos de pagamento aceitos:</p>
            <div className="flex justify-center gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">VISA</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">MASTERCARD</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">PIX</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">MB WAY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Compra 100% Segura</h4>
            <p className="text-sm text-blue-700 mt-1">
              Seus dados estão protegidos com criptografia SSL. Garantimos a segurança da sua transação.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}