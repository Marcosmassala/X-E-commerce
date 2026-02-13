"use client"

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, MapPin, Home } from 'lucide-react';
import Link from 'next/link';
import api from '../services/api';

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // ✅ ESTADO COMPLETO - SEM confirmPassword e SEM arrays dinâmicos
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    contacts: [
      {
        phone_number: ''
      }
    ],
    addresses: [
      {
        city: '',
        street: ''
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para campos aninhados (contacts e addresses)
    if (name.includes('.')) {
      const [parent, index, child] = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        if (parent === 'contacts') {
          newData.contacts[parseInt(index)] = {
            ...newData.contacts[parseInt(index)],
            [child]: value
          };
        } else if (parent === 'addresses') {
          newData.addresses[parseInt(index)] = {
            ...newData.addresses[parseInt(index)],
            [child]: value
          };
        }
        return newData;
      });
    } else {
      // Campos normais
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // ✅ FUNÇÃO DE CADASTRO - SEM botões de adicionar/remover
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validação de campos obrigatórios
    if (!formData.first_name || !formData.last_name) {
      setError('Nome e sobrenome são obrigatórios');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('A senha é obrigatória');
      setLoading(false);
      return;
    }

    try {
      // ✅ Remove contatos e endereços vazios
      const dataToSend = {
        ...formData,
        contacts: formData.contacts.filter(contact => contact.phone_number.trim() !== ''),
        addresses: formData.addresses.filter(address => address.city.trim() !== '' && address.street.trim() !== '')
      };
      
      console.log('📤 Enviando dados:', dataToSend);
      
      const response = await api.post('/auth/signup', dataToSend);
      console.log('✅ Cadastro realizado:', response.data);
      
      setSuccess('Conta criada com sucesso! Redirecionando...');
      
      // Limpar formulário
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contacts: [{ phone_number: '' }],
        addresses: [{ city: '', street: '' }]
      });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      console.error('❌ Erro no cadastro:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">ecommerce</h1>
          <div className="w-12 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Card de cadastro */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-6">Criar conta</h2>
          
          {/* Mensagens de erro/sucesso */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ===== CAMPOS PESSOAIS ===== */}
            <div className="grid grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                    placeholder="Seu nome"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Sobrenome */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Sobrenome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                    placeholder="Seu sobrenome"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                  placeholder="seu@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* ===== TELEFONE (FIXO) ===== */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type="tel"
                  name="contacts.0.phone_number"
                  value={formData.contacts[0]?.phone_number || ''}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                  placeholder="(00) 00000-0000"
                  disabled={loading}
                />
              </div>
            </div>

            {/* ===== ENDEREÇO (FIXO) ===== */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-400 mb-1 block">Endereço</label>
              <div className="space-y-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                {/* Cidade */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    name="addresses.0.city"
                    value={formData.addresses[0]?.city || ''}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                    placeholder="Cidade"
                    disabled={loading}
                  />
                </div>
                
                {/* Rua */}
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    name="addresses.0.street"
                    value={formData.addresses[0]?.street || ''}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                    placeholder="Rua, número, bairro"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* ===== SENHA ===== */}
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 text-white pl-10 pr-10 py-2.5 rounded-lg border border-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition placeholder:text-zinc-500"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-400"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Termos */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termos"
                className="w-4 h-4 bg-zinc-800 border-zinc-700 rounded focus:ring-green-500 focus:ring-offset-0 focus:ring-1 text-green-500"
                required
                disabled={loading}
              />
              <label htmlFor="termos" className="ml-2 text-xs text-zinc-400">
                Aceito os{' '}
                <Link href="/termos" className="text-green-500 hover:text-green-400">
                  termos
                </Link>
              </label>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-black font-medium py-2.5 px-4 rounded-lg transition focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400'
              }`}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>

            {/* Login */}
            <div className="text-center text-sm">
              <span className="text-zinc-500">Já tem conta?</span>{' '}
              <Link href="/login" className="text-green-500 hover:text-green-400 font-medium">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}