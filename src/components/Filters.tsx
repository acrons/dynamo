import { ClientList } from "./ClientList";

interface FiltersProps {
  selectedYear: number;
  selectedMonth: string;
  selectedTipoVenta: string;
  selectedCliente: string;
  onYearChange: (year: number) => void;
  onMonthChange: (month: string) => void;
  onTipoVentaChange: (tipo: string) => void;
  onClienteChange: (cliente: string) => void;
}

export function Filters({
  selectedYear,
  selectedMonth,
  selectedTipoVenta,
  selectedCliente,
  onYearChange,
  onMonthChange,
  onTipoVentaChange,
  onClienteChange,
}: FiltersProps) {
  const years = [2021, 2022, 2023, 2024];
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const tiposVenta = ["Producto", "Servicio"];

  return (
    <>
      <div className="filters-container">
        <h2 className="filters-title">Filtros</h2>

        {/* Año */}
        <div className="filter-section">
          <h3 className="filter-label">Año</h3>
          <div className="filter-buttons">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`filter-button ${
                  selectedYear === year
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Mes */}
        <div className="filter-section">
          <h3 className="filter-label">Mes</h3>
          <div className="filter-buttons">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => onMonthChange(month)}
                className={`filter-button ${
                  selectedMonth === month
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}
              >
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Venta */}
        <div className="filter-section">
          <h3 className="filter-label">Tipo de venta</h3>
          <div className="filter-buttons">
            {tiposVenta.map((tipo) => (
              <button
                key={tipo}
                onClick={() => onTipoVentaChange(tipo)}
                className={`filter-button ${
                  selectedTipoVenta === tipo
                    ? "filter-button-active"
                    : "filter-button-inactive"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Clientes Moderna */}
      <ClientList
        selectedCliente={selectedCliente}
        onClienteChange={onClienteChange}
      />
    </>
  );
}
