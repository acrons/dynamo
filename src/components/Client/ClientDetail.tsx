import React from 'react';
import { ArrowLeft, Phone, Mail, Calendar, User, FileText, Tag, DollarSign, Package, Edit, Trash2 } from 'lucide-react';
import { Client } from '../../types';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ client, onBack }) => {

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver a la lista</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit size={18} />
            </button>
          </div>
          
          <div className="text-center mb-6">
            {client.profileImage ? (
              <img
                src={client.profileImage}
                alt={client.fullName}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                <User size={40} className="text-gray-500" />
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mt-4">{client.fullName}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="text-gray-900 font-medium">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar size={18} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fecha de Registro</p>
                <p className="text-gray-900 font-medium">{client.createdAt.toLocaleDateString('es-ES')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tag size={18} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Origen de Captura</p>
                <p className="text-gray-900 font-medium">{client.captureOrigin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Negocio */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Información de Negocio</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit size={18} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Área de Interés</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{client.interest}</p>
            </div>

            {client.saleType && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tipo de Venta</h3>
                <div className="flex items-center space-x-2">
                  <Package size={18} className="text-gray-500" />
                  <span className="text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">{client.saleType}</span>
                </div>
              </div>
            )}

            {client.invoiceTotal && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Total Facturado</h3>
                <div className="flex items-center space-x-2">
                  <DollarSign size={18} className="text-green-500" />
                  <span className="text-2xl font-bold text-green-600">${client.invoiceTotal.toLocaleString('es-ES')}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documentos Adjuntos */}
        {client.attachments.length > 0 && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Documentos Adjuntos</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                Subir Documento
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {client.attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <FileText size={20} className="text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                    <p className="text-xs text-gray-500">
                      {attachment.uploadedAt.toLocaleDateString('es-ES')} por {attachment.uploadedBy}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientDetail;