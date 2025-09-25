import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, Calendar, User, FileText, MessageCircle, Plus, Send, Paperclip, Tag } from 'lucide-react';
import { Client, Interaction } from '../../types';
import { currentUser } from '../../data/mockData';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
  onUpdateClient: (client: Client) => void;
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

const ClientDetail: React.FC<ClientDetailProps> = ({ client, onBack, onUpdateClient }) => {
  const [newComment, setNewComment] = useState('');
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'comment',
      content: newComment,
      author: currentUser.name,
      timestamp: new Date(),
      mentions: newComment.match(/@[\w-]+/g) || undefined
    };

    const updatedClient = {
      ...client,
      interactions: [...client.interactions, newInteraction]
    };

    onUpdateClient(updatedClient);
    setNewComment('');
  };

  const handleStatusChange = (newStatus: any) => {
    const statusInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'status_change',
      content: `Estado actualizado a: ${statusLabels[newStatus]}`,
      author: currentUser.name,
      timestamp: new Date()
    };

    const updatedClient = {
      ...client,
      status: newStatus,
      interactions: [...client.interactions, statusInteraction]
    };

    onUpdateClient(updatedClient);
    setShowStatusUpdate(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver a la lista</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              {client.profileImage ? (
                <img
                  src={client.profileImage}
                  alt={client.fullName}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                  <User size={32} className="text-gray-500" />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 mt-3">{client.fullName}</h2>
              <div className="flex justify-center mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[client.status]}`}>
                  {statusLabels[client.status]}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-500" />
                <span className="text-gray-700">{client.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-700">{client.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-700">{client.createdAt.toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Tag size={16} className="text-gray-500" />
                <span className="text-gray-700">{client.captureOrigin}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Área de Interés</h3>
              <p className="text-gray-700">{client.interest}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Abogado Responsable</h3>
              <p className="text-gray-700">{client.capturedBy}</p>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => setShowStatusUpdate(!showStatusUpdate)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Actualizar Estado
              </button>
              
              {showStatusUpdate && (
                <div className="space-y-2">
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(key)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                        client.status === key
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {client.attachments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Documentos Adjuntos</h3>
              <div className="space-y-2">
                {client.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <FileText size={16} className="text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                      <p className="text-xs text-gray-500">
                        {attachment.uploadedAt.toLocaleDateString('es-ES')} por {attachment.uploadedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timeline Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Timeline de Interacciones</h3>
            </div>

            <div className="p-6">
              {/* New Comment Form */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Agregar comentario... (usa @nombre para mencionar usuarios)"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <Paperclip size={16} />
                        <span className="text-sm">Adjuntar</span>
                      </button>
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                        <span>Comentar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {client.interactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-2" />
                    <p>No hay interacciones registradas</p>
                    <p className="text-sm">Agregue el primer comentario para iniciar el seguimiento</p>
                  </div>
                ) : (
                  client.interactions
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .map(interaction => (
                      <div key={interaction.id} className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageCircle size={16} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">{interaction.author}</span>
                              <span className="text-xs text-gray-500">
                                {interaction.timestamp.toLocaleString('es-ES')}
                              </span>
                            </div>
                            <p className="text-gray-700">{interaction.content}</p>
                            {interaction.mentions && (
                              <div className="mt-2">
                                {interaction.mentions.map(mention => (
                                  <span key={mention} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                                    {mention}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;