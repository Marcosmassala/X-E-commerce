"use client";

import Link from "next/link";
import { useState } from "react";

export default function SliderBar({ onClose }) {
  const [activeItem, setActiveItem] = useState("pedidos");

  const menuItems = [
    { id: "conta", label: "Minha Conta", href: "/Minha_conta" },
    { id: "pedidos", label: "Meus Pedidos", href: "/meuperfil" },
    { id: "favoritos", label: "Favoritos", href: "/Favoritos" },
    { id: "ajuda", label: "Ajuda", href: "/Ajuda" },
    { id: "sair", label: "Sair", action: "logout" },
  ];
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-out translate-x-0">
      <div className="h-full flex flex-col border-r border-gray-200">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">JS</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Eliseu</h3>
                <p className="text-sm text-gray-500">Cabango</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) =>
              item.action === "logout" ? (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log("Saindo...");
                    // aqui podes limpar token, cookie, etc
                  }}
                  className="w-full p-3 text-left rounded-lg text-red-600 hover:bg-red-50"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`block p-3 rounded-lg transition-all ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>

        {/* Rodapé */}
        <div className="p-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">Suplementos Premium</p>
          <p className="text-xs text-gray-400 mt-1">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
