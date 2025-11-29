"use client";

import { ShoppingCart, DollarSign, CheckCircle, Clock } from 'lucide-react';

export default function Estatisticas({ orders = [] }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(value);
  };

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(order => order.status === 'approved')
    .reduce((total, order) => total + (order.price * order.quantity), 0);
  
  const approvedOrders = orders.filter(order => order.status === 'approved').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  const stats = [
    {
      title: 'Total de Pedidos',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-black',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Receita Total',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pedidos Aprovados',
      value: approvedOrders,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pedidos Pendentes',
      value: pendingOrders,
      icon: Clock,
      color: 'text-black',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}