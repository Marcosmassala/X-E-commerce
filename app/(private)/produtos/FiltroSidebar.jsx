// components/Supplements/FilterSidebar.js
"use client";

export default function FilterSidebar({ 
  categories, 
  selectedCategories, 
  toggleCategory, 
  priceRange, 
  setPriceRange, 
  clearFilters 
}) {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            Limpar tudo
          </button>
        </div>

        {/* Filtro por Categoria */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-900 mb-4">Categorias</h3>
          <div className="space-y-3">
            {categories.map(category => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700 flex-1">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Preço */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-900 mb-4">Faixa de Preço (Kz)</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Kz {priceRange[0].toLocaleString('pt-AO')}</span>
              <span>Kz {priceRange[1].toLocaleString('pt-AO')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
            />
          </div>
        </div>

        {/* Filtro por Disponibilidade */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Disponibilidade</h3>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              defaultChecked
            />
            <span className="ml-3 text-sm text-gray-700">
              Mostrar apenas em stock
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}