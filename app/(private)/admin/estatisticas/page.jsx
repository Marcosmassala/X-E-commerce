'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Truck,
  Repeat,
  Star,
  TrendingDown
} from 'lucide-react';

export default function EstatisticasPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular loading de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dados de exemplo
  const statsData = {
    overview: {
      totalRevenue: 2548000,
      totalOrders: 342,
      averageOrderValue: 7450,
      conversionRate: 3.2,
      revenueChange: 12.5,
      ordersChange: 8.3,
      avgOrderChange: 5.7,
      conversionChange: 1.2
    },
    categories: [
      { name: 'Proteínas', value: 42, color: 'bg-green-500' },
      { name: 'Creatina', value: 23, color: 'bg-blue-500' },
      { name: 'Pré-treino', value: 18, color: 'bg-purple-500' },
      { name: 'Vitaminas', value: 12, color: 'bg-yellow-500' },
      { name: 'Outros', value: 5, color: 'bg-gray-500' }
    ],
    topProducts: [
      { name: 'Whey Protein 2kg', sales: 128, revenue: 960000 },
      { name: 'Creatina 300g', sales: 86, revenue: 516000 },
      { name: 'Pré-treino 300g', sales: 64, revenue: 384000 },
      { name: 'BCAA 300g', sales: 45, revenue: 315000 },
      { name: 'Glutamina 300g', sales: 32, revenue: 192000 }
    ],
    recentOrders: [
      { id: '#00123', customer: 'João Silva', amount: 24500, status: 'completed', time: '2h atrás' },
      { id: '#00122', customer: 'Maria Santos', amount: 18900, status: 'processing', time: '4h atrás' },
      { id: '#00121', customer: 'Carlos Lima', amount: 32400, status: 'completed', time: '5h atrás' },
      { id: '#00120', customer: 'Ana Costa', amount: 15600, status: 'pending', time: '6h atrás' },
      { id: '#00119', customer: 'Pedro Alves', amount: 28700, status: 'completed', time: '8h atrás' }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 1850000 },
      { month: 'Fev', revenue: 2100000 },
      { month: 'Mar', revenue: 1950000 },
      { month: 'Abr', revenue: 2300000 },
      { month: 'Mai', revenue: 2450000 },
      { month: 'Jun', revenue: 2548000 }
    ]
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType, loading }) => (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl font-bold text-white">
              {title.includes('Kz') ? `Kz ${(value / 1000).toFixed(0)}K` : value}
            </h3>
          )}
        </div>
        <div className="p-2 bg-green-500/10 rounded-lg">
          <Icon className="h-5 w-5 text-green-400" />
        </div>
      </div>
      {!loading && change && (
        <div className="flex items-center">
          {changeType === 'increase' ? (
            <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
          )}
          <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
            {change}%
          </span>
          <span className="text-gray-500 text-sm ml-2">desde o último mês</span>
        </div>
      )}
    </div>
  );

  const TimeFilterButton = ({ label, value, active }) => (
    <button
      onClick={() => setTimeRange(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-green-500 text-black'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Estatísticas do E-commerce</h1>
                  <p className="text-gray-400 mt-1">Métricas e análises detalhadas do GymShop Angola</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Selecionar Período</span>
              </button>
              <button className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>

          {/* Time Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TimeFilterButton label="Hoje" value="today" active={timeRange === 'today'} />
            <TimeFilterButton label="7 dias" value="week" active={timeRange === 'week'} />
            <TimeFilterButton label="Mês" value="month" active={timeRange === 'month'} />
            <TimeFilterButton label="Trimestre" value="quarter" active={timeRange === 'quarter'} />
            <TimeFilterButton label="Ano" value="year" active={timeRange === 'year'} />
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Receita Total"
            value={statsData.overview.totalRevenue}
            icon={DollarSign}
            change={statsData.overview.revenueChange}
            changeType="increase"
            loading={isLoading}
          />
          <StatCard
            title="Total de Pedidos"
            value={statsData.overview.totalOrders}
            icon={ShoppingCart}
            change={statsData.overview.ordersChange}
            changeType="increase"
            loading={isLoading}
          />
          <StatCard
            title="Ticket Médio"
            value={`Kz ${statsData.overview.averageOrderValue.toLocaleString()}`}
            icon={CreditCard}
            change={statsData.overview.avgOrderChange}
            changeType="increase"
            loading={isLoading}
          />
          <StatCard
            title="Taxa de Conversão"
            value={`${statsData.overview.conversionRate}%`}
            icon={TrendingUp}
            change={statsData.overview.conversionChange}
            changeType="increase"
            loading={isLoading}
          />
        </div>

        {/* Charts and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Receita Mensal</h3>
                <p className="text-gray-400 text-sm">Evolução da receita nos últimos 6 meses</p>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+12.5% este mês</span>
              </div>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="h-full w-full bg-gray-800 rounded animate-pulse"></div>
              ) : (
                <div className="h-full flex items-end justify-between gap-2">
                  {statsData.monthlyRevenue.map((item, index) => {
                    const height = (item.revenue / 3000000) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full max-w-12 relative group">
                          <div
                            className="bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg w-full transition-all duration-300 hover:from-green-400 hover:to-green-500"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                Kz {(item.revenue / 1000).toFixed(0)}K
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm mt-2">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Categories Chart */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Categorias</h3>
                <p className="text-gray-400 text-sm">Distribuição por categoria</p>
              </div>
              <PieChart className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-4">
              {statsData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="text-gray-300">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${category.color.replace('bg-', 'bg-').replace('500', '500')}`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-8 text-right">{category.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Produtos Mais Vendidos</h3>
                <p className="text-gray-400 text-sm">Top 5 produtos este mês</p>
              </div>
              <Package className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-4">
              {statsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <p className="text-sm text-gray-400">{product.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">Kz {(product.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-gray-400">{((product.revenue / statsData.overview.totalRevenue) * 100).toFixed(1)}% da receita</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Pedidos Recentes</h3>
                <p className="text-gray-400 text-sm">Últimas transações</p>
              </div>
              <Clock className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-3">
              {statsData.recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200">
                  <div>
                    <h4 className="font-medium text-white">{order.id}</h4>
                    <p className="text-sm text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">Kz {(order.amount / 1000).toFixed(0)}K</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status === 'completed' ? 'Concluído' : 
                         order.status === 'processing' ? 'Processando' : 'Pendente'}
                      </span>
                      <span className="text-xs text-gray-400">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Métricas de Performance</h3>
              <p className="text-gray-400 text-sm">Indicadores chave de desempenho</p>
            </div>
            <Activity className="h-5 w-5 text-green-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Truck className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tempo de Entrega</p>
                  <p className="text-xl font-bold text-white">2.4 dias</p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>15% mais rápido</span>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Repeat className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Taxa de Recompra</p>
                  <p className="text-xl font-bold text-white">42%</p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>8% aumento</span>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avaliação Média</p>
                  <p className="text-xl font-bold text-white">4.7</p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Estável</span>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Taxa de Cancelamento</p>
                  <p className="text-xl font-bold text-white">3.2%</p>
                </div>
              </div>
              <div className="flex items-center text-red-400 text-sm">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>Reduzindo 2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-black border border-green-800/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Insights do Mês</h4>
              <p className="text-gray-300 text-sm">
                • <span className="text-green-400">Proteínas</span> continuam sendo a categoria mais vendida (42% das vendas)
                <br />
                • Ticket médio aumentou <span className="text-green-400">5.7%</span> em relação ao mês anterior
                <br />
                • Período de maior conversão: <span className="text-green-400">19h - 22h</span>
                <br />
                • Taxa de recompra em alta: <span className="text-green-400">42%</span> dos clientes retornaram
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}