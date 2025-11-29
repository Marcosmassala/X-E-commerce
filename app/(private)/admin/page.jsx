"use client";

import { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';
import Estatisticas from './estatisticas';
import Pedidos from './pedidos';
import Sidebar from './sidebar'; 
import Navbar from '@/components/Navbar';   

// Dados mockados com produtos proteicos em KZ
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    productName: 'Whey Protein Concentrado',
    price: 15000,
    status: 'approved',
    customer: 'João Silva',
    quantity: 2
  },
  {
    id: 'ORD-002', 
    date: '2024-01-14',
    productName: 'Creatina Monohidratada',
    price: 8000,
    status: 'pending',
    customer: 'Maria Santos',
    quantity: 1
  },
  {
    id: 'ORD-003',
    date: '2024-01-13',
    productName: 'BCAA 2:1:1',
    price: 12000,
    status: 'rejected',
    customer: 'Pedro Costa',
    quantity: 3
  },
  {
    id: 'ORD-004',
    date: '2024-01-12',
    productName: 'Proteína Isolada',
    price: 18000,
    status: 'approved',
    customer: 'Ana Oliveira',
    quantity: 1
  },
  {
    id: 'ORD-005',
    date: '2024-01-11',
    productName: 'Glutamina',
    price: 9500,
    status: 'approved',
    customer: 'Carlos Lima',
    quantity: 2
  },
  {
    id: 'ORD-006',
    date: '2024-01-10',
    productName: 'Pré-Treino',
    price: 11000,
    status: 'pending',
    customer: 'Sofia Pereira',
    quantity: 1
  },
  {
    id: 'ORD-007',
    date: '2024-01-09',
    productName: 'Barra Proteica',
    price: 2500,
    status: 'approved',
    customer: 'Miguel Santos',
    quantity: 5
  },
  {
    id: 'ORD-008',
    date: '2024-01-08',
    productName: 'Albumina',
    price: 7000,
    status: 'rejected',
    customer: 'Laura Costa',
    quantity: 2
  }
];

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    // Simulando carregamento de dados
    setOrders(mockOrders);
  }, []);

  const handleViewDetails = (order) => {
    console.log('Visualizar detalhes do pedido:', order);
    // Aqui você pode abrir um modal ou navegar para detalhes
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-black">Histórico de Pedidos</h1>
                <p className="text-gray-600">Gerencie e visualize todos os pedidos de suplementos</p>
              </div>
              {/* Botão de exportar removido */}
            </div>

            {/* Estatísticas */}
            <Estatisticas orders={orders} />

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar por produto, cliente ou ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">Todos os status</option>
                  <option value="approved">Aprovado</option>
                  <option value="pending">Pendente</option>
                  <option value="rejected">Reprovado</option>
                </select>

                {/* Date Filter */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Clear Filters */}
                {(searchTerm || statusFilter !== 'all' || dateFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* Tabela de Pedidos */}
            <Pedidos
              orders={orders}
              onViewDetails={handleViewDetails}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              dateFilter={dateFilter}
            />
          </div>
        </main>
      </div>
    </div>
  );
}