export interface Client {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  captureOrigin: string;
  capturedBy: string;
  status: ProposalStatus;
  createdAt: Date;
  invoiceTotal?: number;
  saleType?: 'Servicio' | 'Producto';
  profileImage?: string;
  attachments: Attachment[];
  interactions: Interaction[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Interaction {
  id: string;
  type: 'comment' | 'status_change' | 'task' | 'document';
  content: string;
  author: string;
  timestamp: Date;
  mentions?: string[];
}

export type ProposalStatus = 'enviada' | 'recibida' | 'leida' | 'verificada' | 'aceptada';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FilterOptions {
  status?: ProposalStatus;
  lawyer?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Billing / Ventas / Inventario
export interface ProductOrService {
  id: string;
  name: string;
  category: 'servicio' | 'producto';
  unitPrice: number;
  sku?: string;
  taxable?: boolean;
  salesCategory?: 'Bordado' | 'Grabado' | 'UV';
}

export interface InventoryItem {
  id: string;
  productId: string;
  quantityOnHand: number;
  reorderPoint?: number;
  updatedAt: Date;
}

export interface SaleLineItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discountPct?: number; // 0..100
}

export interface SaleRecord {
  id: string;
  date: Date;
  clientId?: string; // opcional si la venta no est asociada a un cliente del CRM
  items: SaleLineItem[];
  total: number;
  notes?: string;
  paymentCondition?: 'Contado' | 'Credito';
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void';

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatus;
  items: SaleLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: 'EUR' | 'USD' | 'ARS' | 'MXN';
}

export interface InventoryKpis {
  totalSkus: number;
  totalStock: number;
  lowStockSkus: number;
  stockValue: number;
}