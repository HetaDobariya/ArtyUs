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
    // Use a specific state for network/submission errors
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Ensure form data updates if initialData changes
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Handles the form submission and includes robust error handling to address
     * the "Unexpected token '<'" JSON parsing issue.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);

        // API payload structure
        const payload = {
            contact: formData.shopContactNumber,
            address: formData.shopAddress,
            description: formData.description,
        };

        try {
            // NOTE: process.env.NEXT_PUBLIC_BACKEND must be correctly set (e.g., http://localhost:4000/api)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            if (!response.ok) {
                let errorMessage = `Update failed with status: ${response.status}.`;

                // --- ROBUST ERROR HANDLING LOGIC (The Fix) ---
                try {
                    const contentType = response.headers.get("content-type");

                    // 1. Check if the response is JSON (expected API error structure)
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    }
                    // 2. Handle 404/non-JSON errors (like the HTML error page) gracefully
                    else {
                        const text = await response.text();
                        // This will capture the HTML/text response that was causing the JSON error
                        if (response.status === 404) {
                            errorMessage = `Error 404: API endpoint not found. Please verify the backend URL.`;
                        } else {
                            // Show a snippet of the response text (e.g., the "<!DOCTYPE" start)
                            errorMessage = `Server responded with a non-JSON error. Status ${response.status}. Details: ${text.substring(0, 100)}...`;
                        }
                    }
                } catch (jsonParseOrReadError) {
                    // This catches the original SyntaxError: Unexpected token '<'
                    console.error('JSON parsing/Response reading failed:', jsonParseOrReadError);
                    errorMessage = `Fatal Error: The server returned a corrupt or unexpected response (likely HTML). Check the console for details.`;
                }
                // --- END ROBUST ERROR HANDLING LOGIC ---

                throw new Error(errorMessage);
            }

            // Success path
            onUpdateSuccess(formData);
            // onClose(); // Assuming onUpdateSuccess handles the close
        } catch (err) {
            console.error('Update failed:', err);
            // Display the detailed error message generated above
            setSubmitError((err as Error).message || 'A network error occurred and the request failed.');
        } finally {
            setLoading(false);
        }
    };

    // --- JSX RENDER ---
    return (
        <div className="p-6 bg-white rounded-lg w-full">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Edit Details
            </h4>

            {/* Display the custom error message */}
            {submitError && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
                    ⚠️ Error: **{submitError}**
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Shop Name (Read-Only) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Shop Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        readOnly
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
                        rows={3}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                        disabled={loading}
                    />
                </div>

                {/* Footer/Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition duration-150"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
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