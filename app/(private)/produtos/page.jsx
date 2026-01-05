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
  { id: 1, name: "Whey Protein 100% Isolado 2kg", price: 25000, category: "protein", inStock: true, isBestSeller: true, isNew: false, rating: 4.8 },
  { id: 2, name: "Creatina Monohidratada 300g", price: 12000, category: "creatine", inStock: true, isBestSeller: true, isNew: true, rating: 4.5 },
  { id: 3, name: "Pré-Treino Explosive Energy", price: 18000, category: "pre-workout", inStock: true, isBestSeller: false, isNew: true, rating: 4.2 },
  { id: 4, name: "BCAA 2:1:1 300g em Pó", price: 15000, category: "bcaa", inStock: false, isBestSeller: false, isNew: false, rating: 4.0 },
  { id: 5, name: "Multivitamínico Completo 120 caps", price: 8000, category: "vitamins", inStock: true, isBestSeller: false, isNew: false, rating: 4.1 },
  { id: 6, name: "Mass Gainers 5kg - Hyper Caloric", price: 32000, category: "weight-gainer", inStock: true, isBestSeller: true, isNew: false, rating: 4.6 },
  { id: 7, name: "Fat Burner - Thermogenic", price: 22000, category: "fat-burner", inStock: true, isBestSeller: false, isNew: true, rating: 4.3 },
  { id: 8, name: "L-Glutamine 500g Pure", price: 14000, category: "amino-acids", inStock: true, isBestSeller: false, isNew: false, rating: 4.2 },
  { id: 9, name: "Whey Protein Concentrado 1kg", price: 15000, category: "protein", inStock: true, isBestSeller: true, isNew: false, rating: 4.7 },
];

export default function Produtos() {
  const router = useRouter();

  // Proteção de rota (opcional)
  /*
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "USER") {
      router.replace("/login");
    }
  }, [router]);
  */

  // Estados para filtros
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("name");

  // Filtra e ordena suplementos
  const filteredSupplements = useMemo(() => {
    let filtered = [...mockSupplements];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((supplement) =>
        selectedCategories.includes(supplement.category)
      );
    }

    filtered = filtered.filter(
      (supplement) =>
        supplement.price >= priceRange[0] && supplement.price <= priceRange[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "bestseller":
          return b.isBestSeller === a.isBestSeller ? 0 : b.isBestSeller ? -1 : 1;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategories, priceRange, sortBy]);

  // Funções de filtro
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
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

      <Footer />
    </div>
  );
}
