import React, { useMemo } from 'react';
import { mockSales, mockProductsAndServices } from '../../data/mockData';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS: Record<string, string> = { Bordado: '#A3A3A3', Grabado: '#0F172A', UV: '#9CA3AF' };

const SalesByCategoryPie: React.FC = () => {
  const data = useMemo(() => {
    const sums: Record<string, number> = { Bordado: 0, Grabado: 0, UV: 0 };
    mockSales.forEach(s => {
      s.items.forEach(i => {
        const cat = mockProductsAndServices.find(p => p.id === i.productId)?.salesCategory ?? 'Grabado';
        sums[cat] += i.unitPrice * i.quantity;
      });
    });
    return Object.entries(sums).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Venta según categoría</h3>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={110}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#888'} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number, n: string) => [`GS ${v.toFixed(2)}`, n]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByCategoryPie;


