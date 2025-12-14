"use client";

import { Lock, CheckCircle } from 'lucide-react';

export default function OrderSummary({ 
  itens, 
  formatarPreco, 
  calcularSubtotal, 
  calcularDescontoProdutos, 
  calcularFrete, 
  calcularTotal, 
  finalizarCompra, 
  carregando 
}) {
  return (
    <div className="sticky top-24">
     
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-xl font-bold">Resumo do Pedido</h2>
          <p className="text-gray-400 text-sm mt-1">Confirme os valores antes de finalizar</p>
        </div>

        <div className="p-6">
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'})</span>
              <span className="font-medium">{formatarPreco(calcularSubtotal())}</span>
            </div>
            
            {calcularDescontoProdutos() > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Desconto em produtos</span>
                <span className="font-medium">-{formatarPreco(calcularDescontoProdutos())}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-400">Entrega</span>
              <span className="font-medium">
                {calcularFrete() === 0 ? (
                  <span className="text-green-400">Grátis</span>
                ) : (
                  formatarPreco(calcularFrete())
                )}
              </span>
            </div>

            
            <div className="border-t border-gray-800 pt-4 mt-2">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{formatarPreco(calcularTotal())}</span>
              </div>
            </div>
          </div>

          
          <CheckoutButton 
            itens={itens}
            carregando={carregando}
            finalizarCompra={finalizarCompra}
          />

          
          <PaymentMethods />
        </div>
      </div>

      
      <QuickInfo />
    </div>
  );
}


function CheckoutButton({ itens, carregando, finalizarCompra }) {
  return (
    <button
      onClick={finalizarCompra}
      disabled={itens.length === 0 || carregando}
      className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-semibold text-lg mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {carregando ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
          Processando...
        </>
      ) : (
        <>
          <Lock size={20} className="mr-3" />
          Finalizar Compra
        </>
      )}
    </button>
  );
}


function PaymentMethods() {
  return (
    <div className="text-center pt-6 border-t border-gray-800 mt-6">
      <p className="text-gray-400 text-sm mb-3">Pagamentos aceitos:</p>
      <div className="flex justify-center gap-2 flex-wrap">
        <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">VISA</div>
        <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">MASTERCARD</div>
        <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">TRANSFERÊNCIA</div>
      </div>
    </div>
  );
}


function QuickInfo() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-400/10 p-2 rounded-lg">
            <CheckCircle size={18} className="text-green-400" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Entrega Rápida</h4>
            <p className="text-gray-400 text-sm">Envio em 24h para Luanda</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-400/10 p-2 rounded-lg">
            <CheckCircle size={18} className="text-green-400" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Compra Segura</h4>
            <p className="text-gray-400 text-sm">Pagamento 100% protegido</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-400/10 p-2 rounded-lg">
            <CheckCircle size={18} className="text-green-400" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Suporte</h4>
            <p className="text-gray-400 text-sm">Ajuda disponível 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}