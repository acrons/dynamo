import { useState } from 'react';
import { Client, FilterOptions } from './types';
import { mockClients } from './data/mockData';
import { useEffect } from 'react';
import { loadClientsFromCsv } from './data/clientsLoader';
// import { currentUser } from './data/mockData';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import BusinessDashboard from './components/Dashboard/BusinessDashboard';
import ClientForm from './components/Client/ClientForm';
import ClientDetail from './components/Client/ClientDetail';
import ClientTable from './components/Client/ClientTable';
import PhotoUploadModal from './components/Client/PhotoUploadModal';
import LoginScreen from './components/Auth/LoginScreen';
// Removed StatCard from dashboard in favor of BusinessDashboard
import Invoices from './components/Billing/Invoices';
import ProductSales from './components/Sales/ProductSales';
import InventoryDashboard from './components/Inventory/InventoryDashboard';
import Settings from './components/Layout/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [filters] = useState<FilterOptions>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Intentar cargar clientes reales desde CSV en public
    loadClientsFromCsv('/clients.csv')
      .then(list => {
        if (list && list.length > 0) setClients(list);
      })
      .catch(() => {
        // silencioso: usamos mocks
      });
  }, []);

  const handleSaveClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'attachments' | 'interactions'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date(),
      attachments: [],
      interactions: []
    };
    
    setClients([...clients, newClient]);
    setActiveView('clients');
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
  };

  // Vista de lista no requiere cambios de estado masivos vía Kanban
  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setActiveView('client-detail');
  };

  const handlePhotoUpload = (file: File) => {
    // Aquí puedes implementar la lógica para subir la foto
    console.log('Foto subida:', file.name);
    // Por ahora solo mostramos un alert
    alert(`Foto "${file.name}" subida exitosamente`);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setActiveView('client-detail');
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== clientId));
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
        setActiveView('client-list');
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simular una llamada a la API
    setTimeout(() => {
      // Credenciales de prueba (en producción esto vendría de una API)
      if (email === 'admin@estudio.com' && password === '123456') {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        alert('Credenciales incorrectas. Usa: admin@estudio.com / 123456');
        setIsLoading(false);
      }
    }, 1500);
  };

  const getFilteredClients = () => {
    return clients.filter(client => {
      if (filters.status && client.status !== filters.status) return false;
      if (filters.lawyer && client.capturedBy !== filters.lawyer) return false;
      if (filters.dateFrom && client.createdAt < filters.dateFrom) return false;
      if (filters.dateTo && client.createdAt > filters.dateTo) return false;
      return true;
    });
  };

  const filteredClients = getFilteredClients();

  const renderContent = () => {
    switch (activeView) {
      case 'billing':
        return <Invoices />;

      case 'sales':
        return <ProductSales />;

      case 'inventory':
        return <InventoryDashboard />;
      case 'settings':
        return <Settings />;
      case 'new-client':
        return (
          <ClientForm 
            onSave={handleSaveClient}
            onCancel={() => setActiveView('dashboard')}
          />
        );
      
      case 'client-detail':
        return selectedClient ? (
          <ClientDetail
            client={selectedClient}
            onBack={() => setActiveView('clients')}
            onUpdateClient={handleUpdateClient}
          />
        ) : null;
      
      case 'clients':
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Clientes Totales</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Nuevos (últimos 30 días)</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.createdAt >= new Date(Date.now() - 30*24*60*60*1000)).length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Con propuesta aceptada</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.status === 'aceptada').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Con seguimiento pendiente</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.status !== 'aceptada').length}</p>
                </div>
              </div>

              <ClientTable
                clients={filteredClients}
                onClientClick={handleClientClick}
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
              />
            </div>
          </div>
        );
      
      case 'client-list':
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Clientes Totales</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Nuevos (últimos 30 días)</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.createdAt >= new Date(Date.now() - 30*24*60*60*1000)).length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Con propuesta aceptada</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.status === 'aceptada').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500">Con seguimiento pendiente</p>
                  <p className="text-2xl font-semibold mt-1">{filteredClients.filter(c => c.status !== 'aceptada').length}</p>
                </div>
              </div>

              <ClientTable
                clients={filteredClients}
                onClientClick={handleClientClick}
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
              />
            </div>
          </div>
        );
      
      case 'dashboard':
      default:
        return <BusinessDashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeView) {
      case 'billing': return 'Facturación';
      case 'sales': return 'Ventas por Producto/Servicio';
      case 'inventory': return 'Inventario & KPIs';
      case 'settings': return 'Configuración';
      case 'new-client': return 'Alta de Cliente';
      case 'client-detail': return 'Detalle de Cliente';
      case 'clients': return 'Gestión de Clientes';
      case 'client-list': return 'Listado de Clientes';
      case 'dashboard':
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeView) {
      case 'billing': return 'Gestione facturas, estados y montos';
      case 'sales': return 'Análisis de ingresos por cada ítem';
      case 'inventory': return 'Seguimiento de stock y puntos de reposición';
      case 'settings': return 'Preferencias del sistema y de la app';
      case 'new-client': return 'Registre un nuevo cliente en el sistema';
      case 'client-detail': return 'Vista detallada del cliente y seguimiento';
      case 'clients': return 'Listado con KPIs y tabla de clientes';
      case 'client-list': return 'Listado completo de todos los clientes';
      case 'dashboard':
      default: return 'Resumen general del estado de clientes y propuestas';
    }
  };

  // Si no está autenticado, mostrar la pantalla de login
  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={handleLogin}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 lg:static lg:z-0 transform ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          activeView={activeView} 
          onViewChange={(view) => {
            setActiveView(view);
            setIsMobileSidebarOpen(false);
          }}
          onLogout={() => setIsAuthenticated(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotoUpload={handlePhotoUpload}
      />
    </div>
  );
}

export default App;