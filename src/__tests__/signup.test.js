import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup';
import '@testing-library/jest-dom';

import { fetchNoAuth } from '../assets/util/FetchRequest.js';

// Mock fetchNoAuth
jest.mock('../assets/util/FetchRequest.js', () => ({
  fetchNoAuth: jest.fn(),
}));

describe('Signup Page', () => {
  test('renders Signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // Check for a heading or label unique to the signup page
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    // Check for input fields
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });
    expect(passwordInput).toBeInTheDocument();

    expect(screen.getByLabelText(/re-enter password/i)).toBeInTheDocument();
    // Check for submit button
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('allows user to type in email, username, password, and re-password', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[name="password"]' });
    const rePasswordInput = screen.getByLabelText(/re-enter password/i, { selector: 'input[name="re-password"]' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'usernametest' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(usernameInput.value).toBe('usernametest');
    expect(passwordInput.value).toBe('password123');
    expect(rePasswordInput.value).toBe('password123');
  });

  test('submits signup form and handles response', async () => {
    fetchNoAuth.mockImplementation((url, data, method, failureFn, successFn) => {
      successFn({
        json: async () => ({
          data: {
            username: 'newuser',
            role: 'user',
          },
        }),
      });
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password"]' }), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/re-enter password/i, { selector: 'input[name="re-password"]' }), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(fetchNoAuth).toHaveBeenCalledWith(
        "auth/signup", 
        {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123'
        },
        "POST",
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  test('shows error message when signup fails', async () => {
    fetchNoAuth.mockImplementation((url, data, method, failureFn, successFn) => {
      // Simulate a failed signup response with correct structure
      failureFn({
        json: async () => ({
          errors: [
            { msg: 'E-Mail address already exists!' },
            { msg: 'Username already exists!' },
            { msg: 'Password length cannot be less than 8' },
          ],
        }),
      });
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'existinguser' } });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password"]' }), { target: { value: 'passwo' } });
    fireEvent.change(screen.getByLabelText(/re-enter password/i, { selector: 'input[name="re-password"]' }), { target: { value: 'passwo' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for error message to appear
    expect(
      await screen.findByText('E-Mail address already exists!')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Username already exists!')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password length cannot be less than 8')
    ).toBeInTheDocument();
  });
});
