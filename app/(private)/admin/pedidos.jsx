'use client';

import { Eye, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// ===== COMPONENTES RESPONSIVOS DEFINIDOS FORA =====

// Layout para Desktop Grande (≥ 1280px)
const DesktopLargeView = ({ filteredOrders, formatDate, getStatusBadge, formatCurrency, onViewDetails }) => (
  <table className="w-full hidden xl:table">
    <thead className="bg-gray-900 border-b border-gray-800">
      <tr>
        {['ID', 'Data', 'Cliente', 'Produto', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Status', 'Ações'].map((header) => (
          <th 
            key={header} 
            className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-black divide-y divide-gray-800">
      {filteredOrders.map((order) => (
        <tr key={order.id} className="hover:bg-gray-900/50 transition-colors duration-200">
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm font-mono text-white">{order.id}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-300">{formatDate(order.date)}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm text-gray-300 line-clamp-1">{order.customer}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-medium text-white line-clamp-2 max-w-[200px]">{order.productName}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-300">{order.quantity}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-400">
              {formatCurrency(order.price)}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm font-semibold text-green-400">
              {formatCurrency(order.price * order.quantity)}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {getStatusBadge(order.status)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button 
              onClick={() => onViewDetails && onViewDetails(order)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200 w-full sm:w-auto"
            >
              <Eye size={16} />
              <span>Detalhes</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Layout para Desktop (≥ 1024px)
const DesktopView = ({ filteredOrders, formatDate, getStatusBadge, formatCurrency, onViewDetails }) => (
  <table className="w-full hidden lg:table xl:hidden">
    <thead className="bg-gray-900 border-b border-gray-800">
      <tr>
        {['ID', 'Data', 'Cliente', 'Produto', 'Qtd', 'Valor Total', 'Status', 'Ações'].map((header) => (
          <th 
            key={header} 
            className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-black divide-y divide-gray-800">
      {filteredOrders.map((order) => (
        <tr key={order.id} className="hover:bg-gray-900/50 transition-colors duration-200">
          <td className="px-4 py-3 whitespace-nowrap">
            <span className="text-sm font-mono text-white">{order.id}</span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <span className="text-sm text-gray-300">{formatDate(order.date)}</span>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm text-gray-300 line-clamp-1">{order.customer}</span>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm font-medium text-white line-clamp-2">{order.productName}</span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <span className="text-sm text-gray-300">{order.quantity}</span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <span className="text-sm font-semibold text-green-400">
              {formatCurrency(order.price * order.quantity)}
            </span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            {getStatusBadge(order.status)}
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <button 
              onClick={() => onViewDetails && onViewDetails(order)}
              className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200"
            >
              <Eye size={14} />
              <span>Ver</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Layout para Tablet (≥ 768px)
const TabletView = ({ filteredOrders, formatDate, getStatusBadge, formatCurrency, onViewDetails }) => (
  <div className="hidden md:block lg:hidden">
    <div className="grid grid-cols-1 gap-3 p-3">
      {filteredOrders.map((order) => (
        <div key={order.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:bg-gray-900 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            {/* Coluna esquerda */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white line-clamp-2">{order.productName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">ID: {order.id}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-400">{formatDate(order.date)}</span>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cliente</p>
                  <p className="text-sm text-gray-300 line-clamp-1">{order.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Quantidade</p>
                  <p className="text-sm text-gray-300">{order.quantity}</p>
                </div>
              </div>
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col items-end justify-between min-w-[120px]">
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Valor Total</p>
                <p className="text-lg font-bold text-green-400">
                  {formatCurrency(order.price * order.quantity)}
                </p>
              </div>
              <button 
                onClick={() => onViewDetails && onViewDetails(order)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-all duration-200 w-full"
              >
                <Eye size={14} />
                <span>Detalhes</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Layout para Mobile (< 768px)
const MobileView = ({ 
  filteredOrders, 
  formatDate, 
  getStatusBadge, 
  formatCurrency, 
  onViewDetails,
  expandedOrder,
  toggleExpand 
}) => (
  <div className="md:hidden">
    <div className="divide-y divide-gray-800">
      {filteredOrders.map((order) => (
        <div 
          key={order.id} 
          className={`p-4 hover:bg-gray-900/50 transition-all duration-200 ${expandedOrder === order.id ? 'bg-gray-900/80' : ''}`}
          onClick={() => toggleExpand(order.id)}
        >
          {/* Cabeçalho do Card */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white truncate flex-1">{order.productName}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(order.id);
                  }}
                  className="flex-shrink-0 text-gray-400 hover:text-white"
                >
                  {expandedOrder === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <span className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded">
                  {order.id}
                </span>
                <span className="text-xs text-gray-500">{formatDate(order.date)}</span>
              </div>
            </div>
          </div>
          
          {/* Informações Principais */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Cliente</p>
              <p className="text-sm text-gray-300 truncate">{order.customer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              {getStatusBadge(order.status)}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Quantidade</p>
              <p className="text-sm text-gray-300">{order.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Valor Total</p>
              <p className="text-sm font-semibold text-green-400">
                {formatCurrency(order.price * order.quantity)}
              </p>
            </div>
          </div>

          {/* Detalhes Expandidos */}
          {expandedOrder === order.id && (
            <div className="mt-3 pt-3 border-t border-gray-800 animate-slideDown space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Preço Unitário</p>
                  <p className="text-sm font-medium text-gray-300">
                    {formatCurrency(order.price)}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                  <p className="text-sm font-bold text-white">
                    {formatCurrency(order.price * order.quantity)}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails && onViewDetails(order);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-200"
              >
                <Eye size={16} />
                Ver Detalhes Completos
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ===== COMPONENTE PRINCIPAL =====
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
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.color}`}>
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
      <div className="p-4 sm:p-6 border-b border-gray-800 bg-gray-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Pedidos</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
            </p>
          </div>
          {filteredOrders.length > 0 && (
            <div className="text-sm sm:text-base text-gray-300 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
              Total Geral: <span className="text-green-400 font-semibold">
                {formatCurrency(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="overflow-hidden">
        <DesktopLargeView 
          filteredOrders={filteredOrders}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          formatCurrency={formatCurrency}
          onViewDetails={onViewDetails}
        />
        <DesktopView 
          filteredOrders={filteredOrders}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          formatCurrency={formatCurrency}
          onViewDetails={onViewDetails}
        />
        <TabletView 
          filteredOrders={filteredOrders}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          formatCurrency={formatCurrency}
          onViewDetails={onViewDetails}
        />
        <MobileView 
          filteredOrders={filteredOrders}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          formatCurrency={formatCurrency}
          onViewDetails={onViewDetails}
          expandedOrder={expandedOrder}
          toggleExpand={toggleExpand}
        />
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 rounded-full mb-4">
            <Search size={24} className="sm:size-28 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Nenhum pedido encontrado</h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
            Tente ajustar os filtros de busca ou verificar se há novos pedidos
          </p>
        </div>
      )}

      {/* Footer Responsivo */}
      {filteredOrders.length > 0 && (
        <div className="border-t border-gray-800 bg-gray-900">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
              <div className="text-gray-400 mb-2 sm:mb-0 text-center sm:text-left">
                Mostrando <span className="text-white font-semibold">{filteredOrders.length}</span> de{' '}
                <span className="text-white font-semibold">{orders.length}</span> pedidos
              </div>
              <div className="text-gray-400 text-center sm:text-right">
                Valor Total: <span className="text-green-400 font-bold">
                  {formatCurrency(filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #111;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}