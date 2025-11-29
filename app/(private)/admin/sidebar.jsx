// components/SidebarSimplified.js
'use client';

import { useState } from 'react';
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
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'products', label: 'Produtos', icon: ShoppingCart },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare },
  { id: 'calendar', label: 'Calendário', icon: Calendar },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export default function SidebarSimplified() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <span className="font-bold text-white">A</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-gray-800">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center rounded-lg px-3 py-3 transition-all ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Administrador</p>
              <p className="text-xs text-gray-400 truncate">admin@empresa.com</p>
            </div>
          )}
        </div>
        
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