'use client';

import { useState } from 'react';
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
  PlusCircle 
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

export default function SidebarSimplified() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`bg-black text-white transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-3 no-underline hover:no-underline">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-black">G</span>
            </div>
            <h1 className="text-xl font-bold text-white">GymShop Admin</h1>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-black">G</span>
            </div>
          </Link>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} className="text-gray-400" /> : <ChevronLeft size={20} className="text-gray-400" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`w-full flex items-center rounded-lg px-3 py-3 transition-all duration-200 ${
                isActive 
                  ? 'bg-green-500 text-black font-semibold' 
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <Link 
          href="/profile" 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} no-underline hover:no-underline group`}
        >
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
            <User size={20} className="text-gray-300 group-hover:text-green-400" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">Administrador</p>
              <p className="text-xs text-gray-400 truncate group-hover:text-gray-300">admin@gymshop.ao</p>
            </div>
          )}
        </Link>
        
        <button 
          className={`w-full mt-3 flex items-center ${
            isCollapsed ? 'justify-center p-2' : 'px-3 py-2'
          } text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group`}
        >
          <LogOut size={16} className={`${isCollapsed ? '' : 'mr-3'} group-hover:text-red-400`} />
          {!isCollapsed && <span className="group-hover:text-white">Sair</span>}
        </button>
      </div>
    </div>
  );
}