"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "../perfil/sidebar";

export default function PerfilUsuario() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [activeSection, setActiveSection] = useState("pedidos"); // "pedidos" ou "perfil"
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados do usuário
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "+244 912 345 678",
    endereco: "Rua da Independência, 123, Luanda",
    dataNascimento: "15/08/1990",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao"
  });

  // Dados convertidos para KZ
  const pedidos = [
    { 
      id: "#12345", 
      data: "10/10/2023", 
      produtos: "Whey Protein, Creatina", 
      valor: "25.000 KZ", 
      status: "Entregue" 
    },
    { 
      id: "#12344", 
      data: "05/10/2023", 
      produtos: "Multivitamínico", 
      valor: "8.000 KZ", 
      status: "Em processamento" 
    },
    { 
      id: "#12343", 
      data: "01/10/2023", 
      produtos: "Barra de Proteína", 
      valor: "5.000 KZ", 
      status: "Cancelado" 
    },
  ];

  // Estatísticas calculadas
  const totalCompras = pedidos.length;
  const comprasEntregues = pedidos.filter(p => p.status === "Entregue").length;
  const comprasAndamento = pedidos.filter(p => p.status === "Em processamento").length;
  
  // Valor total gasto em KZ
  const valorTotal = pedidos.reduce((total, pedido) => {
    const valorNumerico = parseFloat(pedido.valor.replace(" KZ", "").replace(".", "").replace(",", "."));
    return total + (isNaN(valorNumerico) ? 0 : valorNumerico);
  }, 0);

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "andamento") return pedido.status === "Em processamento";
    if (activeFilter === "concluidos") return pedido.status === "Entregue";
    if (activeFilter === "cancelados") return pedido.status === "Cancelado";
    return true;
  });

  const labels = {
    todos: "Todos",
    andamento: "Em andamento",
    concluidos: "Concluídos",
    cancelados: "Cancelados"
  };

  // Função para formatar valor em KZ
  const formatarKZ = (valor) => {
    return new Intl.NumberFormat('pt-AO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor) + ' KZ';
  };

  // Função para salvar edições do perfil
  const handleSaveProfile = () => {
    // Aqui você implementaria a lógica para salvar no backend
    console.log("Dados salvos:", userData);
    setIsEditing(false);
  };

  // Função para fazer logout
  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout
    console.log("Logout realizado");
    // Redirecionar para a página de login
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        <Navbar />
       

        {/* Conteúdo */}
        <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
          {activeSection === "pedidos" ? (
            <>
              {/* Cards de Estatísticas */}
              <div className="w-full mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Resumo das Compras</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card: Total de Compras */}
                  <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Total de Compras</p>
                        <p className="text-2xl font-bold text-white mt-1">{totalCompras}</p>
                      </div>
                      <div className="bg-green-500/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card: Compras Entregues */}
                  <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Entregues</p>
                        <p className="text-2xl font-bold text-white mt-1">{comprasEntregues}</p>
                      </div>
                      <div className="bg-green-500/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card: Em Andamento */}
                  <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Em Andamento</p>
                        <p className="text-2xl font-bold text-white mt-1">{comprasAndamento}</p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card: Valor Total Gasto */}
                  <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Total Gasto</p>
                        <p className="text-2xl font-bold text-white mt-1">
                          {formatarKZ(valorTotal)}
                        </p>
                      </div>
                      <div className="bg-purple-500/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros */}
              <div className="w-full mb-8 bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg">
                <div className="flex flex-wrap gap-3">
                  {["todos", "andamento", "concluidos", "cancelados"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeFilter === filter
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold shadow-lg shadow-green-500/20"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                      }`}
                    >
                      {labels[filter]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de pedidos */}
              <div className="w-full bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden mb-8">
               

                {/* Lista de pedidos */}
                <div className="divide-y divide-gray-800">
                  {pedidosFiltrados.map((pedido) => (
                    <div key={pedido.id} className="px-4 py-4 hover:bg-gray-800/50 transition-colors duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="font-medium text-white">{pedido.id}</div>
                        <div className="text-gray-400">{pedido.data}</div>
                        <div className="text-gray-400">{pedido.produtos}</div>
                        <div className="font-bold text-white">{pedido.valor}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium w-fit ${
                            pedido.status === "Entregue" ? "bg-green-900/30 text-green-400 border border-green-800/50" :
                            pedido.status === "Em processamento" ? "bg-amber-900/30 text-amber-400 border border-amber-800/50" :
                            "bg-red-900/30 text-red-400 border border-red-800/50"
                          }`}>
                            {pedido.status}
                          </span>
                          <button 
                            className="text-green-400 hover:text-green-300 font-medium text-sm transition-colors flex items-center gap-1 hover:underline"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mensagem quando não há pedidos filtrados */}
              {pedidosFiltrados.length === 0 && (
                <div className="w-full bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-gray-400">Não há pedidos correspondentes ao filtro selecionado.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Seção de Perfil */
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
                {/* Cabeçalho do Perfil */}
                <div className="bg-gradient-to-r from-gray-800 to-black p-6 border-b border-gray-800">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={userData.avatar} 
                          alt="Avatar" 
                          className="w-20 h-20 rounded-full border-4 border-gray-800"
                        />
                        {isEditing && (
                          <button className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{userData.nome}</h2>
                        <p className="text-gray-400">{userData.email}</p>
                        <p className="text-gray-400 text-sm">Membro desde Janeiro 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {!isEditing ? (
                        <>
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Editar Perfil
                          </button>
                          <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Sair
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Salvar
                          </button>
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informações do Perfil */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Informações Pessoais</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Nome Completo
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.nome}
                          onChange={(e) => setUserData({...userData, nome: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                          {userData.nome}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        E-mail
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                          {userData.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Telefone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.telefone}
                          onChange={(e) => setUserData({...userData, telefone: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                          {userData.telefone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Data de Nascimento
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.dataNascimento}
                          onChange={(e) => setUserData({...userData, dataNascimento: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />
                      ) : (
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                          {userData.dataNascimento}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Endereço
                      </label>
                      {isEditing ? (
                        <textarea
                          value={userData.endereco}
                          onChange={(e) => setUserData({...userData, endereco: e.target.value})}
                          rows="3"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 resize-none"
                        />
                      ) : (
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                          {userData.endereco}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seção de Segurança */}
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Segurança da Conta</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500/10 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-white">Alterar Senha</p>
                            <p className="text-sm text-gray-400">Atualize sua senha regularmente</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-red-500/20 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-white">Sair da Conta</p>
                            <p className="text-sm text-gray-400">Encerrar sessão atual</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}