"use client";

import { AlignJustify, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LINKS para landing page do e-commerce
  const links = [
    { path: "/suplementos", label: "Suplementos" },
    { path: "/marcas", label: "Marcas" },
    { path: "/promocoes", label: "Promoções" },
  ];

  const authLinks = [
    { path: "/login", label: "Entrar" },
    { path: "/criar-conta", label: "Criar Conta" },
  ];

  return (
    <>
      {/* Header com z-index menor que o menu */}
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
          
          {/* LOGO */}
          <Link
            href="/"
            className={`text-2xl font-bold ${
              isScrolled
                ? "text-green-700"
                : "text-white"
            }`}
          >
            SUPPLEMAX
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  isScrolled ? "text-black" : "text-white"
                } hover:text-green-600 transition-colors`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-2 ml-2">
              {authLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-md ${
                    link.label === "Entrar"
                      ? `${
                          isScrolled
                            ? "text-green-700 hover:bg-green-100"
                            : "text-white hover:text-green-300"
                        }`
                      : "bg-green-700 text-white hover:bg-green-600"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Botão Mobile */}
          <button
            className="md:hidden text-2xl z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AlignJustify
              size={24}
              className={isScrolled ? "text-black" : "text-white"}
            />
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          
          {/* Overlay escuro */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Conteúdo do menu */}
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-xl animate-slide-in">
            
            {/* Botão fechar */}
            <button
              className="absolute top-6 right-6 z-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X size={24} className="text-gray-800" />
            </button>

            <div className="p-6 pt-20 space-y-8 h-full overflow-y-auto">
              
              {/* Navegação */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase text-gray-500">Navegação</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="block py-3 text-lg text-gray-800 hover:text-green-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conta */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase text-gray-500">Conta</h3>
                <ul className="space-y-2">
                  {authLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="block py-3 text-lg text-gray-800 hover:text-green-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
