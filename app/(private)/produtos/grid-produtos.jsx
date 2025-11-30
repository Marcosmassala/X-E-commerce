
"use client";

import ProductCard from '../produtos/card-produtos';

export default function ProductGrid({ 
  filteredSupplements, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="lg:w-3/4">
      {/* Barra de Ordenação */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Nome A-Z</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="rating">Melhor Avaliado</option>
              <option value="bestseller">Mais Vendidos</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600 font-medium">
            <span className="text-green-600">{filteredSupplements.length}</span> produtos encontrados
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSupplements.map(supplement => (
          <ProductCard key={supplement.id} product={supplement} />
        ))}
      </div>

      {/* Mensagem quando não há produtos */}
      {filteredSupplements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 text-6xl mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Tente ajustar os filtros para ver mais resultados.
          </p>
        </div>
      )}
    </div>
  );
}