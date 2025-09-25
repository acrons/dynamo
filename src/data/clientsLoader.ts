import { Client } from '../types';
import { parseCsv } from '../utils/csv';

// Mapea las columnas del CSV a un objeto Client mínimo para la tabla
// CSV esperado: Fecha factura, MES, AÑO, N° Factura, Nro de Ruc, Cliente, Contado/Credito, Tipo de venta, Monto total de factura, Descripción trabajo, Tipo de trabajo

export async function loadClientsFromCsv(url: string): Promise<Client[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length <= 1) return [];
  const header = rows[0];
  const idxCliente = header.findIndex(h => h.toLowerCase().includes('cliente'));
  const idxRuc = header.findIndex(h => h.toLowerCase().includes('ruc'));
  const idxFecha = header.findIndex(h => h.toLowerCase().includes('fecha'));
  const idxTipoTrabajo = header.findIndex(h => h.toLowerCase().includes('tipo de trabajo'));
  const idxTipoVenta = header.findIndex(h => h.toLowerCase().includes('tipo de venta'));
  const idxMonto = header.findIndex(h => h.toLowerCase().includes('monto total'));

  const uniqueByName = new Map<string, Client>();

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const fullName = (r[idxCliente] || '').trim();
    if (!fullName) continue;
    if (uniqueByName.has(fullName)) continue;
    const ruc = (idxRuc >= 0 ? r[idxRuc] : '').trim();
    const fechaStr = (idxFecha >= 0 ? r[idxFecha] : '').trim();
    const createdAt = parseCsvDate(fechaStr) ?? new Date();
    const interest = (idxTipoTrabajo >= 0 ? r[idxTipoTrabajo] : '').trim();
    const montoStr = (idxMonto >= 0 ? r[idxMonto] : '').replace(/\s/g, '');
    const invoiceTotal = parseGsNumber(montoStr);

    const client: Client = {
      id: slugify(fullName),
      fullName,
      phone: '',
      email: '',
      interest: interest || '—',
      captureOrigin: 'CSV',
      capturedBy: 'Importado',
      status: 'enviada',
      createdAt,
      profileImage: undefined,
      invoiceTotal,
      saleType: idxTipoVenta >= 0 ? normalizeSaleType((r[idxTipoVenta] || '').trim()) : undefined,
      attachments: [],
      interactions: [],
    };

    // opcional: guardar RUC en interest si no hay
    if (ruc && client.interest === '—') client.interest = `RUC ${ruc}`;

    uniqueByName.set(fullName, client);
  }

  return Array.from(uniqueByName.values());
}

function parseCsvDate(value: string): Date | null {
  // Intenta parsear formatos tipo "Nov-22" o "01/01/2022" o similares
  if (!value) return null;
  const d1 = new Date(value);
  if (!isNaN(d1.getTime())) return d1;
  // Formato tipo "Nov-22" -> asumir día 01
  const m = value.match(/^(\w{3})-(\d{2})$/i);
  if (m) {
    const monthStr = m[1];
    const yearStr = m[2];
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const idx = months.indexOf(monthStr.toLowerCase());
    const year = 2000 + parseInt(yearStr, 10);
    if (idx >= 0) return new Date(year, idx, 1);
  }
  return null;
}

function parseGsNumber(value: string): number | undefined {
  if (!value) return undefined;
  // valores tipo "2,500,000" -> 2500000; o "169,900" -> 169900
  const cleaned = value.replace(/\./g, '').replace(/,/g, '');
  const n = Number(cleaned);
  return isNaN(n) ? undefined : n;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function normalizeSaleType(value: string): 'Servicio' | 'Producto' | undefined {
  const v = value.toLowerCase();
  if (v.includes('serv')) return 'Servicio';
  if (v.includes('prod')) return 'Producto';
  return undefined;
}

