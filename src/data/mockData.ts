import { Client, User, ProductOrService, InventoryItem, SaleRecord, Invoice } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Ana García', email: 'ana@estudio.com', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '2', name: 'Carlos Ruiz', email: 'carlos@estudio.com', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '3', name: 'María López', email: 'maria@estudio.com', avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=100&h=100&fit=crop&crop=face' },
];

export const currentUser = mockUsers[0];

export const mockClients: Client[] = [
  {
    id: '1',
    fullName: 'Roberto Mendoza',
    phone: '+34 612 345 678',
    email: 'roberto.mendoza@email.com',
    interest: 'Derecho Laboral - Despido improcedente',
    captureOrigin: 'Evento networking',
    capturedBy: 'Ana García',
    status: 'enviada',
    createdAt: new Date('2024-01-15'),
    profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face',
    attachments: [
      {
        id: '1',
        name: 'Propuesta Comercial.pdf',
        type: 'application/pdf',
        url: '#',
        uploadedAt: new Date('2024-01-16'),
        uploadedBy: 'Ana García'
      }
    ],
    interactions: [
      {
        id: '1',
        type: 'comment',
        content: 'Cliente interesado en servicios de derecho laboral. Primera reunión programada.',
        author: 'Ana García',
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: '2',
        type: 'status_change',
        content: 'Propuesta comercial enviada',
        author: 'Ana García',
        timestamp: new Date('2024-01-16T14:20:00')
      }
    ]
  },
  {
    id: '2',
    fullName: 'Sofía Herrera',
    phone: '+34 698 765 432',
    email: 'sofia.herrera@email.com',
    interest: 'Derecho Mercantil - Constitución sociedad',
    captureOrigin: 'Derivación',
    capturedBy: 'Carlos Ruiz',
    status: 'leida',
    createdAt: new Date('2024-01-18'),
    attachments: [],
    interactions: [
      {
        id: '3',
        type: 'comment',
        content: 'Necesita asesoramiento para constituir una SL. @maria-lopez podría ayudar con los trámites',
        author: 'Carlos Ruiz',
        timestamp: new Date('2024-01-18T09:15:00'),
        mentions: ['maria-lopez']
      }
    ]
  },
  {
    id: '3',
    fullName: 'Diego Fernández',
    phone: '+34 675 123 890',
    email: 'diego.fernandez@email.com',
    interest: 'Derecho Civil - Herencias',
    captureOrigin: 'Reunión',
    capturedBy: 'María López',
    status: 'aceptada',
    createdAt: new Date('2024-01-10'),
    attachments: [
      {
        id: '2',
        name: 'Contrato firmado.pdf',
        type: 'application/pdf',
        url: '#',
        uploadedAt: new Date('2024-01-25'),
        uploadedBy: 'María López'
      }
    ],
    interactions: [
      {
        id: '4',
        type: 'status_change',
        content: 'Propuesta aceptada - Cliente firmó contrato',
        author: 'María López',
        timestamp: new Date('2024-01-25T11:00:00')
      }
    ]
  },
  {
    id: '4',
    fullName: 'Laura Martínez',
    phone: '+34 611 222 333',
    email: 'laura.martinez@email.com',
    interest: 'Derecho Laboral - Acoso laboral',
    captureOrigin: 'Website',
    capturedBy: 'Ana García',
    status: 'enviada',
    createdAt: new Date('2024-01-20'),
    attachments: [],
    interactions: [
      {
        id: '7',
        type: 'comment',
        content: 'Cliente contactó por acoso laboral. Propuesta enviada.',
        author: 'Ana García',
        timestamp: new Date('2024-01-20T16:45:00')
      }
    ]
  },
  {
    id: '5',
    fullName: 'Pedro Sánchez',
    phone: '+34 644 555 666',
    email: 'pedro.sanchez@email.com',
    interest: 'Derecho Mercantil - Contratos comerciales',
    captureOrigin: 'Referido',
    capturedBy: 'Carlos Ruiz',
    status: 'enviada',
    createdAt: new Date('2024-01-22'),
    attachments: [],
    interactions: [
      {
        id: '8',
        type: 'comment',
        content: 'Cliente referido por otro cliente. Propuesta enviada.',
        author: 'Carlos Ruiz',
        timestamp: new Date('2024-01-22T10:30:00')
      }
    ]
  },
  {
    id: '6',
    fullName: 'Carmen Jiménez',
    phone: '+34 644 987 321',
    email: 'carmen.jimenez@email.com',
    interest: 'Derecho Penal - Defensa',
    captureOrigin: 'Web corporativa',
    capturedBy: 'Ana García',
    status: 'verificada',
    createdAt: new Date('2024-01-22'),
    attachments: [],
    interactions: []
  }
];

// Productos y Servicios
export const mockProductsAndServices: ProductOrService[] = [
  { id: 'ps-1', name: 'Consulta inicial', category: 'servicio', unitPrice: 120, salesCategory: 'Grabado' },
  { id: 'ps-2', name: 'Redacción de contrato', category: 'servicio', unitPrice: 450, salesCategory: 'Bordado' },
  { id: 'ps-3', name: 'Constitución de SL', category: 'servicio', unitPrice: 950, salesCategory: 'UV' },
  { id: 'ps-4', name: 'Carpeta expediente', category: 'producto', unitPrice: 12, sku: 'CARP-EXP-01', taxable: true, salesCategory: 'Bordado' },
  { id: 'ps-5', name: 'Horas extra consultoría', category: 'servicio', unitPrice: 80, salesCategory: 'Grabado' },
  // Productos alineados al tipo de cliente real
  { id: 'p-100', name: 'Kit de mate', category: 'producto', unitPrice: 189900, sku: 'KIT-MATE', salesCategory: 'Grabado' },
  { id: 'p-101', name: 'Mesita personalizada', category: 'producto', unitPrice: 250000, sku: 'MESA-PERS', salesCategory: 'Grabado' },
  { id: 'p-102', name: 'Stickers UV', category: 'producto', unitPrice: 80000, sku: 'STK-UV', salesCategory: 'UV' },
  { id: 'p-103', name: 'Tabla de asado', category: 'producto', unitPrice: 280000, sku: 'TAB-ASADO', salesCategory: 'Grabado' },
  { id: 'p-104', name: 'Llaveros personalizados', category: 'producto', unitPrice: 225000, sku: 'LLA-PERS', salesCategory: 'Grabado' },
  { id: 'p-105', name: 'Bolso ecológico', category: 'producto', unitPrice: 90000, sku: 'BOL-ECO', salesCategory: 'Bordado' },
  { id: 'p-106', name: 'Delantal personalizado', category: 'producto', unitPrice: 150000, sku: 'DEL-PERS', salesCategory: 'Grabado' },
  { id: 'p-107', name: 'Placa de perro', category: 'producto', unitPrice: 45000, sku: 'PLC-DOG', salesCategory: 'Grabado' },
];

// Inventario (para los productos físicos)
export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', productId: 'ps-4', quantityOnHand: 140, reorderPoint: 50, updatedAt: new Date('2024-01-20') },
  { id: 'inv-2', productId: 'p-100', quantityOnHand: 80, reorderPoint: 20, updatedAt: new Date('2024-01-22') },
  { id: 'inv-3', productId: 'p-101', quantityOnHand: 35, reorderPoint: 10, updatedAt: new Date('2024-01-22') },
  { id: 'inv-4', productId: 'p-102', quantityOnHand: 500, reorderPoint: 120, updatedAt: new Date('2024-01-22') },
  { id: 'inv-5', productId: 'p-103', quantityOnHand: 25, reorderPoint: 10, updatedAt: new Date('2024-01-22') },
  { id: 'inv-6', productId: 'p-104', quantityOnHand: 200, reorderPoint: 60, updatedAt: new Date('2024-01-22') },
  { id: 'inv-7', productId: 'p-105', quantityOnHand: 300, reorderPoint: 80, updatedAt: new Date('2024-01-22') },
  { id: 'inv-8', productId: 'p-106', quantityOnHand: 120, reorderPoint: 30, updatedAt: new Date('2024-01-22') },
  { id: 'inv-9', productId: 'p-107', quantityOnHand: 1000, reorderPoint: 200, updatedAt: new Date('2024-01-22') },
];

// Ventas (histórico)
export const mockSales: SaleRecord[] = [
  {
    id: 'sale-1',
    date: new Date('2024-01-16'),
    clientId: '1',
    items: [
      { productId: 'ps-1', quantity: 1, unitPrice: 120 },
      { productId: 'ps-4', quantity: 2, unitPrice: 12 },
    ],
    total: 144,
    notes: 'Consulta inicial + materiales',
    paymentCondition: 'Contado'
  },
  {
    id: 'sale-2',
    date: new Date('2024-01-25'),
    clientId: '3',
    items: [
      { productId: 'ps-2', quantity: 1, unitPrice: 450 },
    ],
    total: 450,
    paymentCondition: 'Credito',
  },
  {
    id: 'sale-3',
    date: new Date('2024-01-28'),
    clientId: '2',
    items: [
      { productId: 'ps-3', quantity: 1, unitPrice: 950 },
    ],
    total: 950,
    paymentCondition: 'Contado',
  },
  // Ventas simuladas de productos reales del inventario
  {
    id: 'sale-4',
    date: new Date('2024-02-05'),
    clientId: '4',
    items: [
      { productId: 'p-100', quantity: 3, unitPrice: 189900 }, // kits de mate
      { productId: 'p-104', quantity: 10, unitPrice: 225000 }, // llaveros
    ],
    total: 3*189900 + 10*225000,
    notes: 'Merchandising corporativo',
    paymentCondition: 'Contado',
  },
  {
    id: 'sale-5',
    date: new Date('2024-03-12'),
    clientId: '5',
    items: [
      { productId: 'p-101', quantity: 5, unitPrice: 250000 }, // mesitas personalizadas
      { productId: 'p-103', quantity: 2, unitPrice: 280000 }, // tablas de asado
    ],
    total: 5*250000 + 2*280000,
    paymentCondition: 'Credito',
  },
  {
    id: 'sale-6',
    date: new Date('2024-04-20'),
    clientId: '6',
    items: [
      { productId: 'p-102', quantity: 500, unitPrice: 80000 }, // stickers UV
    ],
    total: 500*80000,
    notes: 'Stickers UV para campaña',
    paymentCondition: 'Contado',
  },
  {
    id: 'sale-7',
    date: new Date('2024-05-03'),
    clientId: '2',
    items: [
      { productId: 'p-106', quantity: 20, unitPrice: 150000 }, // delantales
      { productId: 'p-105', quantity: 50, unitPrice: 90000 }, // bolsos eco
    ],
    total: 20*150000 + 50*90000,
    paymentCondition: 'Credito',
  },
  {
    id: 'sale-8',
    date: new Date('2024-06-18'),
    clientId: '3',
    items: [
      { productId: 'p-107', quantity: 200, unitPrice: 45000 }, // placas de perro
      { productId: 'p-100', quantity: 5, unitPrice: 189900 },
    ],
    total: 200*45000 + 5*189900,
    paymentCondition: 'Contado',
  },
  {
    id: 'sale-9',
    date: new Date('2024-07-22'),
    clientId: '1',
    items: [
      { productId: 'p-103', quantity: 8, unitPrice: 280000 },
    ],
    total: 8*280000,
    paymentCondition: 'Credito',
  },
  {
    id: 'sale-10',
    date: new Date('2024-08-09'),
    clientId: '4',
    items: [
      { productId: 'p-102', quantity: 800, unitPrice: 80000 },
      { productId: 'p-104', quantity: 30, unitPrice: 225000 },
    ],
    total: 800*80000 + 30*225000,
    paymentCondition: 'Contado',
  },
];

// Facturación (invoices)
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    number: 'F-2024-001',
    clientId: '1',
    issueDate: new Date('2024-01-16'),
    dueDate: new Date('2024-02-15'),
    status: 'paid',
    items: [
      { productId: 'ps-1', quantity: 1, unitPrice: 120 },
      { productId: 'ps-4', quantity: 2, unitPrice: 12 },
    ],
    subtotal: 144,
    tax: 0,
    total: 144,
    currency: 'EUR',
  },
  {
    id: 'inv-002',
    number: 'F-2024-002',
    clientId: '3',
    issueDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-24'),
    status: 'sent',
    items: [
      { productId: 'ps-2', quantity: 1, unitPrice: 450 },
    ],
    subtotal: 450,
    tax: 0,
    total: 450,
    currency: 'EUR',
  },
  {
    id: 'inv-003',
    number: 'F-2024-003',
    clientId: '2',
    issueDate: new Date('2024-01-28'),
    dueDate: new Date('2024-02-27'),
    status: 'draft',
    items: [
      { productId: 'ps-3', quantity: 1, unitPrice: 950 },
    ],
    subtotal: 950,
    tax: 0,
    total: 950,
    currency: 'EUR',
  },
  // Facturas adicionales vinculadas a clientes del CSV (IDs slugificados)
  {
    id: 'inv-004',
    number: 'F-2024-004',
    clientId: 'indio-sa',
    issueDate: new Date('2024-03-05'),
    dueDate: new Date('2024-04-04'),
    status: 'sent',
    items: [
      { productId: 'p-102', quantity: 600, unitPrice: 80000 },
      { productId: 'p-104', quantity: 20, unitPrice: 225000 },
    ],
    subtotal: 600*80000 + 20*225000,
    tax: 0,
    total: 600*80000 + 20*225000,
    currency: 'EUR',
  },
  {
    id: 'inv-005',
    number: 'F-2024-005',
    clientId: 'alamo-sa',
    issueDate: new Date('2024-03-18'),
    dueDate: new Date('2024-04-17'),
    status: 'overdue',
    items: [
      { productId: 'p-103', quantity: 10, unitPrice: 280000 },
      { productId: 'p-101', quantity: 8, unitPrice: 250000 },
    ],
    subtotal: 10*280000 + 8*250000,
    tax: 0,
    total: 10*280000 + 8*250000,
    currency: 'EUR',
  },
  {
    id: 'inv-006',
    number: 'F-2024-006',
    clientId: 'impacto-sa',
    issueDate: new Date('2024-04-10'),
    dueDate: new Date('2024-05-10'),
    status: 'paid',
    items: [
      { productId: 'p-102', quantity: 900, unitPrice: 80000 },
    ],
    subtotal: 900*80000,
    tax: 0,
    total: 900*80000,
    currency: 'EUR',
  },
  {
    id: 'inv-007',
    number: 'F-2024-007',
    clientId: 'la-gioconda-sa',
    issueDate: new Date('2024-05-22'),
    dueDate: new Date('2024-06-21'),
    status: 'draft',
    items: [
      { productId: 'p-100', quantity: 12, unitPrice: 189900 },
      { productId: 'p-105', quantity: 100, unitPrice: 90000 },
    ],
    subtotal: 12*189900 + 100*90000,
    tax: 0,
    total: 12*189900 + 100*90000,
    currency: 'EUR',
  },
  {
    id: 'inv-008',
    number: 'F-2024-008',
    clientId: 'rlg-import-srl',
    issueDate: new Date('2024-06-30'),
    dueDate: new Date('2024-07-30'),
    status: 'void',
    items: [
      { productId: 'p-104', quantity: 50, unitPrice: 225000 },
    ],
    subtotal: 50*225000,
    tax: 0,
    total: 50*225000,
    currency: 'EUR',
  },
];