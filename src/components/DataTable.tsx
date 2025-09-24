import { mockSalesData } from '../data/mockData';

interface DataTableProps {
  filteredData: typeof mockSalesData;
}

export function DataTable({ filteredData }: DataTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-PY').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PY');
  };

  return (
    <div className="data-table-container">
      <h2 className="chart-title">Datos de Ventas</h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Tipo de Venta</th>
              <th>Categoría</th>
              <th>Monto (Gs.)</th>
              <th>Condición de Pago</th>
              <th>Fecha</th>
              <th>Mes</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.cliente}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: sale.tipoVenta === 'Producto' ? '#f0fdf4' : '#fef3c7',
                    color: sale.tipoVenta === 'Producto' ? '#166534' : '#92400e'
                  }}>
                    {sale.tipoVenta}
                  </span>
                </td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: sale.categoria === 'Grabado' ? '#f0fdf4' : 
                               sale.categoria === 'Bordado' ? '#fef3c7' : '#f0f9ff',
                    color: sale.categoria === 'Grabado' ? '#166534' : 
                           sale.categoria === 'Bordado' ? '#92400e' : '#1e40af'
                  }}>
                    {sale.categoria}
                  </span>
                </td>
                <td style={{ fontWeight: '600', color: '#059669' }}>
                  {formatNumber(sale.monto)}
                </td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: '#f0fdf4',
                    color: '#166534'
                  }}>
                    {sale.condicionPago}
                  </span>
                </td>
                <td>{formatDate(sale.fecha)}</td>
                <td style={{ textTransform: 'capitalize' }}>{sale.mes}</td>
                <td>{sale.año}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#f8fafc', 
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#64748b'
      }}>
        <strong>Total de registros:</strong> {filteredData.length} ventas
      </div>
    </div>
  );
}
