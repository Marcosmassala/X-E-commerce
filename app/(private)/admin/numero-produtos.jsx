"use client";

export default function NumeroDeProdutos({ quantidade }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <h3 className="text-lg font-semibold">Número de produtos</h3>
      <p className="text-4xl font-bold mt-2 text-blue-400">
        {quantidade}
      </p>
    </div>
  );
}
        