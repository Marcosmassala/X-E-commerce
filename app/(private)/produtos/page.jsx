"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import FilterSidebar from "../produtos/FiltroSidebar";
import ProductGrid from "../produtos/grid-produtos";
import Footer from "../../../components/Footer";

// Dados fixos fora do componente (seguro para build)
const categories = [
  { id: "protein", name: "Proteína", count: 8 },
  { id: "creatine", name: "Creatina", count: 6 },
  { id: "pre-workout", name: "Pré-Treino", count: 5 },
  { id: "bcaa", name: "BCAA", count: 4 },
  { id: "vitamins", name: "Vitaminas", count: 7 },
  { id: "weight-gainer", name: "Ganho de Peso", count: 3 },
  { id: "fat-burner", name: "Queimador de Gordura", count: 4 },
  { id: "amino-acids", name: "Aminoácidos", count: 3 },
];

const mockSupplements = [
  { 
    id: 1, 
    name: "Whey Protein 100% Isolado 2kg", 
    price: 25000, 
    originalPrice: 30000,
    category: "protein", 
    inStock: true, 
    isBestSeller: true, 
    isNew: false, 
    rating: 4.8,
    reviewCount: 125,
    features: ["100% Proteína Isolada", "5g BCAA por dose", "Baixo teor de lactose", "Sabor chocolate"]
  },
  { 
    id: 2, 
    name: "Creatina Monohidratada 300g", 
    price: 12000, 
    originalPrice: 12000,
    category: "creatine", 
    inStock: true, 
    isBestSeller: true, 
    isNew: true, 
    rating: 4.5,
    reviewCount: 89,
    features: ["Creatina Creapure®", "100% Pura", "Melhora performance", "Aumenta força"]
  },
  { 
    id: 3, 
    name: "Pré-Treino Explosive Energy", 
    price: 18000, 
    originalPrice: 22000,
    category: "pre-workout", 
    inStock: true, 
    isBestSeller: false, 
    isNew: true, 
    rating: 4.2,
    reviewCount: 67,
    features: ["Energia prolongada", "Foco mental", "Zero açúcar", "Sabor frutas vermelhas"]
  },
  { 
    id: 4, 
    name: "BCAA 2:1:1 300g em Pó", 
    price: 15000, 
    originalPrice: 18000,
    category: "bcaa", 
    inStock: false, 
    isBestSeller: false, 
    isNew: false, 
    rating: 4.0,
    reviewCount: 45,
    features: ["Razão 2:1:1 ideal", "Aminoácidos essenciais", "Recuperação muscular", "Sabor natural"]
  },
  { 
    id: 5, 
    name: "Multivitamínico Completo 120 caps", 
    price: 8000, 
    originalPrice: 10000,
    category: "vitamins", 
    inStock: true, 
    isBestSeller: false, 
    isNew: false, 
    rating: 4.1,
    reviewCount: 112,
    features: ["26 vitaminas e minerais", "Suporte imunológico", "Energia diária", "Sem glúten"]
  },
  { 
    id: 6, 
    name: "Mass Gainers 5kg - Hyper Caloric", 
    price: 32000, 
    originalPrice: 38000,
    category: "weight-gainer", 
    inStock: true, 
    isBestSeller: true, 
    isNew: false, 
    rating: 4.6,
    reviewCount: 78,
    features: ["1250 calorias por dose", "Proteína de alta qualidade", "Carboidratos complexos", "Sabor baunilha"]
  },
  { 
    id: 7, 
    name: "Fat Burner - Thermogenic", 
    price: 22000, 
    originalPrice: 26000,
    category: "fat-burner", 
    inStock: true, 
    isBestSeller: false, 
    isNew: true, 
    rating: 4.3,
    reviewCount: 56,
    features: ["Termogênico natural", "Controla apetite", "Acelera metabolismo", "Energia sem cafeína"]
  },
  { 
    id: 8, 
    name: "L-Glutamine 500g Pure", 
    price: 14000, 
    originalPrice: 16000,
    category: "amino-acids", 
    inStock: true, 
    isBestSeller: false, 
    isNew: false, 
    rating: 4.2,
    reviewCount: 34,
    features: ["Glutamina pura", "Recuperação muscular", "Suporte imunológico", "Sem sabor"]
  },
  { 
    id: 9, 
    name: "Whey Protein Concentrado 1kg", 
    price: 15000, 
    originalPrice: 19000,
    category: "protein", 
    inStock: true, 
    isBestSeller: true, 
    isNew: false, 
    rating: 4.7,
    reviewCount: 203,
    features: ["80% concentração", "Rico em BCAA", "Digestão fácil", "Sabor chocolate"]
  },
];

export default function Produtos() {
  const router = useRouter();

  // Estados para filtros
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("name");

  // Filtra e ordena suplementos COM VALIDAÇÃO
  const filteredSupplements = useMemo(() => {
    try {
      // Garante que estamos trabalhando com um array
      let filtered = Array.isArray(mockSupplements) ? [...mockSupplements] : [];
      
      // Filtro por categoria (apenas se houver categorias selecionadas)
      if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
        filtered = filtered.filter((supplement) =>
          selectedCategories.includes(supplement?.category)
        );
      }

      // Verifica priceRange
      const [minPrice, maxPrice] = Array.isArray(priceRange) ? priceRange : [0, 50000];
      
      // Filtro por faixa de preço
      filtered = filtered.filter((supplement) => {
        const price = supplement?.price || 0;
        return price >= minPrice && price <= maxPrice;
      });

      // Ordenação segura
      filtered.sort((a, b) => {
        const safeA = a || {};
        const safeB = b || {};
        
        switch (sortBy) {
          case "price-low":
            return (safeA.price || 0) - (safeB.price || 0);
          case "price-high":
            return (safeB.price || 0) - (safeA.price || 0);
          case "rating":
            return (safeB.rating || 0) - (safeA.rating || 0);
          case "bestseller":
            return safeB.isBestSeller === safeA.isBestSeller ? 0 : safeB.isBestSeller ? -1 : 1;
          case "name":
          default:
            return (safeA.name || "").localeCompare(safeB.name || "");
        }
      });

      return filtered;
    } catch (error) {
      console.error("Erro ao filtrar produtos:", error);
      return []; // Retorna array vazio em caso de erro
    }
  }, [selectedCategories, priceRange, sortBy]);

  // Funções de filtro
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.includes(categoryId)
        ? prevArray.filter((id) => id !== categoryId)
        : [...prevArray, categoryId];
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="flex flex-col lg:flex-row gap-8 ">
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

      <Footer />
    </div>
  );
}