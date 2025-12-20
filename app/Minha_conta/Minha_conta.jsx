"use client";
import { useState } from 'react';

const MinhaContaContent = () => {
  // Dados do usuário diretamente no componente
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    dataNascimento: "15/05/1990",
    endereco: {
      rua: "Rua das Flores, 123",
      bairro: "Centro",
      cidade: "Luanda",
      estado: "LD",
      cep: "01234-567"
    }
  });

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
      alert("Você foi desconectado!");
      // Aqui você implementaria a lógica real de logout
    }
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Coluna 1: Informações Pessoais */}
        <div className="lg:col-span-2 space-y-6 ">
          {/* Dados Pessoais */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Editar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.nome}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.email}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.telefone}
                </div>
              </div>
              
             
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.dataNascimento}
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Endereço Principal</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Alterar
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {userData.endereco.rua}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.endereco.bairro}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.endereco.cidade}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {userData.endereco.estado}
                  </div>
                </div>
                
               
              
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Ações Rápidas e Segurança */}
        <div className="space-y-6">
          {/* Ações Rápidas */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">Alterar Senha</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">Meus Cartões</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </button>
              
          
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Segurança</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Verificação em Duas Etapas</p>
                  <p className="text-sm text-gray-500">Aumente a segurança da sua conta</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Ativar
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Sessões Ativas</p>
                  <p className="text-sm text-gray-500">2 dispositivos conectados</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  Ver
                </button>
              </div>
            </div>
          </div>

          {/* Sair da Conta */}
          <button 
            onClick={handleLogout}
            className="w-full py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinhaContaContent;