// src/components/profile/EditUserDetailsForm.tsx
'use client';
import { UserInfoType } from '@/types'; // Import the type
import { Button, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';

interface EditUserDetailsFormProps {
  userId: string;
  initialData: UserInfoType;
  // Consider adding an onUpdate success/close handler here
  // onUpdateSuccess: (updatedData: UserInfoType) => void;
}

const EditUserDetailsForm: React.FC<EditUserDetailsFormProps> = ({ userId, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    address: initialData.address,
    contactNumber: initialData.contactNumber,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // *** REPLACE THIS WITH YOUR ACTUAL API CALL TO UPDATE THE USER ***
    console.log('Submitting update for user:', userId, formData);
    
    try {
        // Example: await fetch(`/api/user/${userId}`, { method: 'PUT', body: JSON.stringify(formData) });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        alert('Details updated successfully!');
        // onUpdateSuccess({ ...initialData, ...formData }); // Call a prop function to refresh parent data
    } catch (error) {
        console.error('Update failed:', error);
        alert('Failed to update details.');
    } finally {
        setIsSubmitting(false);
        // You would typically close the AlertDialog here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      <Typography variant="h4" color="blue-gray">
        Edit Account Details
      </Typography>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        label="Contact No"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        type="tel"
        required
      />
      
      {/* Note: Email is often read-only */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-black hover:shadow-lg"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditUserDetailsForm;