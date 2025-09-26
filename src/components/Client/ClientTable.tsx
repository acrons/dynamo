import React, { useEffect, useMemo, useState } from 'react';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Client, ProposalStatus } from '../../types';
import { mockSales, mockProductsAndServices } from '../../data/mockData';

interface ClientTableProps {
  clients: Client[];
  onClientClick: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ 
  clients, 
  onClientClick, 
  onEditClient, 
  onDeleteClient 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProposalStatus>('enviada');
  const [saleTypeFilter, setSaleTypeFilter] = useState<'all' | 'Servicio' | 'Producto'>('all');
  const [jobTypeFilter, setJobTypeFilter] = useState<'all' | 'Bordado' | 'Grabado' | 'UV'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'amount'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // Precalcular tipo de venta por cliente (Servicio o Producto) según CSV o ventas
  const saleTypeByClient = useMemo(() => {
    const map = new Map<string, string>();
    clients.forEach(c => {
      if (c.saleType) {
        map.set(c.id, c.saleType);
        return;
      }
      let serviceTotal = 0;
      let productTotal = 0;
      mockSales
        .filter(s => s.clientId === c.id)
        .forEach(s => {
          s.items.forEach(i => {
            const item = mockProductsAndServices.find(p => p.id === i.productId);
            if (!item) return;
            const amount = i.unitPrice * i.quantity;
            if (item.category === 'servicio') serviceTotal += amount;
            else productTotal += amount;
          });
        });
      if (serviceTotal === 0 && productTotal === 0) {
        map.set(c.id, '—');
      } else {
        map.set(c.id, serviceTotal >= productTotal ? 'Servicio' : 'Producto');
      }
    });
    return map;
  }, [clients]);

  // Precalcular tipo de trabajo (categoría de venta dominante: Bordado/Grabado/UV) por cliente
  const jobTypeByClient = useMemo(() => {
    const map = new Map<string, 'Bordado' | 'Grabado' | 'UV' | '—'>();
    clients.forEach(c => {
      const totals: Record<'Bordado' | 'Grabado' | 'UV', number> = { Bordado: 0, Grabado: 0, UV: 0 };
      mockSales
        .filter(s => s.clientId === c.id)
        .forEach(s => {
          s.items.forEach(i => {
            const item = mockProductsAndServices.find(p => p.id === i.productId);
            if (!item || !item.salesCategory) return;
            const amount = i.unitPrice * i.quantity;
            if (item.salesCategory === 'Bordado') totals.Bordado += amount;
            if (item.salesCategory === 'Grabado') totals.Grabado += amount;
            if (item.salesCategory === 'UV') totals.UV += amount;
          });
        });
      const entries = Object.entries(totals) as Array<['Bordado' | 'Grabado' | 'UV', number]>;
      const [topCategory, topAmount] = entries.reduce((acc, curr) => (curr[1] > acc[1] ? curr : acc), ['Bordado', 0]);
      if (topAmount === 0) {
        // Sin ventas históricas: intentar derivar desde CSV (interest contiene "Tipo de trabajo")
        const interestLower = (c.interest || '').toLowerCase();
        if (interestLower.includes('bordado')) map.set(c.id, 'Bordado');
        else if (interestLower.includes('grabado')) map.set(c.id, 'Grabado');
        else if (interestLower.includes('uv')) map.set(c.id, 'UV');
        else map.set(c.id, '—');
      } else {
        map.set(c.id, topCategory);
      }
    });
    return map;
  }, [clients]);

  // Filtrar y ordenar clientes
  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.interest.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = client.status === statusFilter;
      const currentSaleType = saleTypeByClient.get(client.id);
      const matchesSaleType = saleTypeFilter === 'all' || currentSaleType === saleTypeFilter;
      const currentJobType = jobTypeByClient.get(client.id);
      const matchesJobType = jobTypeFilter === 'all' || currentJobType === jobTypeFilter;
      return matchesSearch && matchesStatus && matchesSaleType && matchesJobType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'amount':
          comparison = (a.invoiceTotal ?? 0) - (b.invoiceTotal ?? 0);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Resetear página al cambiar filtros/búsqueda
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, saleTypeFilter, jobTypeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedClients.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const currentPageClients = filteredAndSortedClients.slice(startIdx, startIdx + pageSize);

  const handleSort = (field: 'name' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header con búsqueda y filtros */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProposalStatus)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="enviada">Enviada</option>
              <option value="recibida">Recibida</option>
              <option value="leida">Leída</option>
              <option value="verificada">Verificada</option>
              <option value="aceptada">Aceptada</option>
            </select>
            <select
              value={saleTypeFilter}
              onChange={(e) => setSaleTypeFilter(e.target.value as 'all' | 'Servicio' | 'Producto')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los tipos de venta</option>
              <option value="Servicio">Servicio</option>
              <option value="Producto">Producto</option>
            </select>
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value as 'all' | 'Bordado' | 'Grabado' | 'UV')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los tipos de trabajo</option>
              <option value="Bordado">Bordado</option>
              <option value="Grabado">Grabado</option>
              <option value="UV">UV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                Cliente
                {sortBy === 'name' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Venta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de trabajo
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('amount')}>
                Monto total de factura
                {sortBy === 'amount' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {client.profileImage ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={client.profileImage}
                          alt={client.fullName}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {client.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.fullName}</div>
                      <div className="text-sm text-gray-500">Captado por: {client.capturedBy}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {saleTypeByClient.get(client.id) ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jobTypeByClient.get(client.id) ?? '—'}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {typeof client.invoiceTotal === 'number' ? `GS ${new Intl.NumberFormat('es-ES').format(Math.round(client.invoiceTotal))}` : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onClientClick(client)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEditClient(client)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteClient(client.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con estadísticas */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Mostrando {filteredAndSortedClients.length === 0 ? 0 : startIdx + 1}-{Math.min(startIdx + pageSize, filteredAndSortedClients.length)} de {filteredAndSortedClients.length}
          </span>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 rounded border text-gray-700 hover:bg-white disabled:opacity-50"
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              className="px-3 py-1 rounded border text-gray-700 hover:bg-white disabled:opacity-50"
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTable; 