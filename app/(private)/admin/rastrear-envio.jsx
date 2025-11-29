"use client";
import { useState } from "react";

export default function RastrearEnvio() {
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Rastreando pedido: ${codigo}`);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Rastrear Envio</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Digite o código de rastreio"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
        >
          Rastrear
        </button>
      </form>
    </div>
  );
}
