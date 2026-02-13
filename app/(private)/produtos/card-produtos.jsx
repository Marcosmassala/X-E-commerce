"use client";

export default function ProductCard({ product = {} }) {
  // Desestruturação com valores padrão SEGUROS
  const {
    id,
    brand = "Marca",
    rating = 0,
    reviewCount = 0,
    name = "Produto",
    features = [], // VALOR PADRÃO CRÍTICO - evita erro .slice()
    price = 0,
    originalPrice = price, // Se não existir, usa o preço atual
    inStock = false,
    isBestSeller = false,
    isNew = false
  } = product;

  // Verificação adicional para features (segurança extra)
  const safeFeatures = Array.isArray(features) ? features : [];
  
  // Calcular desconto com segurança
  const hasDiscount = originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-green-500/50 hover:shadow-xl transition-all duration-300 group">
      {/* Imagem do Produto */}
      <div className="relative h-48 bg-gray-800 rounded-t-xl overflow-hidden">
        
        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <span className="text-gray-400 text-sm">Imagem do Produto</span>
        </div>
      </div>

      <div className="p-6">
        {/* Marca */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-green-400 px-2 py-1 rounded border border-green-500/30">
            {brand}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-300 font-medium">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({reviewCount})
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-white mb-3 line-clamp-2 leading-tight text-lg">
          {name}
        </h3>

        {/* Features com verificação */}
        <div className="mb-4">
          <ul className="text-sm text-gray-300 space-y-2">
            {safeFeatures.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
            
            {/* Fallback se não houver features */}
            {safeFeatures.length === 0 && (
              <li className="flex items-center text-gray-500">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                Características não disponíveis
              </li>
            )}
          </ul>
        </div>

        {/* Preço */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-white">
              {price.toLocaleString('pt-AO')} Kz
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice.toLocaleString('pt-AO')} Kz
              </span>
            )}
          </div>
          {hasDiscount && (
            <span className="text-sm font-medium text-green-400 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] ${
            inStock
              ? 'bg-green-500 hover:bg-green-600 text-black shadow-md hover:shadow-lg'
              : 'bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!inStock}
        >
          {inStock ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Adicionar ao Carrinho</span>
            </span>
          ) : (
            'Fora de Stock'
          )}
        </button>
      </div>
    </div>
  );
}