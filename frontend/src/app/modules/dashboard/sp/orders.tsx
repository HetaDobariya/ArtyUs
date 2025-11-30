'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface ServiceBooking {
  booking_id: number;
  request_title: string;
  request_details: string;
  price_range: string;
  time_range: string;
  support_pdf_url: string;
  contact_pref: string;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_contact: string;
  customer_address: string;
}

export default function SPOrders() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchServiceBookings();
    }
  }, [user]);

  const fetchServiceBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/serviceprovider/my-orders`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setBookings(data.data || []);
      } else {
        console.error('Failed to fetch service bookings:', data.error);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching service bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    setUpdatingStatus(bookingId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/serviceprovider/update-status/${bookingId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        // Update the booking status in local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.booking_id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      } else {
        alert(data.error || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-600">Loading service bookings...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Service Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-600 text-lg mb-4">No service bookings found.</div>
          <p className="text-gray-500">When customers book your services, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.booking_id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              {/* Booking Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{booking.request_title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Booked on: {formatDate(booking.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                  <p className="text-sm text-gray-600"><strong>Name:</strong> {booking.customer_name}</p>
                  <p className="text-sm text-gray-600"><strong>Email:</strong> {booking.customer_email}</p>
                  <p className="text-sm text-gray-600"><strong>Contact:</strong> {booking.customer_contact}</p>
                  <p className="text-sm text-gray-600"><strong>Address:</strong> {booking.customer_address}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
                  <p className="text-sm text-gray-600"><strong>Price Range:</strong> {booking.price_range || 'Not specified'}</p>
                  <p className="text-sm text-gray-600"><strong>Preferred Time:</strong> {booking.time_range ? formatDate(booking.time_range) : 'Flexible'}</p>
                  <p className="text-sm text-gray-600"><strong>Contact Preference:</strong> {booking.contact_pref || 'Platform'}</p>
                </div>
              </div>

              {/* Request Details */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {booking.request_details}
                </p>
              </div>

              {/* Support Document */}
              {booking.support_pdf_url && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Supporting Document</h4>
                  <a 
                    href={booking.support_pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    📄 View Document
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              {booking.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => updateBookingStatus(booking.booking_id, 'accepted')}
                    disabled={updatingStatus === booking.booking_id}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    {updatingStatus === booking.booking_id ? 'Accepting...' : 'Accept Booking'}
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.booking_id, 'rejected')}
                    disabled={updatingStatus === booking.booking_id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    {updatingStatus === booking.booking_id ? 'Rejecting...' : 'Reject Booking'}
                  </button>
                </div>
              )}

              {/* Additional actions for accepted bookings */}
              {booking.status === 'accepted' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => updateBookingStatus(booking.booking_id, 'completed')}
                    disabled={updatingStatus === booking.booking_id}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    {updatingStatus === booking.booking_id ? 'Marking...' : 'Mark as Completed'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}