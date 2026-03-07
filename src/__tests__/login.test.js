import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import AuthProvider from '../ContextProviders/AuthProvider.jsx';
import '@testing-library/jest-dom';

import { fetchNoAuth } from '../assets/util/FetchRequest.js';

// Mock fetchNoAuth
jest.mock('../assets/util/FetchRequest.js', () => ({
  fetchNoAuth: jest.fn(),
}));

// Helper to render Login with required providers
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  test('renders Login form', () => {
    renderLogin();

    // Check for a heading or label unique to the signup page
    const loginHeading = screen.getByRole('heading', { name: /login/i });
    expect(loginHeading).toBeInTheDocument();
    // Check for input fields
    expect(screen.getByLabelText(/username \/ email-address/i)).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });
    expect(passwordInput).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows user to type in email, username, password, and re-password', () => {
    renderLogin();

    const emailOrUsernameInput = screen.getByLabelText(/username \/ email-address/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });

    fireEvent.change(emailOrUsernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailOrUsernameInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits login form and handles response', async () => {
    // Mock implementation for fetchNoAuth
    fetchNoAuth.mockImplementation((url, data, method, failureFn, successFn) => {
      // Simulate a successful login
      successFn({
        json: async () => ({
          data: {
            token: 'fake-jwt-token',
            username: 'testuser',
            role: 'user',
          },
        }),
      });
    });

    renderLogin();

    const emailOrUsernameInput = screen.getByLabelText(/username \/ email-address/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailOrUsernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      // Check that fetchNoAuth was called with correct arguments
      expect(fetchNoAuth).toHaveBeenCalledWith(
        'auth/login',
        { usernameOrEmail: 'test@example.com', password: 'password123' },
        'POST',
        expect.any(Function),
        expect.any(Function)
      );

      // Check that localStorage was updated
      expect(localStorage.getItem('auth')).toContain('fake-jwt-token');
    });
  });

  test('shows error message when login fails', async () => {
    fetchNoAuth.mockImplementation((url, data, method, failureFn, successFn) => {
      // Simulate a failed login response
      failureFn({
        json: async () => ({
          errors: [{ msg: 'Invalid Login Credentials.' }],
        }),
      });
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/username \/ email-address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password"]' }), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for error message to appear
    expect(
      await screen.findByText((content) => content.includes('Invalid Login Credentials.'))
    ).toBeInTheDocument();
  });
});