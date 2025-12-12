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
    return subtotal * 0.1; 
  };

  const calcularTotal = () => {
    return subtotal - calcularDesconto() + 1500; 
  };

  return (
    <>
      <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 sticky top-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold text-green-500">Resumo do Pedido</h2>
        </div>

        {/* Detalhes do Preço */}
        <div className="p-6 space-y-4 bg-white rounded-b-lg">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({itens.length} itens)</span>
            <span className="text-green-500 font-medium">{formatarPreco(subtotal)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-green-500">Desconto (10%)</span>
            <span className="text-green-500 font-medium">-{formatarPreco(calcularDesconto())}</span>
          </div>
          
          <div className="flex justify-between text-gray-700">
            <span>Entrega</span>
            <span className="text-gray-950 font-medium">
              {subtotal > 50000 ? 'Grátis' : formatarPreco(1500)}
            </span>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-950">Total</span>
              <span className="text-green-500">{formatarPreco(calcularTotal())}</span>
            </div>
            
          </div>


          {/* Botão Finalizar Compra */}
          <button className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg mt-4 shadow-md">
            Finalizar Compra
          </button>

          {/* Métodos de Pagamento */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Métodos de pagamento aceitos:</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-950 border">VISA</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-950 border">MASTERCARD</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-950 border">Express</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-950 border">Transferencia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-950">Compra 100% Segura</h4>
            <p className="text-sm text-gray-700 mt-1">
              Seus dados estão protegidos com criptografia SSL. Garantimos a segurança da sua transação.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}