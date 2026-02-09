'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-2 bg-green-500/10 rounded-lg">
        <Icon className="h-5 w-5 text-green-400" />
      </div>
    </div>

    {change !== undefined && (
      <div className="flex items-center">
        {changeType === 'increase' ? (
          <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
        )}
        <span
          className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {change}%
        </span>
        <span className="text-gray-500 text-sm ml-2">
          desde o último mês
        </span>
      </div>
    )}
  </div>
);

const TimeFilterButton = ({ label, value, timeRange, setTimeRange }) => (
  <button
    onClick={() => setTimeRange(value)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      timeRange === value
        ? 'bg-green-500 text-black'
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
);

export default function EstatisticasPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 p-4 md:p-6">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Estatísticas do E-commerce
                </h1>
                <p className="text-gray-400 mt-1">
                  Métricas e análises detalhadas do GymShop Angola
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition">
                <Calendar className="h-4 w-4 inline mr-2" />
                Selecionar Período
              </button>
              <button className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition">
                <Download className="h-4 w-4 inline mr-2" />
                Exportar
              </button>
            </div>
          </div>

          {/* Filtros de tempo */}
          <div className="flex flex-wrap gap-2 mb-6">
            <TimeFilterButton label="Hoje" value="today" timeRange={timeRange} setTimeRange={setTimeRange} />
            <TimeFilterButton label="7 dias" value="week" timeRange={timeRange} setTimeRange={setTimeRange} />
            <TimeFilterButton label="Mês" value="month" timeRange={timeRange} setTimeRange={setTimeRange} />
            <TimeFilterButton label="Trimestre" value="quarter" timeRange={timeRange} setTimeRange={setTimeRange} />
            <TimeFilterButton label="Ano" value="year" timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Receita Total"
              value={`Kz ${statsData.overview.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              change={statsData.overview.revenueChange}
              changeType="increase"
            />
            <StatCard
              title="Total de Pedidos"
              value={statsData.overview.totalOrders}
              icon={ShoppingCart}
              change={statsData.overview.ordersChange}
              changeType="increase"
            />
            <StatCard
              title="Ticket Médio"
              value={`Kz ${statsData.overview.averageOrderValue.toLocaleString()}`}
              icon={CreditCard}
              change={statsData.overview.avgOrderChange}
              changeType="increase"
            />
            <StatCard
              title="Taxa de Conversão"
              value={`${statsData.overview.conversionRate}%`}
              icon={TrendingUp}
              change={statsData.overview.conversionChange}
              changeType="increase"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
