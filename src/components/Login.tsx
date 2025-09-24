import { useState } from "preact/hooks";

interface LoginProps {
  onLogin: (user: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Login mockeado - cualquier usuario/contraseña funciona
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      setError("Por favor ingrese usuario y contraseña");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div>DY</div>
            <div>NA</div>
            <div>MO</div>
          </div>
          <h1 className="login-title">DYNAMO</h1>
          <p className="login-subtitle">Sistema de Reportes de Ventas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername((e.target as HTMLInputElement).value)
              }
              className="form-input"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              className="form-input"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="form-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="demo-text">
          Demo: Use cualquier usuario y contraseña para acceder
        </div>
      </div>
    </div>
  );
}
