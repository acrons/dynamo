import { useState, useMemo } from "preact/hooks";
import { KPICard } from "./KPICard";
import { Filters } from "./Filters";
import { Sidebar } from "./Sidebar";
import { DataTable } from "./DataTable";
import { DataManagement } from "./DataManagement";
import { Reports } from "./Reports";
import {
  AnnualSalesChart,
  TopClientsChart,
  SalesByPaymentChart,
  SalesByCategoryChart,
} from "./Charts";
import {
  mockSalesData,
  mockKPIData,
  mockTopClients,
  mockSalesByCategory,
  mockSalesByPayment,
  mockAnnualSales,
} from "../data/mockData";

interface DashboardProps {
  user: string;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("febrero");
  const [selectedTipoVenta, setSelectedTipoVenta] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");

  // Filtrar datos según los filtros seleccionados
  const filteredData = useMemo(() => {
    return mockSalesData.filter((sale) => {
      const yearMatch = !selectedYear || sale.año === selectedYear;
      const monthMatch = !selectedMonth || sale.mes === selectedMonth;
      const tipoMatch =
        !selectedTipoVenta || sale.tipoVenta === selectedTipoVenta;
      const clienteMatch = !selectedCliente || sale.cliente === selectedCliente;

      return yearMatch && monthMatch && tipoMatch && clienteMatch;
    });
  }, [selectedYear, selectedMonth, selectedTipoVenta, selectedCliente]);

  // Calcular KPIs basados en datos filtrados
  const calculatedKPIs = useMemo(() => {
    const totalVentas = filteredData.reduce((sum, sale) => sum + sale.monto, 0);
    const totalBordado = filteredData
      .filter((sale) => sale.categoria === "Bordado")
      .reduce((sum, sale) => sum + sale.monto, 0);
    const totalGrabado = filteredData
      .filter((sale) => sale.categoria === "Grabado")
      .reduce((sum, sale) => sum + sale.monto, 0);
    const totalUV = filteredData
      .filter((sale) => sale.categoria === "UV")
      .reduce((sum, sale) => sum + sale.monto, 0);

    return {
      totalVentas,
      totalBordado,
      totalGrabado,
      totalUV,
      ventasPromedioMensual: mockKPIData.ventasPromedioMensual,
      cantidadBordado: filteredData.filter(
        (sale) => sale.categoria === "Bordado"
      ).length,
      cantidadGrabado: filteredData.filter(
        (sale) => sale.categoria === "Grabado"
      ).length,
      cantidadUV: filteredData.filter((sale) => sale.categoria === "UV").length,
    };
  }, [filteredData]);

  // Formatear números con separadores de miles
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PY").format(num);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            {/* KPIs principales */}
            <div className="kpi-grid">
              <KPICard
                title="TOTAL DE VENTAS EN GS."
                value={formatNumber(calculatedKPIs.totalVentas)}
              />
              <KPICard
                title="TOTAL DE VENTAS EN GS. POR BORDADO"
                value={formatNumber(calculatedKPIs.totalBordado)}
              />
              <KPICard
                title="TOTAL DE VENTAS EN GS. POR GRABADO"
                value={formatNumber(calculatedKPIs.totalGrabado)}
              />
              <KPICard
                title="TOTAL DE VENTAS EN GS. POR UV"
                value={formatNumber(calculatedKPIs.totalUV)}
              />
            </div>

            {/* KPIs secundarios */}
            <div className="kpi-grid">
              <KPICard
                title="Ventas promedio mensual"
                value={formatNumber(calculatedKPIs.ventasPromedioMensual)}
              />
              <KPICard
                title="Cantidad de ventas por Bordado"
                value={calculatedKPIs.cantidadBordado.toString()}
              />
              <KPICard
                title="Cantidad de venta por Grabado"
                value={calculatedKPIs.cantidadGrabado.toString()}
              />
              <KPICard
                title="Cantidad de venta por UV"
                value={calculatedKPIs.cantidadUV.toString()}
              />
            </div>

            {/* Gráficas */}
            <div className="charts-grid">
              <AnnualSalesChart data={mockAnnualSales} />
              <TopClientsChart clients={mockTopClients} />
            </div>

            <div className="charts-grid">
              <SalesByPaymentChart data={mockSalesByPayment} />
              <SalesByCategoryChart data={mockSalesByCategory} />
            </div>

            {/* Footer con información adicional */}
            <div className="chart-container text-center">
              <p className="text-lg font-semibold text-gray-600">
                VENTAS ANUALES (EN MILLONES DE GS.) -{" "}
                {formatNumber(calculatedKPIs.totalVentas / 1000000)}
              </p>
            </div>
          </>
        );

      case "datos":
        return <DataManagement filteredData={filteredData} />;

      case "reportes":
        return (
          <Reports selectedYear={selectedYear} selectedMonth={selectedMonth} />
        );

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={onLogout}
      />

      <div className="main-content">
        <div className="content-header">
          <h1 className="content-title">
            {activeSection === "dashboard" && "Dashboard de Ventas"}
            {activeSection === "datos" && "Datos"}
            {activeSection === "reportes" && "Reportes"}
          </h1>
          <p className="content-subtitle">
            {activeSection === "dashboard" &&
              "Análisis completo de ventas y métricas clave"}
            {activeSection === "datos" &&
              "Gestión y visualización de datos de ventas"}
            {activeSection === "reportes" &&
              "Generación y visualización de reportes"}
          </p>
        </div>

        <div className="content-body">
          {activeSection === "dashboard" && (
            <Filters
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedTipoVenta={selectedTipoVenta}
              selectedCliente={selectedCliente}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
              onTipoVentaChange={setSelectedTipoVenta}
              onClienteChange={setSelectedCliente}
            />
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
