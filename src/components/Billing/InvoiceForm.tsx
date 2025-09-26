import React from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Client, Invoice, SaleLineItem } from '../../types';
import { mockClients, mockProductsAndServices } from '../../data/mockData';

interface InvoiceFormProps {
  onCancel: () => void;
  onSaved?: (invoice: Invoice) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onCancel, onSaved }) => {
  const [number, setNumber] = React.useState('');
  const [clientId, setClientId] = React.useState('');
  const [issueDate, setIssueDate] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');
  const [status, setStatus] = React.useState<Invoice['status']>('draft');
  const [currency, setCurrency] = React.useState<Invoice['currency']>('EUR');
  const [items, setItems] = React.useState<SaleLineItem[]>([
    { productId: '', quantity: 1, unitPrice: 0 }
  ]);

  const handleAddItem = () => {
    setItems(prev => [...prev, { productId: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (idx: number) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, patch: Partial<SaleLineItem>) => {
    setItems(prev => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0);
  const tax = 0; // Ajusta si corresponde
  const total = subtotal + tax;

  const formatGs = (n: number) => `GS ${new Intl.NumberFormat('es-ES').format(Math.round(n))}`;

  const canSave = number.trim() && clientId && issueDate && dueDate && items.length > 0 && items.every(it => it.productId && it.quantity > 0 && it.unitPrice >= 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      number,
      clientId,
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      status,
      items,
      subtotal,
      tax,
      total,
      currency,
    };
    if (onSaved) onSaved(invoice);
    alert('Factura creada');
    onCancel();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Nueva Factura</h2>
            <p className="text-gray-600">Complete los campos básicos y líneas</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X size={16} />
              Cancelar
            </button>
            <button
              type="submit"
              form="invoice-form"
              disabled={!canSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} />
              Guardar Factura
            </button>
          </div>
        </div>

        <form id="invoice-form" onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Ej: F-2025-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar cliente</option>
                {mockClients.map((c: Client) => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de emisión</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Invoice['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Borrador</option>
                <option value="sent">Enviada</option>
                <option value="paid">Pagada</option>
                <option value="overdue">Vencida</option>
                <option value="void">Anulada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Invoice['currency'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
                <option value="MXN">MXN</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Líneas</h3>
              <button type="button" onClick={handleAddItem} className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
                <Plus size={16} /> Agregar línea
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto/Servicio</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">
                        <select
                          value={it.productId}
                          onChange={(e) => updateItem(idx, { productId: e.target.value, unitPrice: mockProductsAndServices.find(p => p.id === e.target.value)?.unitPrice || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Seleccionar</option>
                          {mockProductsAndServices.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <input
                          type="number"
                          min={1}
                          value={it.quantity}
                          onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })}
                          className="w-24 text-right px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <input
                          type="number"
                          min={0}
                          value={it.unitPrice}
                          onChange={(e) => updateItem(idx, { unitPrice: Number(e.target.value) })}
                          className="w-32 text-right px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </td>
                      <td className="px-4 py-2 text-right text-sm text-gray-900">
                        {formatGs((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0))}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500">Subtotal</p>
              <p className="text-lg font-semibold">{formatGs(subtotal)}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500">Impuestos</p>
              <p className="text-lg font-semibold">{formatGs(tax)}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-semibold">{formatGs(total)}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;



