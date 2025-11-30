
"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import FilterSidebar from '../produtos/FiltroSidebar';
import ProductGrid from '../produtos/grid-produtos';

export default function Produtos() {
  const [supplements, setSupplements] = useState([]);
  const [filteredSupplements, setFilteredSupplements] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('name');

  // Categorias disponíveis
  const categories = [
    { id: 'protein', name: 'Proteína', count: 8 },
    { id: 'creatine', name: 'Creatina', count: 6 },
    { id: 'pre-workout', name: 'Pré-Treino', count: 5 },
    { id: 'bcaa', name: 'BCAA', count: 4 },
    { id: 'vitamins', name: 'Vitaminas', count: 7 },
    { id: 'weight-gainer', name: 'Ganho de Peso', count: 3 },
    { id: 'fat-burner', name: 'Queimador de Gordura', count: 4 },
    { id: 'amino-acids', name: 'Aminoácidos', count: 3 }
  ];

  
  const mockSupplements = [
    {
      id: 1,
      name: 'Whey Protein 100% Isolado 2kg',
      brand: 'Optimum Nutrition',
      price: 25000,
      originalPrice: 30000,
      rating: 4.8,
      reviewCount: 347,
      category: 'protein',
      inStock: true,
      isBestSeller: true,
      isNew: false,
      features: ['24g de Proteína por dose', 'Baixo em Lactose', 'Sabor Chocolate']
    },
    {
      id: 2,
      name: 'Creatina Monohidratada 300g',
      brand: 'Growth Supplements',
      price: 12000,
      originalPrice: 15000,
      rating: 4.7,
      reviewCount: 289,
      category: 'creatine',
      inStock: true,
      isBestSeller: true,
      isNew: true,
      features: ['100% Pura Creapure®', 'Melhor Absorção', 'Sem Aditivos']
    },
    {
      id: 3,
      name: 'Pré-Treino Explosive Energy',
      brand: 'Integral Médica',
      price: 18000,
      originalPrice: 22000,
      rating: 4.5,
      reviewCount: 156,
      category: 'pre-workout',
      inStock: true,
      isBestSeller: false,
      isNew: true,
      features: ['Cafeína 300mg', 'Beta-Alanina', 'Foco Mental']
    },
    {
      id: 4,
      name: 'BCAA 2:1:1 300g em Pó',
      brand: 'Max Titanium',
      price: 15000,
      originalPrice: 18000,
      rating: 4.6,
      reviewCount: 203,
      category: 'bcaa',
      inStock: false,
      isBestSeller: false,
      isNew: false,
      features: ['Recuperação Muscular', 'Sabor Limão', 'Zero Açúcar']
    },
    {
      id: 5,
      name: 'Multivitamínico Completo 120 caps',
      brand: 'Nature\'s Bounty',
      price: 8000,
      originalPrice: 10000,
      rating: 4.4,
      reviewCount: 178,
      category: 'vitamins',
      inStock: true,
      isBestSeller: false,
      isNew: false,
      features: ['25 Vitaminas Essenciais', 'Minerais', 'Antioxidantes']
    },
    {
      id: 6,
      name: 'Mass Gainers 5kg - Hyper Caloric',
      brand: 'Probiotica',
      price: 32000,
      originalPrice: 38000,
      rating: 4.3,
      reviewCount: 94,
      category: 'weight-gainer',
      inStock: true,
      isBestSeller: true,
      isNew: false,
      features: ['650kcal por dose', '50g Proteína', 'Carboidratos Complexos']
    },
    {
      id: 7,
      name: 'Fat Burner - Thermogenic',
      brand: 'Universal Nutrition',
      price: 22000,
      originalPrice: 26000,
      rating: 4.2,
      reviewCount: 167,
      category: 'fat-burner',
      inStock: true,
      isBestSeller: false,
      isNew: true,
      features: ['Termogênico Natural', 'Controle de Apetite', 'Energia']
    },
    {
      id: 8,
      name: 'L-Glutamine 500g Pure',
      brand: 'Dux Nutrition',
      price: 14000,
      originalPrice: 17000,
      rating: 4.5,
      reviewCount: 132,
      category: 'amino-acids',
      inStock: true,
      isBestSeller: false,
      isNew: false,
      features: ['Recuperação Muscular', 'Sistema Imunológico', '100% Puro']
    },
    {
      id: 9,
      name: 'Whey Protein Concentrado 1kg',
      brand: 'Probiotica',
      price: 15000,
      originalPrice: 18000,
      rating: 4.4,
      reviewCount: 215,
      category: 'protein',
      inStock: true,
      isBestSeller: true,
      isNew: false,
      features: ['22g Proteína', 'Multi Sabores', 'Alta Qualidade']
    }
  ];

  // Inicializar dados
  useEffect(() => {
    setSupplements(mockSupplements);
    setFilteredSupplements(mockSupplements);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = supplements;

    // Filtro por categoria
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(supplement => 
        selectedCategories.includes(supplement.category)
      );
    }

    // Filtro por preço
    filtered = filtered.filter(supplement => 
      supplement.price >= priceRange[0] && supplement.price <= priceRange[1]
    );

    // Ordenação
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'bestseller':
          return (b.isBestSeller === a.isBestSeller) ? 0 : b.isBestSeller ? 1 : -1;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredSupplements(filtered);
  }, [selectedCategories, priceRange, sortBy, supplements]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header da Página */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Suplementos Desportivos</h1>
            <p className="text-xl text-green-400">
              Melhores marcas internacionais com entrega em toda Angola
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            clearFilters={clearFilters}
          />
          
          <ProductGrid
            filteredSupplements={filteredSupplements}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>
    </div>
  );
}