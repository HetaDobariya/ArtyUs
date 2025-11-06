'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// --- INTERFACES ---

interface UserDetailsFormValues {
  contactNumber: string;
  address: string;
}

interface EditUserDetailsFormProps {
  id: string;
  onClose: () => void;
  initialValues: UserDetailsFormValues; // Used to pre-fill the form
  onUpdateSuccess: (updatedValues: UserDetailsFormValues) => void; // Used to update parent data
}

// --- Form Field Layout Component (Incorporated) ---

interface FormFieldLayoutProps {
  label: string;
  name: string;
  type?: string;
}

const FormFieldLayout: React.FC<FormFieldLayoutProps> = ({ label, name, type = 'text' }) => (
  <div className="relative pt-4">
    {/* Label (Mimics the floating label style) */}
    <label
      htmlFor={name}
      className="absolute left-3 top-0 text-xs font-medium text-gray-500 bg-white px-1 z-10"
    >
      {label}
    </label>

    {/* Input Field (Uses Formik's Field component) */}
    <Field
      id={name}
      name={name}
      type={type}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black text-gray-800"
    />

    {/* Error Message */}
    <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-600" />
  </div>
);

// --- Validation Schema ---

const validationSchema = Yup.object().shape({
  contactNumber: Yup.string()
    .required('Contact number is required')
    .min(10, 'Contact number must be at least 10 digits'),
  address: Yup.string().required('Address is required'),
});


// --- REST API Handler Function ---

// NOTE: Ensure NEXT_PUBLIC_BACKEND_URL is set correctly (e.g., http://localhost:4000/api)
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND}/user/update`;

const updateAddressRestApi = async (
  id: string,
  values: UserDetailsFormValues
) => {
  const payload = {
    contact: values.contactNumber,
    address: values.address,
  };

  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = `Update failed with status: ${response.status}.`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = `Server Error (${response.status}): Server returned a non-JSON response.`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};


// --- Main Component: EditUserDetailsForm ---

const EditUserDetailsForm: React.FC<EditUserDetailsFormProps> = ({
  id,
  onClose,
  initialValues, // Used by Formik
  onUpdateSuccess // Called on API success
}) => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (
    values: UserDetailsFormValues,
    helpers: FormikHelpers<UserDetailsFormValues>
  ) => {
    setLoading(true);
    setSubmitError(null);
    try {
      await updateAddressRestApi(id, values);

      // Notify the parent component of the new values
      onUpdateSuccess(values);

    } catch (err) {
      console.error('API update failed:', err);
      setSubmitError((err as Error).message || 'An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
      <h4 className="text-2xl font-bold text-gray-900 mb-6">
        Edit Details
      </h4>

      {submitError && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
          ⚠️ **Error:** {submitError}
        </div>
      )}

      <Formik
        // Passes dynamic initial data from the parent component
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isValid }) => (
          <Form className="space-y-6">
            <div className="flex flex-col gap-4">
              <FormFieldLayout label="Contact Number" name="contactNumber" type="tel" />
              <FormFieldLayout label="Address" name="address" type="text" />
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
                disabled={loading || !isValid}
              >
                {loading ? 'UPDATING...' : 'UPDATE'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserDetailsForm;