import React, { useMemo } from 'react';
import { mockInventory, mockProductsAndServices } from '../../data/mockData';

interface InventoryDashboardProps {
  onItemClick?: (inventoryId: string) => void;
}

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ onItemClick }) => {
  const rows = mockInventory.map(item => {
    const product = mockProductsAndServices.find(p => p.id === item.productId);
    const stockValue = (product?.unitPrice ?? 0) * item.quantityOnHand;
    const isLow = item.reorderPoint !== undefined && item.quantityOnHand <= item.reorderPoint;
    return { item, product, stockValue, isLow };
  });

  const kpis = useMemo(() => {
    const totalSkus = rows.length;
    const totalStock = rows.reduce((acc, r) => acc + r.item.quantityOnHand, 0);
    const lowStockSkus = rows.filter(r => r.isLow).length;
    const stockValue = rows.reduce((acc, r) => acc + r.stockValue, 0);
    return { totalSkus, totalStock, lowStockSkus, stockValue };
  }, [rows]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">SKUs</p>
          <p className="text-2xl font-semibold mt-1">{kpis.totalSkus}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Unidades en stock</p>
          <p className="text-2xl font-semibold mt-1">{kpis.totalStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Bajo stock</p>
          <p className="text-2xl font-semibold mt-1">{kpis.lowStockSkus}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Valor de stock</p>
          <p className="text-2xl font-semibold mt-1">GS {kpis.stockValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Inventario</h3>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reorden</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map(r => (
                <tr
                  key={r.item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onItemClick?.(r.item.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.product?.sku ?? '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.product?.name ?? '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{r.item.quantityOnHand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{r.item.reorderPoint ?? '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">GS {r.stockValue.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.item.updatedAt.toLocaleDateString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;


