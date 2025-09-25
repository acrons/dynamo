import React from 'react';
import { mockSales, mockProductsAndServices } from '../../data/mockData';

const ProductSales: React.FC = () => {
  const salesByProduct = mockProductsAndServices.map(p => {
    const sales = mockSales.flatMap(s => s.items.filter(i => i.productId === p.id));
    const units = sales.reduce((acc, i) => acc + i.quantity, 0);
    const revenue = sales.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
    return { product: p, units, revenue };
  }).sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = salesByProduct.reduce((acc, r) => acc + r.revenue, 0);
  const totalUnits = salesByProduct.reduce((acc, r) => acc + r.units, 0);
  const skusSold = salesByProduct.filter(r => r.units > 0).length;
  const avgRevenuePerSku = skusSold > 0 ? totalRevenue / skusSold : 0;
  const topProduct = salesByProduct[0]?.product.name ?? '—';
  const topRevenue = salesByProduct[0]?.revenue ?? 0;
  const formatGs = (n: number) => `GS ${new Intl.NumberFormat('es-ES').format(Math.round(n))}`;

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Ingresos totales</p>
            <p className="text-2xl font-semibold mt-1">{formatGs(totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Unidades vendidas</p>
            <p className="text-2xl font-semibold mt-1">{totalUnits}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">SKUs con ventas</p>
            <p className="text-2xl font-semibold mt-1">{skusSold}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Ticket promedio por SKU</p>
            <p className="text-2xl font-semibold mt-1">{formatGs(avgRevenuePerSku)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Top producto por ingresos</p>
            <p className="text-lg font-semibold mt-1 text-gray-900">{topProduct}</p>
            <p className="text-sm text-gray-600">{formatGs(topRevenue)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Promedio de unidades por SKU</p>
            <p className="text-2xl font-semibold mt-1">{skusSold > 0 ? (totalUnits / skusSold).toFixed(1) : '0.0'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto/Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesByProduct.map(row => (
                <tr key={row.product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.units}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">GS {row.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSales;


