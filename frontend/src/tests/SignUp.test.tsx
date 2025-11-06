import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../app/modules/auth/SignUp/page';
import { useRouter } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('SignUp Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('TC-UI-001: Should render SignUp component with all form fields', () => {
    render(<SignUp />);

    // Check if heading is rendered
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Enter details to create an account')).toBeInTheDocument();

    // Check if all input fields are present
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();

    // Check if submit button is present
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();

    // Check if sign in link is present
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });

  test('TC-UI-002: Should update input values when user types', () => {
    render(<SignUp />);

    const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const addressInput = screen.getByPlaceholderText('Address') as HTMLInputElement;
    const contactInput = screen.getByPlaceholderText('Contact Number') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Krutarth Patel' } });
    fireEvent.change(emailInput, { target: { value: 'krutarth@example.com' } });
    fireEvent.change(addressInput, { target: { value: '123 Test Street' } });
    fireEvent.change(contactInput, { target: { value: '9876543210' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });

    expect(nameInput.value).toBe('Krutarth Patel');
    expect(emailInput.value).toBe('krutarth@example.com');
    expect(addressInput.value).toBe('123 Test Street');
    expect(contactInput.value).toBe('9876543210');
    expect(passwordInput.value).toBe('Test@123');
  });

  test('TC-UI-003: Should show alert when passwords do not match', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Krutarth Patel' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'DifferentPassword' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Passwords don't match!");
    });

    alertMock.mockRestore();
  });

  test('TC-UI-004: Should submit form with valid data and redirect on success', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Signup successful', userId: 1 }),
    });

    render(<SignUp />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Krutarth Patel' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'krutarth@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 College Road, Mumbai' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test@123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Test@123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/signup'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Krutarth Patel',
            email: 'krutarth@example.com',
            address: '123 College Road, Mumbai',
            contact: '9876543210',
            password: 'Test@123',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Signup successful!');
      expect(mockPush).toHaveBeenCalledWith('/modules/auth/SignIn');
    });

    alertMock.mockRestore();
  });

  test('Should show error alert when signup fails', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email already exists' }),
    });

    render(<SignUp />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test@123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Test@123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Email already exists');
    });

    alertMock.mockRestore();
  });

  test('Should handle network errors gracefully', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SignUp />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Test@123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Test@123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Something went wrong. Please try again.');
    });

    alertMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  test('Should have required attribute on all input fields', () => {
    render(<SignUp />);

    expect(screen.getByPlaceholderText('Name')).toBeRequired();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
    expect(screen.getByPlaceholderText('Address')).toBeRequired();
    expect(screen.getByPlaceholderText('Contact Number')).toBeRequired();
    expect(screen.getByPlaceholderText('Password')).toBeRequired();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeRequired();
  });

  test('Should have correct input types', () => {
    render(<SignUp />);

    expect(screen.getByPlaceholderText('Name')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText('Address')).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('Contact Number')).toHaveAttribute('type', 'tel');
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByPlaceholderText('Confirm Password')).toHaveAttribute('type', 'password');
  });
});

