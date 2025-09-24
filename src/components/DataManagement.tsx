import { useState } from "preact/hooks";
import { DataTable } from "./DataTable";
import { mockSalesData } from "../data/mockData";

interface DataManagementProps {
  filteredData: typeof mockSalesData;
}

export function DataManagement({ filteredData }: DataManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    cliente: "",
    tipoVenta: "Producto",
    categoria: "Grabado",
    monto: "",
    condicionPago: "Contado",
    fecha: "",
    mes: "",
    año: 2024,
  });

  const handleAddSale = () => {
    if (newSale.cliente && newSale.monto && newSale.fecha) {
      // Aquí se agregaría la nueva venta al sistema
      alert(
        `Nueva venta agregada para ${newSale.cliente} por ${newSale.monto} Gs.`
      );
      setShowAddForm(false);
      setNewSale({
        cliente: "",
        tipoVenta: "Producto",
        categoria: "Grabado",
        monto: "",
        condicionPago: "Contado",
        fecha: "",
        mes: "",
        año: 2024,
      });
    } else {
      alert("Por favor complete todos los campos obligatorios");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewSale((prev) => ({ ...prev, [field]: value }));
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PY").format(num);
  };

  // Calcular estadísticas de los datos
  const totalVentas = filteredData.reduce((sum, sale) => sum + sale.monto, 0);
  const totalRegistros = filteredData.length;
  const promedioVenta = totalRegistros > 0 ? totalVentas / totalRegistros : 0;

  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total de Registros</div>
          <div className="kpi-value">{totalRegistros}</div>
          <div className="kpi-subtitle">Ventas registradas</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Valor Total</div>
          <div className="kpi-value">{formatNumber(totalVentas)}</div>
          <div className="kpi-subtitle">Guaraníes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Promedio por Venta</div>
          <div className="kpi-value">
            {formatNumber(Math.round(promedioVenta))}
          </div>
          <div className="kpi-subtitle">Guaraníes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Última Actualización</div>
          <div className="kpi-value">
            {new Date().toLocaleDateString("es-PY")}
          </div>
          <div className="kpi-subtitle">Fecha</div>
        </div>
      </div>

      {/* Header con Botón Prominente */}
      <div className="data-management-hero">
        <div className="data-hero-content">
          <div className="data-hero-text">
            <h2 className="data-hero-title">Gestión de Datos</h2>
            <p className="data-hero-subtitle">
              Administre y visualice todas las ventas registradas en el sistema
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`data-add-button ${showAddForm ? "active" : ""}`}
          >
            <div className="add-button-icon">{showAddForm ? "✕" : "➕"}</div>
            <div className="add-button-text">
              <span className="add-button-title">
                {showAddForm ? "Cancelar" : "Agregar Venta"}
              </span>
              <span className="add-button-subtitle">
                {showAddForm ? "Cerrar formulario" : "Nueva transacción"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Formulario de Agregar Venta */}
      {showAddForm && (
        <div className="add-sale-form-container">
          <div className="add-form-header">
            <div className="add-form-icon">📝</div>
            <div className="add-form-title-section">
              <h3 className="add-form-title">Nueva Venta</h3>
              <p className="add-form-description">
                Complete los datos para registrar una nueva venta en el sistema
              </p>
            </div>
          </div>
          <div className="add-form-grid">
            <div className="add-form-field">
              <label className="add-form-label">Cliente *</label>
              <input
                type="text"
                value={newSale.cliente}
                onChange={(e) =>
                  handleInputChange(
                    "cliente",
                    (e.target as HTMLInputElement).value
                  )
                }
                className="add-form-input"
                placeholder="Nombre del cliente"
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Tipo de Venta</label>
              <select
                value={newSale.tipoVenta}
                onChange={(e) =>
                  handleInputChange(
                    "tipoVenta",
                    (e.target as HTMLSelectElement).value
                  )
                }
                className="add-form-select"
              >
                <option value="Producto">Producto</option>
                <option value="Servicio">Servicio</option>
              </select>
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Categoría</label>
              <select
                value={newSale.categoria}
                onChange={(e) =>
                  handleInputChange(
                    "categoria",
                    (e.target as HTMLSelectElement).value
                  )
                }
                className="add-form-select"
              >
                <option value="Grabado">Grabado</option>
                <option value="Bordado">Bordado</option>
                <option value="UV">UV</option>
              </select>
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Monto *</label>
              <input
                type="number"
                value={newSale.monto}
                onChange={(e) =>
                  handleInputChange(
                    "monto",
                    (e.target as HTMLInputElement).value
                  )
                }
                className="add-form-input"
                placeholder="Monto en guaraníes"
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Condición de Pago</label>
              <select
                value={newSale.condicionPago}
                onChange={(e) =>
                  handleInputChange(
                    "condicionPago",
                    (e.target as HTMLSelectElement).value
                  )
                }
                className="add-form-select"
              >
                <option value="Contado">Contado</option>
                <option value="Credito">Crédito</option>
              </select>
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Fecha *</label>
              <input
                type="date"
                value={newSale.fecha}
                onChange={(e) =>
                  handleInputChange(
                    "fecha",
                    (e.target as HTMLInputElement).value
                  )
                }
                className="add-form-input"
              />
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Mes</label>
              <select
                value={newSale.mes}
                onChange={(e) =>
                  handleInputChange(
                    "mes",
                    (e.target as HTMLSelectElement).value
                  )
                }
                className="add-form-select"
              >
                <option value="enero">Enero</option>
                <option value="febrero">Febrero</option>
                <option value="marzo">Marzo</option>
                <option value="abril">Abril</option>
                <option value="mayo">Mayo</option>
                <option value="junio">Junio</option>
                <option value="julio">Julio</option>
                <option value="agosto">Agosto</option>
                <option value="septiembre">Septiembre</option>
                <option value="octubre">Octubre</option>
                <option value="noviembre">Noviembre</option>
                <option value="diciembre">Diciembre</option>
              </select>
            </div>

            <div className="add-form-field">
              <label className="add-form-label">Año</label>
              <select
                value={newSale.año}
                onChange={(e) =>
                  handleInputChange(
                    "año",
                    (e.target as HTMLSelectElement).value
                  )
                }
                className="add-form-select"
              >
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
              </select>
            </div>
          </div>

          <div className="add-form-actions">
            <button onClick={handleAddSale} className="add-form-button-primary">
              <span className="mr-2">💾</span>
              Guardar Venta
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="add-form-button-secondary"
            >
              <span className="mr-2">✕</span>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="data-info-card">
        <div className="data-info-content">
          <div className="data-info-icon">ℹ️</div>
          <div className="data-info-text">
            <h4 className="data-info-title">Información sobre los datos</h4>
            <p className="data-info-description">
              Los datos mostrados incluyen todas las ventas registradas en el
              sistema. Puede agregar nuevas ventas usando el botón "Agregar
              Venta" o exportar los datos para análisis externos.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de datos */}
      <DataTable filteredData={filteredData} />
    </div>
  );
}
