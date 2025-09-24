import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnnualSalesChartProps {
  data: { [key: number]: number };
}

export function AnnualSalesChart({ data }: AnnualSalesChartProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Ventas Anuales (Gs.)",
        data: Object.values(data),
        backgroundColor: "#16a34a",
        borderColor: "#15803d",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "VENTAS ANUALES",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return new Intl.NumberFormat("es-PY").format(value);
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

interface TopClientsChartProps {
  clients: Array<{ nombre: string; monto: number }>;
}

export function TopClientsChart({ clients }: TopClientsChartProps) {
  const chartData = {
    labels: clients.map((client) => client.nombre),
    datasets: [
      {
        label: "Ventas (Gs.)",
        data: clients.map((client) => client.monto),
        backgroundColor: "#16a34a",
        borderColor: "#15803d",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "TOP 10 CLIENTES",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return new Intl.NumberFormat("es-PY").format(value);
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

interface SalesByPaymentChartProps {
  data: Array<{ condicion: string; monto: number }>;
}

export function SalesByPaymentChart({ data }: SalesByPaymentChartProps) {
  const chartData = {
    labels: data.map((item) => item.condicion),
    datasets: [
      {
        label: "Ventas (Gs.)",
        data: data.map((item) => item.monto),
        backgroundColor: "#16a34a",
        borderColor: "#15803d",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "VENTAS SEGÚN CONDICIÓN DE PAGO",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return new Intl.NumberFormat("es-PY").format(value);
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

interface SalesByCategoryChartProps {
  data: Array<{ categoria: string; monto: number; porcentaje: number }>;
}

export function SalesByCategoryChart({ data }: SalesByCategoryChartProps) {
  const chartData = {
    labels: data.map((item) => item.categoria),
    datasets: [
      {
        data: data.map((item) => item.monto),
        backgroundColor: [
          "#16a34a", // Verde oscuro para Grabado
          "#22c55e", // Verde claro para Bordado
          "#4ade80", // Verde más claro para UV
        ],
        borderColor: ["#15803d", "#16a34a", "#22c55e"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const percentage = data.percentageData
                  ? data.percentageData[i]
                  : 0;
                return {
                  text: `${label}: ${new Intl.NumberFormat("es-PY").format(
                    value
                  )} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: "VENTA SEGÚN CATEGORÍA",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
    },
  };

  // Agregar datos de porcentaje para el tooltip
  (chartData as any).percentageData = data.map((item) => item.porcentaje);

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  );
}
