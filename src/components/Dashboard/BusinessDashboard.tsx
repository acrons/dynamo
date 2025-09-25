import React, { useMemo } from 'react';
import { mockInvoices, mockSales, mockProductsAndServices } from '../../data/mockData';
import MonthlySalesChart from './MonthlySalesChart';
import ARByStatusChart from './ARByStatusChart';
import AnnualSalesBar from './AnnualSalesBar';
import TopClientsBar from './TopClientsBar';
import SalesByPaymentBar from './SalesByPaymentBar';
import SalesByCategoryPie from './SalesByCategoryPie';

const formatGs = (n: number) => `GS ${new Intl.NumberFormat('es-ES').format(Math.round(n))}`;

const BusinessDashboard: React.FC = () => {
  const metrics = useMemo(() => {
    const totalSales = mockSales.reduce((acc, s) => acc + s.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0), 0);
    const invoicesPending = mockInvoices.filter(i => i.status === 'sent' || i.status === 'overdue' || i.status === 'draft');
    const ar = invoicesPending.reduce((acc, i) => acc + i.total, 0);
    const paid = mockInvoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.total, 0);

    // Totales por categoría
    const totalsByCategory: Record<'Bordado' | 'Grabado' | 'UV', number> = { Bordado: 0, Grabado: 0, UV: 0 };
    const orderHasCategory: Record<'Bordado' | 'Grabado' | 'UV', number> = { Bordado: 0, Grabado: 0, UV: 0 };
    mockSales.forEach(s => {
      const categoriesInOrder = new Set<string>();
      s.items.forEach(i => {
        const cat = (mockProductsAndServices.find(p => p.id === i.productId)?.salesCategory ?? 'Grabado') as 'Bordado' | 'Grabado' | 'UV';
        totalsByCategory[cat] += i.unitPrice * i.quantity;
        categoriesInOrder.add(cat);
      });
      categoriesInOrder.forEach(c => {
        const key = c as 'Bordado' | 'Grabado' | 'UV';
        orderHasCategory[key] += 1;
      });
    });

    return {
      totalSales,
      ar,
      paid,
      totalsByCategory,
      orderHasCategory,
      avgMonthly: totalSales / 12,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Fila 1: 4 totales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Total de ventas en GS.</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{formatGs(metrics.totalSales)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Total de ventas en GS. por Bordado</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{formatGs(metrics.totalsByCategory.Bordado)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Total de ventas en GS. por Grabado</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{formatGs(metrics.totalsByCategory.Grabado)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Total de ventas en GS. por UV</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{formatGs(metrics.totalsByCategory.UV)}</p>
        </div>
      </div>

      {/* Fila 2: 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700">Ventas promedio mensual</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{formatGs(metrics.avgMonthly)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700">Cantidad de ventas por Bordado</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{metrics.orderHasCategory.Bordado}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700">Cantidad de venta por Grabado</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{metrics.orderHasCategory.Grabado}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700">Cantidad de venta por UV</p>
          <p className="text-2xl font-semibold mt-2 text-gray-900">{metrics.orderHasCategory.UV}</p>
        </div>
      </div>

      {/* Fila 3: Ventas anuales y Top 10 clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnnualSalesBar />
        <TopClientsBar />
      </div>

      {/* Fila 4: Condición de pago y categoría */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByPaymentBar />
        <SalesByCategoryPie />
      </div>
    </div>
  );
};

export default BusinessDashboard;


