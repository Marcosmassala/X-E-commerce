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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Limpar tudo
          </button>
        </div>

        {/* Categorias */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Categorias</h4>
          <div className="space-y-3">
            {safeCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={safeSelectedCategories.includes(category.id)}
                  onChange={() => toggleCategory && toggleCategory(category.id)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-3 text-sm text-gray-700 flex justify-between w-full"
                >
                  <span>{category.name}</span>
                  <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Faixa de Preço */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Faixa de Preço</h4>
          <div className="px-2">
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
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">
                0 Kz
              </span>
              <span className="text-sm text-gray-600">
                {priceRange[1]?.toLocaleString('pt-AO') || '50.000'} Kz
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}