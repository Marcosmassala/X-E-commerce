'use client';

import { User, Save } from 'lucide-react';

export default function PersonalInfoTab({ formData, handleChange, handleSubmit, isLoading }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
          <User className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">I</span>NFORMAÇÕES PESSOAIS
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo <span className="text-green-400">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                transition-all duration-200 text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cargo
            </label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Seu cargo"
              className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                transition-all duration-200 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-green-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                transition-all duration-200 text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telefone <span className="text-green-400">*</span>
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="+244 123 456 789"
              className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl
                focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none
                transition-all duration-200 text-white placeholder-gray-500"
              required
            />
          </div>
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
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}