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
    const userRole = user?.role?.toLowerCase();
    if (userRole === 'serviceprovider' || userRole === 'service_provider') {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/service/my-services`, {
        credentials: 'include',
        cache: 'no-store', // Prevent caching to ensure fresh data
      });
      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await res.json();
      console.log('Fetched services response:', data);
      // Ensure we set the services array even if it's empty
      setServices(Array.isArray(data.services) ? data.services : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/service/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service. Please try again.');
    }
  };

  const userRole = user?.role?.toLowerCase();
  if (userRole !== 'serviceprovider' && userRole !== 'service_provider') {
    return (
      <div className="p-10 text-center text-gray-700 font-semibold">
        🚫 You do not have access to this page.
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Service Provider Dashboard</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold text-base whitespace-nowrap shadow-md hover:shadow-lg"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading your services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-600 text-lg mb-4">No services found.</div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            + Add Your First Service
          </button>
        </div>
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
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{service.description}</p>
              {service.price && (
                <p className="text-gray-900 font-bold mt-2">₹{service.price}</p>
              )}

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
