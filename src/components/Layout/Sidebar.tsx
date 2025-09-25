import React from 'react';
import { Users, BarChart3, Settings, FileText, ShoppingCart, Boxes, LogOut } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'billing', label: 'Facturación', icon: FileText },
    { id: 'sales', label: 'Ventas', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventarios', icon: Boxes },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <img
          src="https://dynamo.com.py/wp-content/uploads/2023/04/DYNAMO.jpg"
          alt="Logo Estudio"
          className="w-28 h-auto object-contain"
        />
      </div>
      
      <nav className="flex-1 p-3">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-2 transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQF4v-CHMPRL1g/profile-displayphoto-shrink_400_400/B4DZTgyR59HAAg-/0/1738938065360?e=1761782400&v=beta&t=QozR7KY5lsN29H6kdnr1lRzHF7AQBpUmCw8j4DBAErc"
            alt="Marcelo Mazzoleni"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800">Marcelo Mazzoleni</p>
            <p className="text-sm text-gray-600">Consultor Senior</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-4 w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={16} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;