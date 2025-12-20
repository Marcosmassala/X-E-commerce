'use client';

import { Eye, Search } from 'lucide-react';
import { useState } from 'react';

export default function Pedidos({ 
  orders = [], 
  onViewDetails,
  searchTerm = '',
  statusFilter = 'all',
  dateFilter = ''
}) {
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { label: 'Aprovado', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
      pending: { label: 'Pendente', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
      rejected: { label: 'Reprovado', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
      shipped: { label: 'Enviado', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
      delivered: { label: 'Entregue', color: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 md:px-3 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = !dateFilter || order.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-black border border-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header Responsivo */}
      <div className="p-3 sm:p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Pedidos</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
            </p>
          </div>
          {filteredOrders.length > 0 && (
            <div className="text-xs sm:text-sm text-gray-300 bg-gray-800 px-3 py-1.5 rounded-lg">
              Total: <span className="text-green-400 font-semibold">
                {formatCurrency(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Tabela para Desktop/Large Tablets (≥ 1024px) */}
        <table className="w-full hidden lg:table">
          <thead className="bg-gray-900 border-b border-gray-800">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Data
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Qtd
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-800">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-900/50 transition-colors duration-200">
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-medium text-white">{order.id}</span>
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-gray-300">{formatDate(order.date)}</span>
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-gray-300">{order.customer}</span>
                </td>
                <td className="px-4 lg:px-6 py-3">
                  <span className="text-xs sm:text-sm font-medium text-white">{order.productName}</span>
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-gray-300">{order.quantity}</span>
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-semibold text-green-400">
                    {formatCurrency(order.price * order.quantity)}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
                  <button 
                    onClick={() => onViewDetails && onViewDetails(order)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200"
                  >
                    <Eye size={14} className="sm:size-4" />
                    <span className="hidden sm:inline">Detalhes</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabela Compacta para Tablets (768px - 1023px) */}
        <table className="w-full hidden md:table lg:hidden">
          <thead className="bg-gray-900 border-b border-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                ID
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                Cliente
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                Produto
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                Valor
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                Status
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-800">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-900/50 transition-colors duration-200">
                <td className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">{order.id}</span>
                    <span className="text-xs text-gray-400">{formatDate(order.date)}</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="text-xs text-gray-300 line-clamp-1">{order.customer}</span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white line-clamp-1">{order.productName}</span>
                    <span className="text-xs text-gray-400">Qtd: {order.quantity}</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="text-xs font-semibold text-green-400">
                    {formatCurrency(order.price * order.quantity)}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-3 py-2">
                  <button 
                    onClick={() => onViewDetails && onViewDetails(order)}
                    className="flex items-center justify-center gap-1 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200"
                  >
                    <Eye size={12} />
                    <span>Ver</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cards Interativos para Mobile/Tablet Pequeno (≤ 767px) */}
        <div className="md:hidden divide-y divide-gray-800">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className={`p-3 hover:bg-gray-900/50 transition-all duration-200 ${expandedOrder === order.id ? 'bg-gray-900/80' : ''}`}
              onClick={() => toggleExpand(order.id)}
            >
              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-white truncate">{order.productName}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>ID: {order.id}</span>
                    <span>•</span>
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails && onViewDetails(order);
                  }}
                  className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200"
                >
                  <Eye size={12} />
                </button>
              </div>
              
              {/* Informações Principais */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Cliente</p>
                  <p className="text-sm text-gray-300 truncate">{order.customer}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Quantidade</p>
                  <p className="text-sm text-gray-300">{order.quantity}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2 col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Valor Total</p>
                  <p className="text-sm font-semibold text-green-400">
                    {formatCurrency(order.price * order.quantity)}
                  </p>
                </div>
              </div>

              {/* Detalhes Expandidos */}
              {expandedOrder === order.id && (
                <div className="mt-3 pt-3 border-t border-gray-800 animate-slideDown">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Preço Unitário:</span>
                      <span className="text-xs text-gray-300">{formatCurrency(order.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Subtotal:</span>
                      <span className="text-xs font-medium text-white">
                        {formatCurrency(order.price * order.quantity)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Status Detalhado:</span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails && onViewDetails(order);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200"
                    >
                      <Eye size={12} />
                      Ver Detalhes Completos
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 rounded-full mb-4">
              <Search size={20} className="sm:size-28 text-gray-400" />
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-white mb-2">Nenhum pedido encontrado</h3>
          <p className="text-sm text-gray-400 px-4">Tente ajustar os filtros de busca</p>
        </div>
      )}

      {/* Footer com informações para Desktop/Tablet */}
      {filteredOrders.length > 0 && (
        <div className="hidden md:block border-t border-gray-800 bg-gray-900 px-4 lg:px-6 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
            <div className="text-gray-400 mb-2 sm:mb-0">
              Mostrando <span className="text-white font-medium">{filteredOrders.length}</span> de{' '}
              <span className="text-white font-medium">{orders.length}</span> pedidos
            </div>
            <div className="text-gray-400">
              Total Geral: <span className="text-green-400 font-semibold">
                {formatCurrency(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer para Mobile */}
      {filteredOrders.length > 0 && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 p-3">
          <div className="text-center text-xs text-gray-400">
            <span className="text-white font-medium">{filteredOrders.length}</span> pedidos •{' '}
            <span className="text-green-400 font-semibold">
              {formatCurrency(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
            </span>
          </div>
        </div>
      )}

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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}