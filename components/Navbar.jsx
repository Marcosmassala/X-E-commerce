"use client";

import { AlignJustify, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Tipos de usuário (mock)
  const userType = null; // "client", "admin", "super_admin" ou null

  // Links públicos
  const publicLinks = [
    { path: "/", label: "Início" },
    {
      path: "/categorias",
      label: "Suplementos",
      subRoutes: [
        { path: "/categorias/whey-protein", label: "Whey Protein" },
        { path: "/categorias/creatina", label: "Creatina" },
        { path: "/categorias/pre-treino", label: "Pré-treinos" },
        { path: "/categorias/saude", label: "Saúde e Bem-estar" },
      ],
    },
    { path: "/promocoes", label: "Promoções" },
    { path: "/blog", label: "Blog" },
  ];

  // Links privados
  const privateLinks = {
    client: [
      { path: "/conta", label: "Minha Conta" },
      { path: "/pedidos", label: "Meus Pedidos" },
      { path: "/carrinho", label: "Carrinho" },
    ],

    admin: [
      { path: "/admin", label: "Dashboard" },
      {
        path: "/admin/produtos",
        label: "Produtos",
        subRoutes: [
          { path: "/admin/produtos/novo", label: "Adicionar Produto" },
          { path: "/admin/categorias", label: "Categorias" },
        ],
      },
      { path: "/admin/pedidos", label: "Pedidos" },
      { path: "/admin/clientes", label: "Clientes" },
    ],

    super_admin: [
      { path: "/super-admin", label: "Dashboard Geral" },
      { path: "/super-admin/usuarios", label: "Gestão de Usuários" },
    ],
  };

  const authLinks = [
    { path: "/login", label: "Entrar" },
    { path: "/criar-conta", label: "Criar Conta" },
  ];

  const accountLinks = [{ path: "/logout", label: "Sair" }];

  const toggleDropdown = (path) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const hoverGradientClass =
    "hover:bg-gradient-to-br hover:from-green-700 hover:to-green-500 hover:bg-clip-text hover:text-transparent";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
          
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-br from-green-700 to-green-500 bg-clip-text text-transparent"
          >
            SUPPLEMAX
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {/* PUBLIC LINKS */}
            {!userType &&
              publicLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.path}
                      className={`text-black ${hoverGradientClass}`}
                    >
                      {link.label}
                    </Link>

                    {link.subRoutes && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${hoverGradientClass} ${
                          hoveredItem === link.path ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {link.subRoutes && (
                    <div
                      className={`absolute left-0 bg-white shadow-lg rounded-md mt-2 min-w-[220px] transition-all duration-200 ${
                        hoveredItem === link.path
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1"
                      }`}
                    >
                      {link.subRoutes.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`block px-4 py-2 text-sm ${hoverGradientClass}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {/* PRIVATE LINKS */}
            {userType &&
              privateLinks[userType]?.map((link) => (
                <div
                  key={link.path}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.path}
                      className={`text-black ${hoverGradientClass}`}
                    >
                      {link.label}
                    </Link>

                    {link.subRoutes && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${hoverGradientClass} ${
                          hoveredItem === link.path ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {link.subRoutes && (
                    <div
                      className={`absolute left-0 bg-white shadow-lg rounded-md mt-2 min-w-[220px] transition-all duration-200 ${
                        hoveredItem === link.path
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1"
                      }`}
                    >
                      {link.subRoutes.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`block px-4 py-2 text-sm ${hoverGradientClass}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {/* AUTH */}
            {(userType ? accountLinks : authLinks).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-black ${hoverGradientClass}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="md:hidden fixed z-50 top-20 right-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-xl animate-slide-in overflow-y-auto">
            <div className="p-6 space-y-6">
              {!userType && (
                <>
                  <h3 className="text-sm uppercase text-gray-500">Suplementos</h3>
                  <ul className="space-y-3">
                    {publicLinks.map((link) => (
                      <li key={link.path}>
                        {link.subRoutes ? (
                          <>
                            <button
                              onClick={() => toggleDropdown(link.path)}
                              className={`flex justify-between items-center w-full py-2 ${hoverGradientClass}`}
                            >
                              <span className="text-lg">{link.label}</span>
                              {openDropdown === link.path ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>

                            {openDropdown === link.path && (
                              <ul className="ml-4 mt-2 space-y-2">
                                {link.subRoutes.map((sub) => (
                                  <li key={sub.path}>
                                    <Link
                                      href={sub.path}
                                      className={`block py-2 pl-2 ${hoverGradientClass}`}
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={link.path}
                            className={`block py-3 text-lg ${hoverGradientClass}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {userType && (
                <>
                  <h3 className="text-sm uppercase text-gray-500">
                    {userType === "admin" ? "Administração" : "Minha Conta"}
                  </h3>

                  <ul className="space-y-3">
                    {privateLinks[userType]?.map((link) => (
                      <li key={link.path}>
                        {link.subRoutes ? (
                          <>
                            <button
                              onClick={() => toggleDropdown(link.path)}
                              className={`flex justify-between items-center w-full py-2 ${hoverGradientClass}`}
                            >
                              <span className="text-lg">{link.label}</span>
                              {openDropdown === link.path ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>

                            {openDropdown === link.path && (
                              <ul className="ml-4 mt-2 space-y-2">
                                {link.subRoutes.map((sub) => (
                                  <li key={sub.path}>
                                    <Link
                                      href={sub.path}
                                      className={`block py-2 pl-2 ${hoverGradientClass}`}
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={link.path}
                            className={`block py-3 text-lg ${hoverGradientClass}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* ACCOUNT */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase text-gray-500">Conta</h3>
                <ul className="space-y-3">
                  {(userType ? accountLinks : authLinks).map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className={`block py-3 text-lg ${hoverGradientClass}`}
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
        </>
      )}
    </>
  );
}
