import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions, ProposalStatus } from '../../types';
import { mockUsers } from '../../data/mockData';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const statusOptions: { value: ProposalStatus; label: string }[] = [
  { value: 'enviada', label: 'Enviada' },
  { value: 'recibida', label: 'Recibida' },
  { value: 'leida', label: 'Leída' },
  { value: 'verificada', label: 'Verificada' },
  { value: 'aceptada', label: 'Aceptada' }
];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onClearFilters }) => {
  const hasActiveFilters = filters.status || filters.lawyer || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de Propuesta
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              status: e.target.value as ProposalStatus || undefined
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abogado Responsable
          </label>
          <select
            value={filters.lawyer || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              lawyer: e.target.value || undefined
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los abogados</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <input
            type="date"
            value={filters.dateFrom?.toISOString().split('T')[0] || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateFrom: e.target.value ? new Date(e.target.value) : undefined
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <input
            type="date"
            value={filters.dateTo?.toISOString().split('T')[0] || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateTo: e.target.value ? new Date(e.target.value) : undefined
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;