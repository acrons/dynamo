import React, { useMemo } from 'react';
import { mockSales } from '../../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const SalesByPaymentBar: React.FC = () => {
  const data = useMemo(() => {
    const sums: Record<string, number> = {};
    mockSales.forEach(s => {
      const key = s.paymentCondition ?? 'Contado';
      const amount = s.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
      sums[key] = (sums[key] ?? 0) + amount;
    });
    return Object.entries(sums).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ventas según condición de pago</h3>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v: number) => `GS ${v.toFixed(2)}`} />
            <Bar dataKey="value" fill="#0F172A" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByPaymentBar;


