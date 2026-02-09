'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  ShoppingCart,
  MessageSquare,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'users', label: 'Usuários', icon: Users, path: '/admin/perfilAdmin' },
  { id: 'products', label: 'Produtos', icon: ShoppingCart, path: '/produtos' },
  { id: 'add-product', label: 'Cadastrar Produto', icon: PlusCircle, path: '/admin/novo-produto' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/estatisticas' },
  { id: 'reports', label: 'Relatórios', icon: FileText, path: '/reports' },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare, path: '/messages' },
  { id: 'calendar', label: 'Calendário', icon: Calendar, path: '/calendar' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' },
];

// ===== COMPONENTES DEFINIDOS FORA =====

// Botão flutuante para mobile
const MobileToggleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-green-500 text-black rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
  >
    <Menu size={24} />
  </button>
);

// Overlay para mobile
const MobileOverlay = ({ isOpen, onClose }) => (
  <div
    className={`lg:hidden fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onClick={onClose}
  />
);

// ===== COMPONENTE PRINCIPAL =====
export default function SidebarResponsive() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fecha sidebar mobile ao navegar - CORRIGIDO
  useEffect(() => {
    // Verifica se precisa fechar o sidebar mobile
    const shouldCloseMobile = isMobile && pathname && isMobileOpen;
    
    if (shouldCloseMobile) {
      // Usa setTimeout para evitar chamada síncrona de setState no effect
      const timer = setTimeout(() => {
        setIsMobileOpen(false);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isMobile, isMobileOpen]);

  // Opção 2: Efeito mais simples sem setState direto
  useEffect(() => {
    // Apenas fecha se estiver aberto em mobile
    if (pathname && isMobile && isMobileOpen) {
      // Use requestAnimationFrame para próximo tick
      requestAnimationFrame(() => {
        setIsMobileOpen(false);
      });
    }
  }, [pathname, isMobile, isMobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Botão flutuante para mobile */}
      <MobileToggleButton onClick={() => setIsMobileOpen(true)} />

      {/* Overlay para mobile */}
      <MobileOverlay 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />

      {/* Sidebar principal */}
      <aside
        className={`
          bg-black text-white h-screen flex flex-col fixed lg:sticky top-0 z-40
          transition-all duration-300 ease-in-out
          ${isMobile ? 'w-64' : isCollapsed ? 'w-20' : 'w-64'}
          ${isMobile ? (isMobileOpen ? 'left-0' : '-left-64') : 'left-0'}
          border-r border-gray-800
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center space-x-3 min-w-0">
            <Link href="/" className="flex items-center space-x-3 no-underline hover:no-underline min-w-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-black">G</span>
              </div>
              {(!isCollapsed || isMobile) && (
                <h1 className="text-xl font-bold text-white truncate">
                  GymShop {isMobile && <span className="text-sm text-gray-400">Admin</span>}
                </h1>
              )}
            </Link>
          </div>

          {/* Botão de fechar (mobile) e toggle (desktop) */}
          <div className="flex items-center gap-2">
            {isMobile ? (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <X size={20} className="text-gray-400" />
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 hidden lg:block"
              >
                {isCollapsed ? (
                  <ChevronRight size={20} className="text-gray-400" />
                ) : (
                  <ChevronLeft size={20} className="text-gray-400" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`
                  w-full flex items-center rounded-lg px-3 py-3 transition-all duration-200
                  ${isActive 
                    ? 'bg-green-500 text-black font-semibold' 
                    : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }
                  ${(isCollapsed && !isMobile) ? 'justify-center' : ''}
                  group
                `}
                title={(isCollapsed && !isMobile) ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <span className="ml-3 font-medium truncate">{item.label}</span>
                )}
                
                {/* Tooltip para modo collapsed no desktop */}
                {(isCollapsed && !isMobile) && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          <Link 
            href="/profile" 
            className={`
              flex items-center no-underline hover:no-underline group
              ${(isCollapsed && !isMobile) ? 'justify-center' : 'space-x-3'}
            `}
            title={(isCollapsed && !isMobile) ? 'Administrador' : ''}
          >
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors duration-200">
              <User size={20} className="text-gray-300 group-hover:text-green-400" />
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">Administrador</p>
                <p className="text-xs text-gray-400 truncate group-hover:text-gray-300">admin@gymshop.ao</p>
              </div>
            )}
            
            {/* Tooltip para modo collapsed no desktop */}
            {(isCollapsed && !isMobile) && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Administrador
              </div>
            )}
          </Link>
          
          <button 
            className={`
              w-full mt-3 flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group
              ${(isCollapsed && !isMobile) ? 'justify-center p-2' : 'px-3 py-2'}
            `}
            title={(isCollapsed && !isMobile) ? 'Sair' : ''}
          >
            <LogOut size={16} className={`${(isCollapsed && !isMobile) ? '' : 'mr-3'} group-hover:text-red-400`} />
            {(!isCollapsed || isMobile) && <span className="group-hover:text-white">Sair</span>}
            
            {/* Tooltip para modo collapsed no desktop */}
            {(isCollapsed && !isMobile) && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Sair
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Adicionar padding ao conteúdo principal para mobile */}
      <style jsx>{`
        @media (max-width: 1023px) {
          :global(main) {
            padding-top: 1rem;
          }
        }
      `}</style>
    </>
  );
}