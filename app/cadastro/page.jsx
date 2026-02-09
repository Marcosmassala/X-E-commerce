"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Dumbbell } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
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
    console.log('Formulário enviado:', formData);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* Left Side - Suplemento */}
        <div className="md:w-2/5 bg-gradient-to-br from-black to-gray-900 p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-600/10 rounded-full -ml-20 -mb-20"></div>
          
          <div className="text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-400">POWER SUPPLEMENTS</h1>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transforme seu
              <br />
              <span className="text-green-400">Corpo</span> e sua
              <br />
              <span className="text-green-400">Vida</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Alcance seus objetivos fitness com os melhores suplementos do mercado
            </p>
          </div>
          
          {/* Image container */}
          <div className="relative h-64 flex items-center justify-center my-8">
            <div className="relative">
              {/* Supplement bottle */}
              <div className="w-48 h-56 relative">
                {/* Bottle shape */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-800 rounded-t-lg rounded-b-3xl shadow-2xl">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-gradient-to-b from-green-500 to-green-700 rounded-t-md rounded-b-2xl">
                    {/* Label */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-black rounded-lg border-2 border-green-400 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-green-400 font-bold text-xl">PRO</div>
                        <div className="text-green-300 text-sm">WHEY</div>
                        <div className="text-green-400 font-bold text-lg">100%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cap */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-green-400 rounded-t-lg"></div>
                
                {/* Whey powder effect */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-green-300 to-green-500 rounded-full blur-sm"></div>
              </div>
              
              {/* Decorative weight plates */}
              <div className="absolute -right-4 top-12 w-12 h-12 bg-black border-4 border-green-500 rounded-full flex items-center justify-center">
                <span className="text-green-400 font-bold">20</span>
              </div>
              <div className="absolute -left-4 bottom-12 w-10 h-10 bg-black border-4 border-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-300 font-bold">10</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 relative z-10">
            <p className="text-lg text-gray-300">
              Já tem uma conta?{' '}
              <a href="/login" className="font-bold text-green-400 hover:text-green-300 transition-colors underline">
                Faça login
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h2>
            <p className="text-gray-600 mb-8">
              Cadastre-se para acessar descontos exclusivos e acompanhar seus pedidos
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label className="block text-gray-800 mb-2 font-medium">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-800 mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-800 mb-2 font-medium">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Crie uma senha segura"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Mínimo 8 caracteres com letras e números
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-800 mb-2 font-medium">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Digite sua senha novamente"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  required
                />
                <label htmlFor="terms" className="text-gray-700 text-sm">
                  Eu concordo com os{' '}
                  <a href="/terms" className="text-green-600 hover:text-green-800 font-medium">
                    Termos de Serviço
                  </a>{' '}
                  e{' '}
                  <a href="/privacy" className="text-green-600 hover:text-green-800 font-medium">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-green-500/20 border border-green-500/20"
              >
                Criar Conta
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">ou continue com</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  <span>Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  <span>Google</span>
                </button>
              </div>

              {/* Promotional message */}
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-bold text-green-600">BÔNUS:</span> Ganhe 10% de desconto no seu primeiro pedido!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;