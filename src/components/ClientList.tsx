import { useState, useMemo } from "preact/hooks";
import { mockSalesData } from "../data/mockData";

interface ClientListProps {
  selectedCliente: string;
  onClienteChange: (cliente: string) => void;
}

export function ClientList({
  selectedCliente,
  onClienteChange,
}: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener clientes únicos con estadísticas
  const clientsWithStats = useMemo(() => {
    const clientMap = new Map();

    mockSalesData.forEach((sale) => {
      if (clientMap.has(sale.cliente)) {
        const existing = clientMap.get(sale.cliente);
        existing.totalSales += sale.monto;
        existing.count += 1;
      } else {
        clientMap.set(sale.cliente, {
          name: sale.cliente,
          totalSales: sale.monto,
          count: 1,
          firstLetter: sale.cliente.charAt(0).toUpperCase(),
        });
      }
    });

    return Array.from(clientMap.values()).sort(
      (a, b) => b.totalSales - a.totalSales
    );
  }, []);

  // Filtrar clientes por término de búsqueda
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return clientsWithStats;

    return clientsWithStats.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clientsWithStats, searchTerm]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PY").format(num);
  };

  return (
    <div className="client-list-container">
      <h3 className="client-list-title">Clientes</h3>

      <div className="client-search">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          className="client-search-input"
        />
      </div>

      <div className="client-list">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div
              key={client.name}
              className={`client-item ${
                selectedCliente === client.name ? "selected" : ""
              }`}
              onClick={() => onClienteChange(client.name)}
            >
              <div className="client-avatar">{client.firstLetter}</div>

              <div className="client-info">
                <div className="client-name">{client.name}</div>
                <div className="client-type">
                  {client.count} {client.count === 1 ? "venta" : "ventas"}
                </div>
              </div>

              <div className="client-stats">
                <div className="client-sales">
                  {formatNumber(client.totalSales)} Gs.
                </div>
                <div className="client-count">
                  Promedio:{" "}
                  {formatNumber(Math.round(client.totalSales / client.count))}{" "}
                  Gs.
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="client-list-empty">
            <div className="client-list-empty-icon">🔍</div>
            <div className="client-list-empty-text">
              No se encontraron clientes
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
