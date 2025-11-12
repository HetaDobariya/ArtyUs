'use client';

import React, { useState } from 'react';

interface EditServiceModalProps {
  service: any;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditServiceModal({ service, onClose, onUpdated }: EditServiceModalProps) {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    image_url: service.image_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/service/update/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onUpdated();
        onClose();
      }
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
