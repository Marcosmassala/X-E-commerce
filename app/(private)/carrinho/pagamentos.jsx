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
    <div className="sticky top-20 lg:top-24">
      {/* Resumo do Pedido */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800">
          <h2 className="text-lg sm:text-xl font-bold">Resumo do Pedido</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Confirme os valores antes de finalizar
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Detalhes do Preço */}
          <PriceDetails 
            itens={itens}
            formatarPreco={formatarPreco}
            calcularSubtotal={calcularSubtotal}
            calcularDescontoProdutos={calcularDescontoProdutos}
            calcularFrete={calcularFrete}
            calcularTotal={calcularTotal}
          />

          {/* Botão Finalizar Compra */}
          <CheckoutButton 
            itens={itens}
            carregando={carregando}
            finalizarCompra={finalizarCompra}
          />

          {/* Métodos de Pagamento */}
          <PaymentMethods />
        </div>
      </div>

      {/* Informações Rápidas */}
      <QuickInfo />
    </div>
  );
}

function PriceDetails({ 
  itens, 
  formatarPreco, 
  calcularSubtotal, 
  calcularDescontoProdutos, 
  calcularFrete, 
  calcularTotal 
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between text-sm sm:text-base">
        <span className="text-gray-400">
          Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
        </span>
        <span className="font-medium">{formatarPreco(calcularSubtotal())}</span>
      </div>
      
      {calcularDescontoProdutos() > 0 && (
        <div className="flex justify-between text-green-400 text-sm sm:text-base">
          <span>Desconto em produtos</span>
          <span className="font-medium">
            -{formatarPreco(calcularDescontoProdutos())}
          </span>
        </div>
      )}
      
      <div className="flex justify-between text-sm sm:text-base">
        <span className="text-gray-400">Entrega</span>
        <span className="font-medium">
          {calcularFrete() === 0 ? (
            <span className="text-green-400">Grátis</span>
          ) : (
            formatarPreco(calcularFrete())
          )}
        </span>
      </div>

      {/* Total */}
      <div className="border-t border-gray-800 pt-3 sm:pt-4 mt-2">
        <div className="flex justify-between text-lg sm:text-xl font-bold">
          <span>Total</span>
          <span>{formatarPreco(calcularTotal())}</span>
        </div>
      </div>
    </div>
  );
}

function CheckoutButton({ itens, carregando, finalizarCompra }) {
  return (
    <button
      onClick={finalizarCompra}
      disabled={itens.length === 0 || carregando}
      className="w-full bg-green-500 hover:bg-green-600 text-black py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg mt-4 sm:mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {carregando ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-2 sm:mr-3"></div>
          <span className="text-sm sm:text-base">Processando...</span>
        </>
      ) : (
        <>
          <Lock size={16} className="sm:w-5 sm:h-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base">Finalizar Compra</span>
        </>
      )}
    </button>
  );
}

function PaymentMethods() {
  return (
    <div className="text-center pt-4 sm:pt-6 border-t border-gray-800 mt-4 sm:mt-6">
      <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
        Pagamentos aceitos:
      </p>
      <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
        <div className="bg-gray-800 border border-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
          VISA
        </div>
        <div className="bg-gray-800 border border-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
          MASTERCARD
        </div>
        <div className="bg-gray-800 border border-gray-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
          TRANSFERÊNCIA
        </div>
      </div>
    </div>
  );
}

function QuickInfo() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 mt-4 sm:mt-6">
      <div className="space-y-3 sm:space-y-4">
        <InfoItem 
          icon={<CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-400" />}
          title="Entrega Rápida"
          description="Envio em 24h para Luanda"
        />
        
        <InfoItem 
          icon={<CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-400" />}
          title="Compra Segura"
          description="Pagamento 100% protegido"
        />
        
        <InfoItem 
          icon={<CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-400" />}
          title="Suporte"
          description="Ajuda disponível 24/7"
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="bg-green-400/10 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">
          {title}
        </h4>
        <p className="text-gray-400 text-xs sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}