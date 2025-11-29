// app/(private)/(user)/perfil/page.jsx
"use client";

import { useState } from 'react';

export default function MeusPedidos() {
  const [activeTab, setActiveTab] = useState('todos');

  const pedidos = [
    {
      id: '#12345',
      data: '10/10/2023',
      produtos: 'Whey Protein, Creatina',
      valor: '25.000 Kz',
      status: 'Entregue'
    },
    {
      id: '#12344',
      data: '05/10/2023',
      produtos: 'Multivitamínico',
      valor: '8.000 Kz',
      status: 'Em processamento'
    },
    {
      id: '#12343',
      data: '01/10/2023',
      produtos: 'Barra de Proteína',
      valor: '5.000 Kz',
      status: 'Cancelado'
    }
  ];

  const historicoRastreio = [
    { evento: 'Pedido Entregue', data: '12/10/2023, 14:30' },
    { evento: 'Enviado', data: '11/10/2023, 09:00' },
    { evento: 'Em Separação', data: '10/10/2023, 18:00' },
    { evento: 'Pedido Recebido', data: '10/10/2023, 15:45' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

        {/* Abas */}
        <div className="flex space-x-8 border-b border-gray-200 mb-6">
          {['todos', 'em-andamento', 'concluidos', 'cancelados'].map((tab) => (
            <button
              key={tab}
              className={`pb-4 px-1 font-medium text-sm ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'todos' && 'Todos'}
              {tab === 'em-andamento' && 'Em andamento'}
              {tab === 'concluidos' && 'Concluídos'}
              {tab === 'cancelados' && 'Cancelados'}
            </button>
          ))}
        </div>

        {/* Lista de Pedidos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          {/* Cabeçalho da tabela */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div>NÚMERO DO PEDIDO</div>
            <div>DATA</div>
            <div>PRODUTOS</div>
            <div>VALOR</div>
            <div>STATUS</div>
          </div>

          {/* Lista de pedidos */}
          {pedidos.map((pedido, index) => (
            <div
              key={pedido.id}
              className={`grid grid-cols-5 gap-4 px-6 py-4 ${
                index !== pedidos.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="font-medium text-gray-900">{pedido.id}</div>
              <div className="text-gray-600">{pedido.data}</div>
              <div className="text-gray-600">{pedido.produtos}</div>
              <div className="text-gray-900 font-medium">{pedido.valor}</div>
              <div className={`${
                pedido.status === 'Entregue' ? 'text-green-600' :
                pedido.status === 'Em processamento' ? 'text-yellow-600' :
                'text-red-600'
              } font-medium`}>
                {pedido.status}
              </div>
            </div>
          ))}
        </div>

        {/* Botões Ver Detalhes */}
        <div className="flex justify-end space-x-4 mb-8">
          {pedidos.map((pedido) => (
            <button
              key={pedido.id}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Ver Detalhes
            </button>
          ))}
        </div>

        {/* Seção de Rastreamento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Rastrear Envío
          </h2>
          
          {/* Input do código de rastreio */}
          <div className="mb-6">
            <label htmlFor="tracking-code" className="block text-sm font-medium text-gray-700 mb-2">
              Insira o código de rastreio
            </label>
            <input
              type="text"
              id="tracking-code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: AN123456789AO"
            />
          </div>

          {/* Histórico de Rastreio */}
          <div className="space-y-4">
            {historicoRastreio.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  {index !== historicoRastreio.length - 1 && (
                    <div className="w-0.5 h-8 bg-blue-300 mt-1"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.evento}</div>
                  <div className="text-sm text-gray-500">{item.data}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}