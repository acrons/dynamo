import React, { useMemo } from 'react';
import { mockSales } from '../../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AnnualSalesBar: React.FC = () => {
  const data = useMemo(() => {
    const byYear = new Map<number, number>();
    mockSales.forEach(s => {
      const y = s.date.getFullYear();
      const sum = s.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
      byYear.set(y, (byYear.get(y) ?? 0) + sum);
    });
    return Array.from(byYear.entries()).sort(([a],[b]) => a - b).map(([year, total]) => ({ year, total }));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ventas anuales</h3>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(v: number) => `GS ${v.toFixed(2)}`} />
            <Bar dataKey="total" fill="#0F172A" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnnualSalesBar;


