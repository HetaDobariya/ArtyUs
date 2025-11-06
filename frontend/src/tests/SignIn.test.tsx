import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../app/modules/auth/SignIn/page';
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

// Mock fetch and localStorage
global.fetch = jest.fn();
Storage.prototype.setItem = jest.fn();

describe('SignIn Component', () => {
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

  test('TC-UI-005: Should render SignIn component with email and password fields', () => {
    render(<SignIn />);

    // Check if heading is rendered
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Enter details to log in')).toBeInTheDocument();

    // Check if input fields are present
    expect(screen.getByPlaceholderText('krina@gmail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('··········')).toBeInTheDocument();

    // Check if submit button is present
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();

    // Check if sign up link is present
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
  });

  test('TC-UI-006: Should update input values when user types', () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('krina@gmail.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('··········') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'krutarth@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });

    expect(emailInput.value).toBe('krutarth@example.com');
    expect(passwordInput.value).toBe('Test@123');
  });

  test('TC-UI-007: Should submit form with valid credentials and redirect on success', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockToken = 'mock.jwt.token';
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        message: 'Login successful', 
        token: mockToken,
        user: { role: 'user' }
      }),
    });

    render(<SignIn />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('krina@gmail.com'), { 
      target: { value: 'krutarth@example.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('··········'), { 
      target: { value: 'Test@123' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'krutarth@example.com',
            password: 'Test@123',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });

    alertMock.mockRestore();
  });

  test('Should show error alert when login fails with invalid credentials', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid email or password' }),
    });

    render(<SignIn />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('krina@gmail.com'), { 
      target: { value: 'wrong@example.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('··········'), { 
      target: { value: 'WrongPassword' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Invalid email or password');
    });

    expect(mockPush).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test('Should handle network errors gracefully', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SignIn />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('krina@gmail.com'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('··········'), { 
      target: { value: 'Test@123' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Something went wrong. Please try again.');
    });

    alertMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  test('Should have required attribute on input fields', () => {
    render(<SignIn />);

    expect(screen.getByPlaceholderText('krina@gmail.com')).toBeRequired();
    expect(screen.getByPlaceholderText('··········')).toBeRequired();
  });

  test('Should have correct input types', () => {
    render(<SignIn />);

    expect(screen.getByPlaceholderText('krina@gmail.com')).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText('··········')).toHaveAttribute('type', 'password');
  });

  test('Should have link to Sign Up page', () => {
    render(<SignIn />);

    const signUpLink = screen.getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/modules/auth/SignUp');
  });

  test('Should prevent form submission when fields are empty', () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('krina@gmail.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('··········') as HTMLInputElement;

    // Verify inputs are initially empty
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    // HTML5 validation should prevent submission
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});

