'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MessageAlert({ errorMessage, successMessage }) {
  if (errorMessage) {
    return (
      <div className="mb-6 p-4 border border-red-500/30 rounded-xl bg-gradient-to-br from-red-900/20 to-black backdrop-blur-sm animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-red-300">{errorMessage}</p>
            <p className="text-sm text-red-400/80 mt-1">Verifique os dados e tente novamente</p>
          </div>
        </div>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="mb-6 p-4 border border-green-500/30 rounded-xl bg-gradient-to-br from-green-900/20 to-black backdrop-blur-sm animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-green-300">{successMessage}</p>
            <p className="text-sm text-green-400/80 mt-1">Alterações salvas com sucesso</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}