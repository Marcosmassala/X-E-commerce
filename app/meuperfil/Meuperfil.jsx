"use client";
import { useState } from "react";

export default function PerfilUsuario() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [codigoRastreio, setCodigoRastreio] = useState("");

  const pedidos = [
    { 
      id: "#12345", 
      data: "10/10/2023", 
      produtos: "Whey Protein, Creatina", 
      valor: "R$ 250,00", 
      status: "Entregue" 
    },
    { 
      id: "#12344", 
      data: "05/10/2023", 
      produtos: "Multivitamínico", 
      valor: "R$ 80,00", 
      status: "Em processamento" 
    },
    { 
      id: "#12343", 
      data: "01/10/2023", 
      produtos: "Barra de Proteína", 
      valor: "R$ 50,00", 
      status: "Cancelado" 
    },
  ];

  const historicoRastreio = [
    { etapa: "Pedido Entregue", data: "12/10/2023, 14:30" },
    { etapa: "Enviado", data: "11/10/2023, 09:00" },
    { etapa: "Em Separação", data: "10/10/2023, 18:00" },
    { etapa: "Pedido Recebido", data: "10/10/2023, 15:45" },
  ];

  // Estatísticas calculadas
  const totalCompras = pedidos.length;
  const comprasEntregues = pedidos.filter(p => p.status === "Entregue").length;
  const comprasAndamento = pedidos.filter(p => p.status === "Em processamento").length;
  const comprasCanceladas = pedidos.filter(p => p.status === "Cancelado").length;
  
  // Valor total gasto
  const valorTotal = pedidos.reduce((total, pedido) => {
    const valorNumerico = parseFloat(pedido.valor.replace("R$ ", "").replace(",", "."));
    return total + (isNaN(valorNumerico) ? 0 : valorNumerico);
  }, 0);

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "andamento") return pedido.status === "Em processamento";
    if (activeFilter === "concluidos") return pedido.status === "Entregue";
    if (activeFilter === "cancelados") return pedido.status === "Cancelado";
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Cabeçalho */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
      </div>

      <div className="p-6">
        {/* Cards de Estatísticas */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo das Compras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card: Total de Compras */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total de Compras</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{totalCompras}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card: Compras Entregues */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Entregues</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{comprasEntregues}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card: Em Andamento */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{comprasAndamento}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card: Valor Total Gasto */}
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Total Gasto</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    R$ {valorTotal.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {["todos", "andamento", "concluidos", "cancelados"].map((filter) => {
              const labels = {
                todos: "Todos",
                andamento: "Em andamento",
                concluidos: "Concluídos",
                cancelados: "Cancelados"
              };
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {labels[filter]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Cabeçalho da tabela */}
        <div className="mb-4">
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-gray-600 px-2">
            <div>NÚMERO DO PEDIDO</div>
            <div>DATA</div>
            <div>PRODUTOS</div>
            <div>VALOR</div>
            <div>STATUS</div>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4 mb-12">
          {pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="font-medium text-gray-900">{pedido.id}</div>
                <div className="text-gray-600">{pedido.data}</div>
                <div className="text-gray-600">{pedido.produtos}</div>
                <div className="font-bold text-gray-900">{pedido.valor}</div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pedido.status === "Entregue" ? "bg-green-100 text-green-800" :
                    pedido.status === "Em processamento" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {pedido.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}