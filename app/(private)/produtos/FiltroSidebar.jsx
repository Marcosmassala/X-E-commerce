"use client";

export default function FilterSidebar({
  categories = [],
  selectedCategories = [],
  toggleCategory,
  priceRange = [0, 50000],
  setPriceRange,
  clearFilters
}) {
  // Validação de dados
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeSelectedCategories = Array.isArray(selectedCategories) ? selectedCategories : [];
  
  return (
    <div className="lg:w-1/4">
      <div className="bg-gray-900 rounded-lg p-6 sticky top-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Limpar tudo
          </button>
        </div>

        {/* Categorias */}
        <div className="mb-8">
          <h4 className="font-medium text-white mb-4">Categorias</h4>
          <div className="space-y-3">
            {safeCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={safeSelectedCategories.includes(category.id)}
                    onChange={() => toggleCategory && toggleCategory(category.id)}
                    className="textw peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 checked:border-green-500 checked:bg-green-500 transition-all duration-200 hover:border-green-400 hover:shadow-sm focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 focus:outline-none"
                  />
                  <svg
                    className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 fill-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-3 text-sm text-white flex justify-between w-full"
                >
                  <span className="text-white">{category.name}</span>
                  {/* Alterado para text-white */}
                  <span className="text-white font-medium ml-2">
                    ({category.count})
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Faixa de Preço */}
        <div className="mb-8">
          <h4 className="font-medium text-white mb-4">Faixa de Preço</h4>
          <div className="px-2">
            <div className="relative w-full">
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange[1] || 50000}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value);
                  setPriceRange && setPriceRange([priceRange[0] || 0, newMax]);
                }}
                className="w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-3 
                         [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:shadow-lg
                         [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                         [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-emerald-500 
                         [&::-moz-range-thumb]:shadow-lg relative z-10"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((priceRange[1] || 50000) / 50000) * 100}%, #e5e7eb ${((priceRange[1] || 50000) / 50000) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {/* Alterados para text-white */}
              <span className="text-sm text-white">
                0 Kz
              </span>
              <span className="text-sm text-white">
                {priceRange[1]?.toLocaleString('pt-AO') || '50.000'} Kz
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}