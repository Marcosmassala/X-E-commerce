"use client";

export default function ProductCard({ product }) {
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
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-300 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-white mb-3 line-clamp-2 leading-tight text-lg">
          {product.name}
        </h3>

        
        <div className="mb-4">
          <ul className="text-sm text-gray-300 space-y-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-white">
              {product.price.toLocaleString('pt-AO')} Kz
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('pt-AO')} Kz
              </span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <span className="text-sm font-medium text-green-400 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] ${product.inStock
            ? 'bg-green-500 hover:bg-green-600 text-black shadow-md hover:shadow-lg'
            : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <span className="flex items-center justify-center">
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