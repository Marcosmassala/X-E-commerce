'use client';

import { useState } from 'react';
import { Key, Shield, Eye, EyeOff, LogOut } from 'lucide-react';

export default function SecurityTab({ passwordData, handlePasswordChange, handlePasswordSubmit, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <Key className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">A</span>LTERAR SENHA
          </h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha Atual <span className="text-green-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="senhaAtual"
                  value={passwordData.senhaAtual}
                  onChange={handlePasswordChange}
                  placeholder="Digite sua senha atual"
                  className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                    focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                    transition-all duration-200 text-white placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nova Senha <span className="text-green-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="novaSenha"
                  value={passwordData.novaSenha}
                  onChange={handlePasswordChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                    focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                    transition-all duration-200 text-white placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Nova Senha <span className="text-green-400">*</span>
              </label>
              <input
                type="password"
                name="confirmarSenha"
                value={passwordData.confirmarSenha}
                onChange={handlePasswordChange}
                placeholder="Digite novamente a nova senha"
                className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                  focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                  transition-all duration-200 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-xl">
            <p className="text-sm font-medium mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Requisitos da senha:
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${passwordData.novaSenha.length >= 6 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'}`} />
                Mínimo 6 caracteres
              </li>
              <li className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${/[A-Z]/.test(passwordData.novaSenha) ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'}`} />
                Pelo menos uma letra maiúscula
              </li>
              <li className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${/\d/.test(passwordData.novaSenha) ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'}`} />
                Pelo menos um número
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Alterando...</span>
                </>
              ) : (
                <>
                  <Key className="h-5 w-5" />
                  <span>Alterar Senha</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">S</span>EGURANÇA
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all">
            <div>
              <p className="font-medium text-white">Verificação em duas etapas</p>
              <p className="text-sm text-gray-400">Proteção adicional para sua conta</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg 
              hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
              Ativar
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all">
            <div>
              <p className="font-medium text-white">Sessões ativas</p>
              <p className="text-sm text-gray-400">Dispositivos conectados à sua conta</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-white rounded-lg 
              hover:border-green-500/30 transition-all">
              Gerenciar
            </button>
          </div>

          <div className="p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
            <p className="font-medium text-white mb-2">Zona de perigo</p>
            <p className="text-sm text-gray-400 mb-4">
              Ações nesta seção não podem ser desfeitas
            </p>
            <button className="px-4 py-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-white rounded-lg 
              hover:border-red-500/50 transition-all flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Encerrar todas as sessões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}