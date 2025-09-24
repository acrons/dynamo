interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export function KPICard({ title, value, subtitle }: KPICardProps) {
  return (
    <div className="kpi-card">
      <h3 className="kpi-title">{title}</h3>
      <div className="kpi-value">{value}</div>
      {subtitle && <p className="kpi-subtitle">{subtitle}</p>}
    </div>
  );
}
