'use client';

import Image from 'next/image';
import { User, Mail, Phone, Calendar, Globe } from 'lucide-react';

export default function AdminProfileCard({ formData, formatDate, formatDateTime, onImageUpload, onRemoveImage }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500/50 mx-auto relative shadow-lg">
            {formData.foto ? (
              <Image
                src={URL.createObjectURL(formData.foto)}
                alt="Foto do admin"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
            )}
          </div>
          <label className="absolute bottom-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full cursor-pointer hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg">
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </label>
        </div>
        
        {formData.foto && (
          <button
            onClick={onRemoveImage}
            className="text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            Remover foto
          </button>
        )}

        <h3 className="text-2xl font-bold text-white">{formData.nome}</h3>
        <p className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-medium">
          {formData.cargo}
        </p>
        <p className="text-gray-400 text-sm mt-2">ID: {formData.id}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all duration-300">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium text-white">{formData.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all duration-300">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Telefone</p>
            <p className="font-medium text-white">{formData.telefone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all duration-300">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Membro desde</p>
            <p className="font-medium text-white">{formatDate(formData.dataCadastro)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl hover:border-green-500/30 transition-all duration-300">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Último acesso</p>
            <p className="font-medium text-white">{formatDateTime(formData.ultimoAcesso)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}