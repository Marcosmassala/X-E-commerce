
"use client";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
      {/* Badges */}
      <div className="absolute z-10 m-2 flex flex-col space-y-1">
        {product.isBestSeller && (
          <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium">
            Mais Vendido
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Esgotado
          </span>
        )}
        {product.isNew && (
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Novo
          </span>
        )}
      </div>

      {/* Imagem do Produto */}
      <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <span className="text-gray-400 text-sm">Imagem do Produto</span>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4">
        {/* Marca */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400"></span>
            <span className="text-sm text-gray-700 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Nome do Produto */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Características */}
        <div className="mb-3">
          <ul className="text-xs text-gray-600 space-y-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Preço */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString('pt-AO')} Kz
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('pt-AO')} Kz
              </span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Botão de Ação */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${product.inStock
            ? 'bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <span className="flex items-center justify-center space-x-2">

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