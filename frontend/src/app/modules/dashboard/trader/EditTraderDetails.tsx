'use client';

import React, { useState, useEffect } from 'react';

// Define the shape of the data the form handles
interface EditFormData {
    companyName: string;
    shopContactNumber: string;
    shopAddress: string;
    description: string;
}

// Define props: id is required for the update API call, and onClose to close the modal
interface EditTraderDetailsFormProps {
    companyId: string;
    initialData: EditFormData;
    onClose: () => void;
    onUpdateSuccess: (updatedData: EditFormData) => void;
}

const EditTraderDetailsForm: React.FC<EditTraderDetailsFormProps> = ({
    companyId,
    initialData,
    onClose,
    onUpdateSuccess
}) => {

    const [formData, setFormData] = useState<EditFormData>(initialData);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Ensure form data updates if initialData changes
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);

        const payload = {
            business_name: formData.companyName,
            phone: formData.shopContactNumber,
            shop_address: formData.shopAddress,
            description: formData.description,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/company/${companyId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update details on the server.');
            }

            onUpdateSuccess(formData);
            // onClose(); // onClose is called in onUpdateSuccess
        } catch (err) {
            console.error('Update failed:', err);
            setSubmitError((err as Error).message || 'An unexpected error occurred during update.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg w-full">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Edit Details
            </h4>

            {submitError && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
                    Error: {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Shop Name (Read-Only) */}
                <div>
                    {/* 👈 Adjusted Label style */}
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Shop Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        readOnly
                        // 👈 CRITICAL CHANGES: Increased padding, light background, rounded-lg for final look
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none"
                        disabled={loading}
                    />
                </div>

                {/* Contact */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contact</label>
                    <input
                        type="tel"
                        name="shopContactNumber"
                        value={formData.shopContactNumber}
                        onChange={handleChange}
                        required
                        // 👈 CRITICAL CHANGES: Increased padding, rounded-lg
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        name="shopAddress"
                        value={formData.shopAddress}
                        onChange={handleChange}
                        required
                        // 👈 CRITICAL CHANGES: Increased padding, rounded-lg
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3} // Keeping 3 rows for better editability, though image is compact
                        required
                        // 👈 CRITICAL CHANGES: Increased padding, rounded-lg
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                        disabled={loading}
                    />
                </div>

                {/* Footer/Action Buttons - Matching the image's specific button styles and spacing */}
                <div className="flex justify-end space-x-4 pt-4"> 
                    <button
                        type="button"
                        onClick={onClose}
                        // 👈 Adjusted style for Cancel button (white background, border)
                        className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition duration-150"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        // 👈 Adjusted style for UPDATE button (black background, strong hover)
                        className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-150 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'UPDATING...' : 'UPDATE'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTraderDetailsForm;