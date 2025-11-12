'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import AddServiceModal from './AddServiceModal';
import EditServiceModal from './EditServiceModal';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function ServiceProviderDashboard() {
  const { user } = useUser();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  useEffect(() => {
    if (user?.role === 'serviceprovider') {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/service/my-services`, {
        credentials: 'include',
      });
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/service/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (user?.role !== 'serviceprovider') {
    return (
      <div className="p-10 text-center text-gray-700 font-semibold">
        🚫 You do not have access to this page.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Service Provider Dashboard</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <div>Loading your services...</div>
      ) : services.length === 0 ? (
        <div className="text-gray-600 text-center py-10">No services found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{service.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{service.description}</p>
              <p className="text-gray-900 font-bold mt-2">₹{service.price}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditService(service)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <AddServiceModal
          onClose={() => setShowAddModal(false)}
          onAdded={fetchServices}
        />
      )}

      {/* Edit Service Modal */}
      {editService && (
        <EditServiceModal
          service={editService}
          onClose={() => setEditService(null)}
          onUpdated={fetchServices}
        />
      )}
    </div>
  );
}
