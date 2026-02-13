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
  
  const formatKz = (value) => {
    return value.toLocaleString('pt-AO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }) + ' Kz';
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-6 shadow-lg">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">
            <span className="text-green-400">F</span>ILTROS
          </h3>
          <button
            onClick={clearFilters}
            className="text-sm text-green-400 hover:text-green-300 font-medium 
              transition-colors duration-200 flex items-center gap-1 group"
          >
            <span className="group-hover:scale-110 transition-transform">↺</span>
            Limpar tudo
          </button>
        </div>

        {/* Categorias */}
        <div className="mb-10">
          <h4 className="font-bold text-lg text-white mb-5 pb-2 border-b border-gray-800">
            <span className="text-green-400">C</span>ATEGORIAS
          </h4>
          <div className="space-y-4">
            {safeCategories.map((category) => {
              const isSelected = safeSelectedCategories.includes(category.id);
              return (
                <div key={category.id} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={isSelected}
                      onChange={() => toggleCategory && toggleCategory(category.id)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md 
                        border-2 border-gray-700 bg-gray-800 
                        checked:border-green-500 checked:bg-green-500 
                        transition-all duration-200 
                        hover:border-green-400 hover:shadow-sm 
                        focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none
                        group-hover:border-green-400"
                    />
                    <svg
                      className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 fill-white opacity-0 
                        peer-checked:opacity-100 transition-opacity duration-200"
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
                    className="ml-3 text-sm flex justify-between w-full cursor-pointer"
                  >
                    <span className={`font-medium transition-colors duration-200
                      ${isSelected ? 'text-green-400' : 'text-gray-300 group-hover:text-green-300'}`}>
                      {category.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-200
                      ${isSelected 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-800 text-gray-500 group-hover:bg-green-500/10 group-hover:text-green-400'}`}>
                      {category.count}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faixa de Preço */}
        <div className="mb-6">
          <h4 className="font-bold text-lg text-white mb-5 pb-2 border-b border-gray-800">
            <span className="text-green-400">P</span>REÇO
          </h4>
          <div className="px-2">
            <div className="relative w-full mb-8">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800 rounded-full -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-green-500 to-emerald-600 
                  rounded-full -translate-y-1/2"
                style={{ width: `${((priceRange[1] || 50000) / 50000) * 100}%` }}
              ></div>
              
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
                  relative z-10
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-6 
                  [&::-webkit-slider-thumb]:w-6 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:border-3 
                  [&::-webkit-slider-thumb]:border-emerald-500 
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-green-500/30
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:h-6 
                  [&::-moz-range-thumb]:w-6 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-white 
                  [&::-moz-range-thumb]:border-3 
                  [&::-moz-range-thumb]:border-emerald-500 
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
            
            <div className="flex justify-between items-center mt-10">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Mínimo</div>
                <div className="text-green-400 font-bold">{formatKz(priceRange[0] || 0)}</div>
              </div>
              
              <div className="h-8 w-px bg-gray-800"></div>
              
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Máximo</div>
                <div className="text-green-400 font-bold text-lg">
                  {formatKz(priceRange[1] || 50000)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status dos filtros ativos */}
        {safeSelectedCategories.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">
                {safeSelectedCategories.length} filtro(s) ativo(s)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {safeCategories
                .filter(cat => safeSelectedCategories.includes(cat.id))
                .map(cat => (
                  <span 
                    key={cat.id}
                    className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full 
                      border border-green-500/20 flex items-center gap-1"
                  >
                    {cat.name}
                    <button
                      onClick={() => toggleCategory && toggleCategory(cat.id)}
                      className="hover:text-white transition-colors ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}