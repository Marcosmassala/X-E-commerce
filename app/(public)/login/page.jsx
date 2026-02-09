"use client"; 

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Dumbbell, ArrowRight } from 'lucide-react';
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login enviado:', formData);
    
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
    // Adicione aqui a lógica de login social
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black border-2 border-green-500">
        <div className="p-8 md:p-12">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-400">POWER SUPPLEMENTS</h1>
          </div>

          <h2 className="text-3xl font-bold text-green-300 mb-2 text-center">Bem-vindo de volta!</h2>
          <p className="text-green-200 mb-8 text-center">
            Faça login para acessar sua conta e continuar suas compras
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-green-300 mb-2 font-medium">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-green-500/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-green-200/50"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-green-300 font-medium">
                  Senha
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-green-500/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-green-200/50"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-green-500 bg-gray-800 text-green-500 focus:ring-green-500"
                />
                <label htmlFor="remember" className="text-green-300">
                  Lembrar de mim
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-green-500/30 border border-green-400 flex items-center justify-center group"
            >
              <span>Entrar na Conta</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-green-500/30"></div>
              <span className="mx-4 text-green-300">ou continue com</span>
              <div className="flex-grow border-t border-green-500/30"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-2 py-3 bg-gray-800 border border-green-500/30 text-green-300 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center space-x-2 py-3 bg-gray-800 border border-green-500/30 text-green-300 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span>Facebook</span>
              </button>
            </div>

            {/* Signup Link */}
            <div className="text-center pt-6 border-t border-green-500/30">
              <p className="text-green-300">
                Não tem uma conta?{' '}
                <Link 
                  href="/cadastro" 
                  className="font-bold text-green-400 hover:text-green-300 transition-colors"
                >
                  Cadastre-se agora
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;