'use client';

import { Bell, Save } from 'lucide-react';

export default function PreferencesTab({ formData, handleChange, isLoading }) {
  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="p-2 bg-green-900/30 rounded-lg">
          <Bell className="h-5 w-5 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">
          <span className="text-green-400">N</span>OTIFICAÇÕES
        </h2>
      </div>

      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-green-600 transition-colors cursor-pointer">
          <div>
            <p className="font-medium text-white">Notificações por email</p>
            <p className="text-sm text-gray-400">Receba atualizações importantes</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-all duration-300 relative
            ${formData.notificacoes ? 'bg-green-600' : 'bg-gray-800'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
              ${formData.notificacoes ? 'left-7' : 'left-1'}`} />
          </div>
          <input
            type="checkbox"
            name="notificacoes"
            checked={formData.notificacoes}
            onChange={handleChange}
            className="hidden"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-green-600 transition-colors cursor-pointer">
          <div>
            <p className="font-medium text-white">Modo escuro</p>
            <p className="text-sm text-gray-400">Tema escuro para o painel</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-all duration-300 relative
            ${formData.temaEscuro ? 'bg-green-600' : 'bg-gray-800'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
              ${formData.temaEscuro ? 'left-7' : 'left-1'}`} />
          </div>
          <input
            type="checkbox"
            name="temaEscuro"
            checked={formData.temaEscuro}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Idioma do painel
            </label>
            <select className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg
              focus:border-green-600 focus:ring-2 focus:ring-green-600/30 focus:outline-none
              transition-all duration-200 text-white">
              <option>Português (Brasil)</option>
              <option>Português (Portugal)</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fuso horário
            </label>
            <select className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg
              focus:border-green-600 focus:ring-2 focus:ring-green-600/30 focus:outline-none
              transition-all duration-200 text-white">
              <option>Luanda (GMT+1)</option>
              <option>Lisboa (GMT+0)</option>
              <option>Londres (GMT+0)</option>
              <option>Nova York (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800 flex justify-end">
        <button
          onClick={() => {
            // Função para salvar preferências
          }}
          className="px-6 py-3 bg-green-600 text-black font-bold rounded-lg hover:bg-green-700
            transition-all duration-300 flex items-center gap-2"
        >
          <Save className="h-5 w-5" />
          Salvar Preferências
        </button>
      </div>
    </div>
  );
}