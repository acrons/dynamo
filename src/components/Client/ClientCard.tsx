import React from 'react';
import { Phone, Mail, Calendar, FileText, User } from 'lucide-react';
import { Client } from '../../types';

interface ClientCardProps {
  client: Client;
  onClick: (client: Client) => void;
}

const statusColors = {
  enviada: 'bg-blue-100 text-blue-800',
  recibida: 'bg-yellow-100 text-yellow-800',
  leida: 'bg-purple-100 text-purple-800',
  verificada: 'bg-orange-100 text-orange-800',
  aceptada: 'bg-green-100 text-green-800'
};

const statusLabels = {
  enviada: 'Enviada',
  recibida: 'Recibida',
  leida: 'Leída',
  verificada: 'Verificada',
  aceptada: 'Aceptada'
};

const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer relative group"
      onClick={() => onClick(client)}
    >
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {client.profileImage ? (
            <img
              src={client.profileImage}
              alt={client.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-500" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{client.fullName}</h3>
            <p className="text-sm text-gray-600">{client.interest}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
          {statusLabels[client.status]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone size={14} />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={14} />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>{client.createdAt.toLocaleDateString('es-ES')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Captado por: <span className="font-medium">{client.capturedBy}</span>
        </div>
        {client.attachments.length > 0 && (
          <div className="flex items-center space-x-1 text-sm text-blue-600">
            <FileText size={14} />
            <span>{client.attachments.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;