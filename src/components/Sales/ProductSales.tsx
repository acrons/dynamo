import React from 'react';
import { mockSales, mockProductsAndServices, mockClients } from '../../data/mockData';

const ProductSales: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);

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
  const formatGs = (n: number) => `GS ${new Intl.NumberFormat('es-ES').format(Math.round(n))}`;

  const selectedProduct = React.useMemo(() => {
    return selectedProductId ? mockProductsAndServices.find(p => p.id === selectedProductId) || null : null;
  }, [selectedProductId]);

  const salesForSelected = React.useMemo(() => {
    if (!selectedProductId) return [] as {
      saleId: string;
      date: Date;
      clientName: string;
      quantity: number;
      revenue: number;
      itemsDetail: { quantity: number; unitPrice: number }[];
    }[];

    return mockSales
      .filter(s => s.items.some(i => i.productId === selectedProductId))
      .map(s => {
        const clientName = s.clientId ? (mockClients.find(c => c.id === s.clientId)?.fullName || 'Cliente sin nombre') : 'Sin cliente';
        const items = s.items.filter(i => i.productId === selectedProductId);
        const quantity = items.reduce((acc, i) => acc + i.quantity, 0);
        const revenue = items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
        return {
          saleId: s.id,
          date: s.date,
          clientName,
          quantity,
          revenue,
          itemsDetail: items.map(i => ({ quantity: i.quantity, unitPrice: i.unitPrice }))
        };
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [selectedProductId]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <tr
                  key={row.product.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProductId(row.product.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{row.units}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatGs(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedProductId(null)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-gray-500">Detalle de ventas</p>
                <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setSelectedProductId(null)}
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-4 border-b border-gray-100">
              <div className="bg-white rounded-lg">
                <p className="text-xs text-gray-500">Ingresos por este SKU</p>
                <p className="text-xl font-semibold">{formatGs(salesForSelected.reduce((a, r) => a + r.revenue, 0))}</p>
              </div>
              <div className="bg-white rounded-lg">
                <p className="text-xs text-gray-500">Unidades vendidas</p>
                <p className="text-xl font-semibold">{salesForSelected.reduce((a, r) => a + r.quantity, 0)}</p>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesForSelected.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-sm text-gray-500" colSpan={5}>No hay ventas registradas para este producto.</td>
                    </tr>
                  )}
                  {salesForSelected.map(r => (
                    <tr key={r.saleId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{r.saleId}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.clientName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-right">{new Intl.DateTimeFormat('es-ES').format(r.date)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{r.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatGs(r.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSales;


