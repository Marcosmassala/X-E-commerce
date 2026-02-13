"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Filter, X, ChevronDown, Menu } from "lucide-react";
import Pedidos from "./pedidos";
import Sidebar from "./sidebar";

const mockOrders = [
  { id: "ORD-001", date: "2024-01-15", productName: "Whey Protein Concentrado", price: 15000, status: "approved", customer: "João Silva", quantity: 2 },
  { id: "ORD-002", date: "2024-01-14", productName: "Creatina Monohidratada", price: 8000, status: "pending", customer: "Maria Santos", quantity: 1 },
  { id: "ORD-003", date: "2024-01-13", productName: "BCAA 2:1:1", price: 12000, status: "rejected", customer: "Pedro Costa", quantity: 3 },
  { id: "ORD-004", date: "2024-01-12", productName: "Proteína Isolada", price: 18000, status: "approved", customer: "Ana Oliveira", quantity: 1 },
  { id: "ORD-005", date: "2024-01-11", productName: "Glutamina", price: 9500, status: "approved", customer: "Carlos Lima", quantity: 2 },
  { id: "ORD-006", date: "2024-01-10", productName: "Pré-Treino", price: 11000, status: "pending", customer: "Sofia Pereira", quantity: 1 },
  { id: "ORD-007", date: "2024-01-09", productName: "Barra Proteica", price: 2500, status: "approved", customer: "Miguel Santos", quantity: 5 },
  { id: "ORD-008", date: "2024-01-08", productName: "Albumina", price: 7000, status: "rejected", customer: "Laura Costa", quantity: 2 }
];

export default function OrderHistory() {
  const router = useRouter();
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleViewDetails = (order) => {
    console.log("Visualizar detalhes do pedido:", order);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("");
    setShowMobileFilters(false);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Filtragem aplicada no pai
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesDate = !dateFilter || order.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Contador de filtros ativos
  const activeFiltersCount = [
    searchTerm ? 1 : 0,
    statusFilter !== "all" ? 1 : 0,
    dateFilter ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <header className="sticky top-0 z-30 bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between lg:hidden">
            <button
              onClick={() => {}}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white">Pedidos</h1>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <span className="bg-green-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
              <button
                onClick={toggleMobileFilters}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Filter size={20} />
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
              <div className="space-y-1 md:space-y-2">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  Histórico de Pedidos
                </h1>
                <p className="text-sm md:text-base text-gray-300">
                  Gerencie e visualize todos os pedidos de suplementos
                </p>
              </div>
              
              {/* Status Summary - Desktop */}
              {!isMobile && (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Aprovado</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-300">Pendente</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">Reprovado</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            {isMobile && (
              <button
                onClick={toggleMobileFilters}
                className="w-full flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  <span>Filtros</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <ChevronDown className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* Desktop Filters */}
            {!isMobile && (
              <div className="bg-gray-900 p-4 md:p-5 rounded-xl border border-gray-800 shadow-sm">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  {/* Search - Desktop */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Buscar por produto, cliente ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Status Filter - Desktop */}
                  <div className="w-full md:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2.5 md:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white"
                    >
                      <option value="all">Todos os status</option>
                      <option value="approved">Aprovado</option>
                      <option value="pending">Pendente</option>
                      <option value="rejected">Reprovado</option>
                    </select>
                  </div>

                  {/* Date Filter - Desktop */}
                  <div className="w-full md:w-48">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white"
                      />
                    </div>
                  </div>

                  {/* Clear Filters - Desktop */}
                  {(searchTerm || statusFilter !== "all" || dateFilter) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2.5 md:py-3 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      Limpar Filtros
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Filters Panel */}
            {isMobile && showMobileFilters && (
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-4 animate-slideDown">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">Filtros</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 hover:bg-gray-800 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Search - Mobile */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Produto, cliente ou ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                    />
                  </div>
                </div>

                {/* Status Filter - Mobile */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                  >
                    <option value="all">Todos os status</option>
                    <option value="approved">Aprovado</option>
                    <option value="pending">Pendente</option>
                    <option value="rejected">Reprovado</option>
                  </select>
                </div>

                {/* Date Filter - Mobile */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Data</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                    />
                  </div>
                </div>

                {/* Action Buttons - Mobile */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-3 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-4 py-3 bg-green-500 text-black font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}

            {/* Status Summary - Mobile */}
            {isMobile && !showMobileFilters && activeFiltersCount > 0 && (
              <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-300">Filtros ativos:</span>
                  <span className="text-white font-medium">{activeFiltersCount}</span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-400 hover:text-green-300"
                >
                  Limpar todos
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="text-sm md:text-base">
                <span className="text-gray-400">Mostrando </span>
                <span className="text-white font-semibold">{filteredOrders.length}</span>
                <span className="text-gray-400"> de </span>
                <span className="text-white font-semibold">{orders.length}</span>
                <span className="text-gray-400"> pedidos</span>
              </div>
              
              {!isMobile && (
                <div className="text-sm text-gray-400">
                  <span className="text-green-400 font-semibold">
                    {new Intl.NumberFormat('pt-AO', {
                      style: 'currency',
                      currency: 'AOA',
                      minimumFractionDigits: 0
                    }).format(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
                  </span>
                  <span> em vendas</span>
                </div>
              )}
            </div>

            {/* Tabela de Pedidos */}
            <Pedidos
              orders={filteredOrders}
              onViewDetails={handleViewDetails}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              dateFilter={dateFilter}
            />

            {/* Mobile Summary */}
            {isMobile && filteredOrders.length > 0 && (
              <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-4 -mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Total em vendas</div>
                    <div className="text-lg font-bold text-green-400">
                      {new Intl.NumberFormat('pt-AO', {
                        style: 'currency',
                        currency: 'AOA',
                        minimumFractionDigits: 0
                      }).format(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Pedidos</div>
                    <div className="text-lg font-bold text-white">{filteredOrders.length}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Ajuste para sidebar em mobile */
        @media (max-width: 767px) {
          :global(.sidebar-container) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}