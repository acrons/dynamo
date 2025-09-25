import React, { useMemo } from 'react';
import { mockInvoices } from '../../data/mockData';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = {
  draft: '#F59E0B',
  sent: '#3B82F6',
  overdue: '#EF4444',
  paid: '#10B981',
  void: '#6B7280',
};

const STATUS_LABEL: Record<string, string> = {
  draft: 'borrador',
  sent: 'enviado',
  overdue: 'vencido',
  paid: 'pagado',
  void: 'anulado',
};

const ARByStatusChart: React.FC = () => {
  const data = useMemo(() => {
    const sums: Record<string, number> = { draft: 0, sent: 0, overdue: 0, paid: 0, void: 0 };
    mockInvoices.forEach(inv => {
      sums[inv.status] += inv.total;
    });
    return Object.entries(sums).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AR por estado de factura</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} innerRadius={40}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={(COLORS as any)[entry.name] || '#999'} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number, n: string) => [`GS ${v.toFixed(2)}`, STATUS_LABEL[n] ?? n]} />
            <Legend formatter={(value: string) => STATUS_LABEL[value] ?? value} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ARByStatusChart;


