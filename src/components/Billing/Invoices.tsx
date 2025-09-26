import React, { useState } from 'react';
import { mockInvoices, mockClients, mockProductsAndServices } from '../../data/mockData';
import { Invoice } from '../../types';

const currencyFormat = (amount: number, _currency: string) => `GS ${amount.toFixed(2)}`;

const statusLabel: Record<string, string> = {
  draft: 'borrador',
  sent: 'enviado',
  overdue: 'vencido',
  paid: 'pagado',
  void: 'anulado',
};

const Invoices: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const close = () => setSelectedInvoice(null);

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
                  <tr
                    key={inv.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedInvoice(inv)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedInvoice(inv); }}
                  >
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
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/40" onClick={close} />
          <div
            className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Factura {selectedInvoice.number}</h3>
                <p className="text-sm text-gray-600">Emitida el {selectedInvoice.issueDate.toLocaleDateString('es-ES')} • Vence el {selectedInvoice.dueDate.toLocaleDateString('es-ES')}</p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={close}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                {(() => {
                  const client = mockClients.find(c => c.id === selectedInvoice.clientId);
                  return (
                    <p className="text-sm text-gray-700">Cliente: <span className="font-medium text-gray-900">{client?.fullName ?? '—'}</span></p>
                  );
                })()}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                  selectedInvoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                  selectedInvoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  selectedInvoice.status === 'void' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {({ draft: 'borrador', sent: 'enviado', overdue: 'vencido', paid: 'pagado', void: 'anulado' } as Record<string, string>)[selectedInvoice.status] ?? selectedInvoice.status}
                </span>
              </div>

              <div className="overflow-auto border border-gray-200 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ítem</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cant.</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInvoice.items.map((it, idx) => {
                      const prod = mockProductsAndServices.find(p => p.id === it.productId);
                      const lineTotal = it.quantity * it.unitPrice;
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{prod?.name ?? it.productId}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{it.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{currencyFormat(it.unitPrice, selectedInvoice.currency)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{currencyFormat(lineTotal, selectedInvoice.currency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <div className="flex justify-between w-full max-w-sm text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{currencyFormat(selectedInvoice.subtotal, selectedInvoice.currency)}</span>
                </div>
                <div className="flex justify-between w-full max-w-sm text-sm">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="text-gray-900">{currencyFormat(selectedInvoice.tax, selectedInvoice.currency)}</span>
                </div>
                <div className="flex justify-between w-full max-w-sm text-base font-semibold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-900">{currencyFormat(selectedInvoice.total, selectedInvoice.currency)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={close}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;


