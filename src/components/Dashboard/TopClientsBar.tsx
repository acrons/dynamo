import React, { useMemo } from 'react';
import { mockSales, mockClients } from '../../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TopClientsBar: React.FC = () => {
  const data = useMemo(() => {
    const totals = new Map<string, number>();
    mockSales.forEach(s => {
      const amount = s.items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
      const id = s.clientId ?? 'N/A';
      totals.set(id, (totals.get(id) ?? 0) + amount);
    });
    const rows = Array.from(totals.entries()).map(([clientId, value]) => ({
      name: mockClients.find(c => c.id === clientId)?.fullName ?? 'Sin cliente',
      value
    }));
    return rows.sort((a,b) => b.value - a.value).slice(0, 10);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Top 10 clientes</h3>
      <div style={{ width: '100%', height: 360 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={160} />
            <Tooltip formatter={(v: number) => `GS ${v.toFixed(2)}`} />
            <Bar dataKey="value" fill="#0F172A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopClientsBar;


