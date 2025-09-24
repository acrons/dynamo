import { useState } from "preact/hooks";

export function Configuration() {
  const [settings, setSettings] = useState({
    // Configuración de filtros
    defaultYear: 2024,
    defaultMonth: "febrero",
    showEmptyFilters: true,
    autoRefresh: false,
    refreshInterval: 30,

    // Configuración de gráficas
    chartAnimation: true,
    chartColors: "green",
    chartStyle: "modern",
    showDataLabels: true,

    // Configuración de datos
    dateFormat: "dd/mm/yyyy",
    numberFormat: "es-PY",
    currencySymbol: "Gs.",
    decimalPlaces: 0,

    // Configuración de interfaz
    theme: "light",
    language: "es",
    sidebarCollapsed: false,
    showTooltips: true,
  });

  const [activeTab, setActiveTab] = useState("filtros");

  const tabs = [
    { id: "filtros", label: "Filtros", icon: "🔍" },
    { id: "graficas", label: "Gráficas", icon: "📊" },
    { id: "datos", label: "Datos", icon: "📋" },
    { id: "interfaz", label: "Interfaz", icon: "🎨" },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings({
      defaultYear: 2024,
      defaultMonth: "febrero",
      showEmptyFilters: true,
      autoRefresh: false,
      refreshInterval: 30,
      chartAnimation: true,
      chartColors: "green",
      chartStyle: "modern",
      showDataLabels: true,
      dateFormat: "dd/mm/yyyy",
      numberFormat: "es-PY",
      currencySymbol: "Gs.",
      decimalPlaces: 0,
      theme: "light",
      language: "es",
      sidebarCollapsed: false,
      showTooltips: true,
    });
  };

  const saveSettings = () => {
    // Aquí se guardarían las configuraciones en localStorage o en un servidor
    localStorage.setItem("dynamo-settings", JSON.stringify(settings));
    alert("Configuraciones guardadas exitosamente");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "filtros":
        return (
          <div className="space-y-6">
            <div className="chart-container">
              <h3 className="chart-title">Configuración de Filtros</h3>
              <div className="space-y-4">
                <div className="config-setting">
                  <div className="config-setting-info">
                    <h4 className="config-setting-title">Año por defecto</h4>
                    <p className="config-setting-description">
                      Año que se selecciona automáticamente al cargar
                    </p>
                  </div>
                  <div className="config-control">
                    <select
                      value={settings.defaultYear}
                      onChange={(e) =>
                        handleSettingChange(
                          "defaultYear",
                          parseInt((e.target as HTMLSelectElement).value)
                        )
                      }
                      className="config-select"
                    >
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                      <option value={2023}>2023</option>
                      <option value={2024}>2024</option>
                    </select>
                  </div>
                </div>

                <div className="config-setting">
                  <div className="config-setting-info">
                    <h4 className="config-setting-title">Mes por defecto</h4>
                    <p className="config-setting-description">
                      Mes que se selecciona automáticamente al cargar
                    </p>
                  </div>
                  <div className="config-control">
                    <select
                      value={settings.defaultMonth}
                      onChange={(e) =>
                        handleSettingChange(
                          "defaultMonth",
                          (e.target as HTMLSelectElement).value
                        )
                      }
                      className="config-select"
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
                </div>

                <div className="config-setting">
                  <div className="config-setting-info">
                    <h4 className="config-setting-title">
                      Mostrar filtros vacíos
                    </h4>
                    <p className="config-setting-description">
                      Mostrar opciones de filtro aunque no tengan datos
                    </p>
                  </div>
                  <div className="config-control">
                    <label className="config-toggle">
                      <input
                        type="checkbox"
                        checked={settings.showEmptyFilters}
                        onChange={(e) =>
                          handleSettingChange(
                            "showEmptyFilters",
                            (e.target as HTMLInputElement).checked
                          )
                        }
                      />
                      <span className="config-toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="config-setting">
                  <div className="config-setting-info">
                    <h4 className="config-setting-title">
                      Actualización automática
                    </h4>
                    <p className="config-setting-description">
                      Actualizar datos automáticamente cada cierto tiempo
                    </p>
                  </div>
                  <div className="config-control">
                    <label className="config-toggle">
                      <input
                        type="checkbox"
                        checked={settings.autoRefresh}
                        onChange={(e) =>
                          handleSettingChange(
                            "autoRefresh",
                            (e.target as HTMLInputElement).checked
                          )
                        }
                      />
                      <span className="config-toggle-slider"></span>
                    </label>
                  </div>
                </div>

                {settings.autoRefresh && (
                  <div className="config-setting">
                    <div className="config-setting-info">
                      <h4 className="config-setting-title">
                        Intervalo de actualización
                      </h4>
                      <p className="config-setting-description">
                        Tiempo en segundos entre actualizaciones
                      </p>
                    </div>
                    <div className="config-control">
                      <input
                        type="number"
                        min="10"
                        max="300"
                        value={settings.refreshInterval}
                        onChange={(e) =>
                          handleSettingChange(
                            "refreshInterval",
                            parseInt((e.target as HTMLInputElement).value)
                          )
                        }
                        className="config-input"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "graficas":
        return (
          <div className="space-y-6">
            <div className="chart-container">
              <h3 className="chart-title">Configuración de Gráficas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Animaciones</h4>
                    <p className="text-sm text-gray-600">
                      Mostrar animaciones en las gráficas
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.chartAnimation}
                      onChange={(e) =>
                        handleSettingChange(
                          "chartAnimation",
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Esquema de colores
                    </h4>
                    <p className="text-sm text-gray-600">
                      Paleta de colores para las gráficas
                    </p>
                  </div>
                  <select
                    value={settings.chartColors}
                    onChange={(e) =>
                      handleSettingChange(
                        "chartColors",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="green">Verde (DYNAMO)</option>
                    <option value="blue">Azul</option>
                    <option value="purple">Morado</option>
                    <option value="orange">Naranja</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Estilo de gráfica
                    </h4>
                    <p className="text-sm text-gray-600">
                      Estilo visual de las gráficas
                    </p>
                  </div>
                  <select
                    value={settings.chartStyle}
                    onChange={(e) =>
                      handleSettingChange(
                        "chartStyle",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="modern">Moderno</option>
                    <option value="classic">Clásico</option>
                    <option value="minimal">Minimalista</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Mostrar etiquetas de datos
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mostrar valores directamente en las gráficas
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showDataLabels}
                      onChange={(e) =>
                        handleSettingChange(
                          "showDataLabels",
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "datos":
        return (
          <div className="space-y-6">
            <div className="chart-container">
              <h3 className="chart-title">Configuración de Datos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Formato de fecha
                    </h4>
                    <p className="text-sm text-gray-600">
                      Formato para mostrar fechas
                    </p>
                  </div>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) =>
                      handleSettingChange(
                        "dateFormat",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Formato de números
                    </h4>
                    <p className="text-sm text-gray-600">
                      Formato regional para números
                    </p>
                  </div>
                  <select
                    value={settings.numberFormat}
                    onChange={(e) =>
                      handleSettingChange(
                        "numberFormat",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="es-PY">Paraguay (es-PY)</option>
                    <option value="es-ES">España (es-ES)</option>
                    <option value="en-US">Estados Unidos (en-US)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Símbolo de moneda
                    </h4>
                    <p className="text-sm text-gray-600">
                      Símbolo para mostrar moneda
                    </p>
                  </div>
                  <input
                    type="text"
                    value={settings.currencySymbol}
                    onChange={(e) =>
                      handleSettingChange(
                        "currencySymbol",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Decimales</h4>
                    <p className="text-sm text-gray-600">
                      Número de decimales a mostrar
                    </p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    value={settings.decimalPlaces}
                    onChange={(e) =>
                      handleSettingChange(
                        "decimalPlaces",
                        parseInt((e.target as HTMLInputElement).value)
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "interfaz":
        return (
          <div className="space-y-6">
            <div className="chart-container">
              <h3 className="chart-title">Configuración de Interfaz</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Tema</h4>
                    <p className="text-sm text-gray-600">
                      Tema visual de la aplicación
                    </p>
                  </div>
                  <select
                    value={settings.theme}
                    onChange={(e) =>
                      handleSettingChange(
                        "theme",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Idioma</h4>
                    <p className="text-sm text-gray-600">
                      Idioma de la interfaz
                    </p>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange(
                        "language",
                        (e.target as HTMLSelectElement).value
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Sidebar colapsado
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mostrar sidebar colapsado por defecto
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.sidebarCollapsed}
                      onChange={(e) =>
                        handleSettingChange(
                          "sidebarCollapsed",
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Mostrar tooltips
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mostrar información adicional al pasar el mouse
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showTooltips}
                      onChange={(e) =>
                        handleSettingChange(
                          "showTooltips",
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Configuración no encontrada</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con información */}
      <div className="chart-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-2xl">⚙️</span>
          </div>
          <h2 className="chart-title">Configuración del Sistema</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Personalice la aplicación DYNAMO según sus preferencias y
            necesidades de trabajo
          </p>
        </div>

        {/* Tabs de configuración mejorados */}
        <div className="config-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`config-tab ${activeTab === tab.id ? "active" : ""}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>

      {/* Botones de acción mejorados */}
      <div className="config-actions">
        <div className="config-buttons">
          <button
            onClick={saveSettings}
            className="config-button config-button-primary"
          >
            <span className="mr-2">💾</span>
            Guardar Configuración
          </button>
          <button
            onClick={resetToDefaults}
            className="config-button config-button-secondary"
          >
            <span className="mr-2">🔄</span>
            Restaurar Valores
          </button>
        </div>

        <div className="config-timestamp">
          <span className="mr-2">🕒</span>
          Última actualización: {new Date().toLocaleString("es-PY")}
        </div>
      </div>
    </div>
  );
}
