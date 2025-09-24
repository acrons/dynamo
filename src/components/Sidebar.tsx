interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: string;
  onLogout: () => void;
}

export function Sidebar({
  activeSection,
  onSectionChange,
  user,
  onLogout,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "datos", label: "Facturación", icon: "💳" },
    { id: "reportes", label: "Reportes", icon: "📊" },
    { id: "inventario", label: "Inventario", icon: "📦" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <div>DY</div>
            <div>NA</div>
            <div>MO</div>
          </div>
          <div className="sidebar-logo-text">DYNAMO</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user.charAt(0).toUpperCase()}</div>
          <div className="user-name">{user}</div>
        </div>
        <button onClick={onLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
