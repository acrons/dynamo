import React from 'react';
import { InventoryItem, ProductOrService } from '../../types';

interface InventoryDetailProps {
  inventoryItem: InventoryItem;
  product: ProductOrService | undefined;
  onBack: () => void;
}

const InventoryDetail: React.FC<InventoryDetailProps> = ({ inventoryItem, product, onBack }) => {
  const stockValue = (product?.unitPrice ?? 0) * inventoryItem.quantityOnHand;
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Detalle de Inventario</h2>
          <span className="text-sm text-gray-500">Actualizado: {inventoryItem.updatedAt.toLocaleDateString('es-ES')}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Producto</p>
            <p className="text-lg font-medium text-gray-900">{product?.name ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">SKU</p>
            <p className="text-lg font-medium text-gray-900">{product?.sku ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Stock disponible</p>
            <p className="text-lg font-medium text-gray-900">{inventoryItem.quantityOnHand}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Punto de reorden</p>
            <p className="text-lg font-medium text-gray-900">{inventoryItem.reorderPoint ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Precio unitario</p>
            <p className="text-lg font-medium text-gray-900">GS {(product?.unitPrice ?? 0).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valor de stock</p>
            <p className="text-lg font-medium text-gray-900">GS {stockValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;



