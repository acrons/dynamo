import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMobileMenuToggle: () => void;
  activeView?: string;
  onAddClient?: () => void;
  onAddInventory?: () => void;
  onAddInvoice?: () => void;
  onAddSale?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onMobileMenuToggle, activeView, onAddClient, onAddInventory, onAddInvoice, onAddSale }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {activeView === 'clients' && (
            <button
              onClick={onAddClient}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Clientes
            </button>
          )}
          {activeView === 'inventory' && (
            <button
              onClick={onAddInventory}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Ítem
            </button>
          )}
          {activeView === 'billing' && (
            <button
              onClick={onAddInvoice}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Factura
            </button>
          )}
          {activeView === 'sales' && (
            <button
              onClick={onAddSale}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Venta
            </button>
          )}
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;