import { useState, useMemo } from "preact/hooks";
import { mockSalesData } from "../data/mockData";
import {
  AnnualSalesChart,
  TopClientsChart,
  SalesByCategoryChart,
} from "./Charts";

interface ReportsProps {
  selectedYear: number;
  selectedMonth: string;
}

export function Reports({ selectedYear, selectedMonth }: ReportsProps) {
  const [activeReport, setActiveReport] = useState("ventas-mensual");

  // Filtrar datos según los filtros
  const filteredData = useMemo(() => {
    return mockSalesData.filter((sale) => {
      const yearMatch = !selectedYear || sale.año === selectedYear;
      const monthMatch = !selectedMonth || sale.mes === selectedMonth;
      return yearMatch && monthMatch;
    });
  }, [selectedYear, selectedMonth]);

  // Calcular estadísticas para reportes
  const reportStats = useMemo(() => {
    const totalVentas = filteredData.reduce((sum, sale) => sum + sale.monto, 0);
    const totalVentasBordado = filteredData
      .filter((sale) => sale.categoria === "Bordado")
      .reduce((sum, sale) => sum + sale.monto, 0);
    const totalVentasGrabado = filteredData
      .filter((sale) => sale.categoria === "Grabado")
      .reduce((sum, sale) => sum + sale.monto, 0);
    const totalVentasUV = filteredData
      .filter((sale) => sale.categoria === "UV")
      .reduce((sum, sale) => sum + sale.monto, 0);

    // Top clientes
    const clientMap = new Map();
    filteredData.forEach((sale) => {
      if (clientMap.has(sale.cliente)) {
        clientMap.set(sale.cliente, clientMap.get(sale.cliente) + sale.monto);
      } else {
        clientMap.set(sale.cliente, sale.monto);
      }
    });

    const topClients = Array.from(clientMap.entries())
      .map(([nombre, monto]) => ({ nombre, monto }))
      .sort((a, b) => b.monto - a.monto)
      .slice(0, 10);

    // Ventas por categoría
    const salesByCategory = [
      {
        categoria: "Grabado",
        monto: totalVentasGrabado,
        porcentaje: Math.round((totalVentasGrabado / totalVentas) * 100),
      },
      {
        categoria: "Bordado",
        monto: totalVentasBordado,
        porcentaje: Math.round((totalVentasBordado / totalVentas) * 100),
      },
      {
        categoria: "UV",
        monto: totalVentasUV,
        porcentaje: Math.round((totalVentasUV / totalVentas) * 100),
      },
    ].filter((item) => item.monto > 0);

    return {
      totalVentas,
      totalVentasBordado,
      totalVentasGrabado,
      totalVentasUV,
      topClients,
      salesByCategory,
      totalVentasCount: filteredData.length,
    };
  }, [filteredData]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PY").format(num);
  };

  const reportTypes = [
    {
      id: "ventas-mensual",
      title: "Reporte de Ventas Mensual",
      description: "Análisis detallado de ventas por mes",
      icon: "📊",
    },
    {
      id: "clientes",
      title: "Reporte de Clientes",
      description: "Top clientes y análisis de comportamiento",
      icon: "👥",
    },
    {
      id: "categorias",
      title: "Reporte de Categorías",
      description: "Distribución de ventas por categoría",
      icon: "📈",
    },
  ];

  const renderReportContent = () => {
    switch (activeReport) {
      case "ventas-mensual":
        return (
          <div className="space-y-6">
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-title">Total de Ventas</div>
                <div className="kpi-value">
                  {formatNumber(reportStats.totalVentas)}
                </div>
                <div className="kpi-subtitle">Guaraníes</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-title">Cantidad de Ventas</div>
                <div className="kpi-value">{reportStats.totalVentasCount}</div>
                <div className="kpi-subtitle">Transacciones</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-title">Promedio por Venta</div>
                <div className="kpi-value">
                  {formatNumber(
                    Math.round(
                      reportStats.totalVentas / reportStats.totalVentasCount
                    )
                  )}
                </div>
                <div className="kpi-subtitle">Guaraníes</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-title">Período</div>
                <div className="kpi-value">
                  {selectedMonth.charAt(0).toUpperCase() +
                    selectedMonth.slice(1)}{" "}
                  {selectedYear}
                </div>
                <div className="kpi-subtitle">Filtro aplicado</div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h3 className="chart-title">Ventas por Categoría</h3>
                <SalesByCategoryChart data={reportStats.salesByCategory} />
              </div>
            </div>
          </div>
        );

      case "clientes":
        return (
          <div className="space-y-6">
            <div className="chart-container">
              <h3 className="chart-title">Top 10 Clientes</h3>
              <TopClientsChart clients={reportStats.topClients} />
            </div>

            <div className="chart-container">
              <h3 className="chart-title">Detalle de Clientes</h3>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Posición</th>
                      <th>Cliente</th>
                      <th>Total Ventas</th>
                      <th>% del Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportStats.topClients.map((client, index) => (
                      <tr key={client.nombre}>
                        <td>
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            {index + 1}
                          </span>
                        </td>
                        <td className="font-medium">{client.nombre}</td>
                        <td className="font-semibold text-green-600">
                          {formatNumber(client.monto)} Gs.
                        </td>
                        <td>
                          {Math.round(
                            (client.monto / reportStats.totalVentas) * 100
                          )}
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "categorias":
        return (
          <div className="space-y-6">
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-title">Ventas por Grabado</div>
                <div className="kpi-value">
                  {formatNumber(reportStats.totalVentasGrabado)}
                </div>
                <div className="kpi-subtitle">
                  {Math.round(
                    (reportStats.totalVentasGrabado / reportStats.totalVentas) *
                      100
                  )}
                  % del total
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-title">Ventas por Bordado</div>
                <div className="kpi-value">
                  {formatNumber(reportStats.totalVentasBordado)}
                </div>
                <div className="kpi-subtitle">
                  {Math.round(
                    (reportStats.totalVentasBordado / reportStats.totalVentas) *
                      100
                  )}
                  % del total
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-title">Ventas por UV</div>
                <div className="kpi-value">
                  {formatNumber(reportStats.totalVentasUV)}
                </div>
                <div className="kpi-subtitle">
                  {Math.round(
                    (reportStats.totalVentasUV / reportStats.totalVentas) * 100
                  )}
                  % del total
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h3 className="chart-title">Distribución por Categorías</h3>
                <SalesByCategoryChart data={reportStats.salesByCategory} />
              </div>
            </div>

            <div className="chart-container">
              <h3 className="chart-title">Análisis Comparativo</h3>
              <div className="client-list">
                {reportStats.salesByCategory.map((category) => (
                  <div key={category.categoria} className="client-item">
                    <div className="client-avatar">
                      {category.categoria.charAt(0)}
                    </div>
                    <div className="client-info">
                      <div className="client-name">{category.categoria}</div>
                      <div className="client-type">
                        {category.porcentaje}% del total de ventas
                      </div>
                    </div>
                    <div className="client-stats">
                      <div className="client-sales">
                        {formatNumber(category.monto)} Gs.
                      </div>
                      <div className="client-count">Categoría principal</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Reporte no encontrado</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de Reportes - Nuevo Diseño */}
      <div className="reports-hero-section">
        <div className="reports-hero-header">
          <div className="reports-hero-icon">📊</div>
          <div className="reports-hero-text">
            <p className="reports-hero-subtitle">
              Acceda a análisis detallados y métricas avanzadas de su negocio
            </p>
          </div>
        </div>

        <div className="reports-navigation">
          {reportTypes.map((report, index) => (
            <div
              key={report.id}
              className={`report-nav-item ${
                activeReport === report.id ? "active" : ""
              }`}
              onClick={() => setActiveReport(report.id)}
            >
              <div className="report-nav-number">{index + 1}</div>
              <div className="report-nav-content">
                <div className="report-nav-icon">{report.icon}</div>
                <div className="report-nav-text">
                  <h4 className="report-nav-title">{report.title}</h4>
                  <p className="report-nav-description">{report.description}</p>
                </div>
              </div>
              <div className="report-nav-arrow">
                {activeReport === report.id ? "✓" : "→"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido del Reporte */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="chart-title">
            {reportTypes.find((r) => r.id === activeReport)?.title}
          </h2>
          <div className="text-sm text-gray-500">
            Datos filtrados:{" "}
            {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}{" "}
            {selectedYear}
          </div>
        </div>

        {renderReportContent()}
      </div>
    </div>
  );
}
