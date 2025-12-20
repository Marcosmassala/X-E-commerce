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
  User
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'users', label: 'Usuários', icon: Users, path: '/users' },
  { id: 'products', label: 'Produtos', icon: ShoppingCart, path: '/produtos' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/estatisticas/' },
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
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-3 no-underline hover:no-underline">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin</h1>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
          </Link>
        )}
        <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-gray-800">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
              className={`w-full flex items-center rounded-lg px-3 py-3 transition-all ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <Link href="/profile" className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} no-underline hover:no-underline`}>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">Administrador</p>
              <p className="text-xs text-gray-400 truncate">admin@empresa.com</p>
            </div>
          )}
        </Link>
        
        <button className={`w-full mt-3 flex items-center ${
          isCollapsed ? 'justify-center p-2' : 'px-3 py-2'
        } text-gray-300 hover:bg-gray-800 rounded-lg`}>
          <LogOut size={16} className={isCollapsed ? '' : 'mr-3'} />
          {!isCollapsed && 'Sair'}
        </button>
      </div>
    </div>
  );
}