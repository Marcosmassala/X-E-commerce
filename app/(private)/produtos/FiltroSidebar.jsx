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
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 sticky top-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Filtros</h2> 
          <button
            onClick={clearFilters}
            className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors duration-200" 
          >
            Limpar tudo
          </button>
        </div>

        {/* Filtro por Categoria */}
        <div className="mb-8">
          <h3 className="font-medium text-white mb-4">Categorias</h3> 
          <div className="space-y-3">
            {categories.map(category => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="rounded border-gray-700 text-green-500 focus:ring-green-500 bg-gray-800"
                />
                <span className="ml-3 text-sm text-gray-300 flex-1"> 
                  {category.name}
                </span>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full"> 
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro por Preço */}
        <div className="mb-8">
          <h3 className="font-medium text-white mb-4">Faixa de Preço (Kz)</h3> 
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-400"> 
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
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:w-5 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-green-500 
                [&::-moz-range-thumb]:h-5 
                [&::-moz-range-thumb]:w-5 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-green-500 
                [&::-moz-range-thumb]:border-0"
            />
          </div>
        </div>

        {/* Filtro por Disponibilidade */}
        <div>
          <h3 className="font-medium text-white mb-4">Disponibilidade</h3> 
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-700 text-green-500 focus:ring-green-500 bg-gray-800" 
              defaultChecked
            />
            <span className="ml-3 text-sm text-gray-300"> 
              Mostrar apenas em stock
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}