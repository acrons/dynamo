import React, { useState } from 'react';
import { Client, ProposalStatus } from '../../types';
import ClientCard from '../Client/ClientCard';

interface KanbanBoardProps {
  clients: Client[];
  onClientClick: (client: Client) => void;
  onClientStatusChange: (clientId: string, newStatus: ProposalStatus) => void;
}

const statusColumns: { status: ProposalStatus; label: string; color: string }[] = [
  { status: 'enviada', label: 'Enviada', color: 'border-blue-200 bg-blue-50' },
  { status: 'recibida', label: 'Recibida', color: 'border-yellow-200 bg-yellow-50' },
  { status: 'leida', label: 'Leída', color: 'border-purple-200 bg-purple-50' },
  { status: 'verificada', label: 'Verificada', color: 'border-orange-200 bg-orange-50' },
  { status: 'aceptada', label: 'Aceptada', color: 'border-green-200 bg-green-50' }
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ clients, onClientClick, onClientStatusChange }) => {
  const [draggedClient, setDraggedClient] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, clientId: string) => {
    setDraggedClient(clientId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: ProposalStatus) => {
    e.preventDefault();
    if (draggedClient) {
      onClientStatusChange(draggedClient, newStatus);
      setDraggedClient(null);
    }
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {statusColumns.map(column => {
        const columnClients = clients.filter(client => client.status === column.status);
        
        return (
          <div key={column.status} className="flex-shrink-0 w-80">
            <div className={`rounded-lg border-2 ${column.color} min-h-96`}>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{column.label}</h3>
                  <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                    {columnClients.length}
                  </span>
                </div>
              </div>
              
              <div
                className="p-4 space-y-4 min-h-80 transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {columnClients.map((client) => (
                  <div
                    key={client.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, client.id)}
                    className="transition-transform hover:scale-105"
                  >
                    <ClientCard
                      client={client}
                      onClick={onClientClick}
                    />
                  </div>
                ))}
                
                {columnClients.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No hay clientes en esta etapa</p>
                    <p className="text-xs mt-1">Arrastra aquí para cambiar estado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;