import React from 'react';
import { mockInvoices, mockClients, mockProductsAndServices } from '../../data/mockData';

const currencyFormat = (amount: number, _currency: string) => `GS ${amount.toFixed(2)}`;

const statusLabel: Record<string, string> = {
  draft: 'borrador',
  sent: 'enviado',
  overdue: 'vencido',
  paid: 'pagado',
  void: 'anulado',
};

const Invoices: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Facturas Totales</p>
          <p className="text-2xl font-semibold mt-1">{mockInvoices.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Importe Pendiente</p>
          <p className="text-2xl font-semibold mt-1">
            {currencyFormat(
              mockInvoices.filter(i => i.status !== 'paid' && i.status !== 'void').reduce((acc, i) => acc + i.total, 0),
              'GS'
            )}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Cobradas</p>
          <p className="text-2xl font-semibold mt-1">{mockInvoices.filter(i => i.status === 'paid').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Facturas</h3>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvoices.map(inv => {
                const client = mockClients.find(c => c.id === inv.clientId);
                return (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client?.fullName ?? '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{inv.issueDate.toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{inv.dueDate.toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                        inv.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                        inv.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        inv.status === 'void' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {statusLabel[inv.status] ?? inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{currencyFormat(inv.total, inv.currency)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;


