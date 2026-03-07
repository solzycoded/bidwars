import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AuthProvider, { useAuth } from '../ContextProviders/AuthProvider.jsx';

// helper component that exposes auth context values for testing
function AuthConsumer() {
  const { user, loggedIn, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="user">{user ? user.username : 'null'}</span>
      <span data-testid="loggedIn">{loggedIn.yes ? 'yes' : 'no'}</span>
      <button
        data-testid="loginBtn"
        onClick={() =>
          login({ username: 'tester', role: 'user', token: 'tok' })
        }
      >
        login
      </button>
      <button data-testid="logoutBtn" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
}

describe('AuthProvider / useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('starts logged out when no auth data present', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
  });

  test('initialises from existing localStorage auth data', () => {
    const authPayload = { username: 'stored', role: 'admin', token: 'abc' };
    localStorage.setItem('auth', JSON.stringify(authPayload));

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('loggedIn')).toHaveTextContent('yes');
    expect(screen.getByTestId('user')).toHaveTextContent('stored');
  });

  test('login() updates context and localStorage', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('loginBtn'));

    expect(screen.getByTestId('loggedIn')).toHaveTextContent('yes');
    expect(screen.getByTestId('user')).toHaveTextContent('tester');

    const raw = localStorage.getItem('auth');
    expect(raw).not.toBeNull();
    const saved = JSON.parse(raw);
    expect(saved).toMatchObject({ username: 'tester', token: 'tok' });
  });

  test('logout() clears context and localStorage', () => {
    // start with a logged-in state
    localStorage.setItem(
      'auth',
      JSON.stringify({ username: 'foo', role: 'user', token: 'bar' })
    );

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    // sanity check initial state
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('yes');

    fireEvent.click(screen.getByTestId('logoutBtn'));

    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(localStorage.getItem('auth')).toBeNull();
  });

  test('logout() when user is already logged out (no-op)', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    // verify already logged out
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');

    // click logout when already logged out
    fireEvent.click(screen.getByTestId('logoutBtn'));

    // should remain logged out, no errors
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');
    expect(localStorage.getItem('auth')).toBeNull();
  });

  test('logout() resets isAdmin flag', () => {
    // start with admin logged in
    localStorage.setItem(
      'auth',
      JSON.stringify({ username: 'admin-user', role: 'admin', token: 'admin-token' })
    );

    render(
      <AuthProvider>
        <AdminConsumer />
      </AuthProvider>
    );

    // verify admin is logged in
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('yes');

    fireEvent.click(screen.getByTestId('logoutBtn'));

    // verify isAdmin is false after logout
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('no');
  });

  test('logout() followed by login with different role', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ username: 'user', role: 'user', token: 'user-token' })
    );

    render(
      <AuthProvider>
        <AdminConsumer />
      </AuthProvider>
    );

    // verify user is logged in
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('yes');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('no');

    // logout
    fireEvent.click(screen.getByTestId('logoutBtn'));
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('no');

    // login as admin
    fireEvent.click(screen.getByTestId('loginAdminBtn'));
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('yes');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('yes');
  });

  test('logout() multiple times is idempotent', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ username: 'foo', role: 'user', token: 'bar' })
    );

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    // first logout
    fireEvent.click(screen.getByTestId('logoutBtn'));
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');

    // second logout
    fireEvent.click(screen.getByTestId('logoutBtn'));
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');

    // third logout
    fireEvent.click(screen.getByTestId('logoutBtn'));
    expect(screen.getByTestId('loggedIn')).toHaveTextContent('no');

    // storage should remain empty
    expect(localStorage.getItem('auth')).toBeNull();
  });
});

// Helper component for testing admin/isAdmin flag
function AdminConsumer() {
  const { user, loggedIn, login, logout } = useAuth();

  return (
    <div>
      <span data-testid="user">{user ? user.username : 'null'}</span>
      <span data-testid="loggedIn">{loggedIn.yes ? 'yes' : 'no'}</span>
      <span data-testid="isAdmin">{loggedIn.isAdmin ? 'yes' : 'no'}</span>
      <button
        data-testid="loginBtn"
        onClick={() =>
          login({ username: 'tester', role: 'user', token: 'tok' })
        }
      >
        login
      </button>
      <button
        data-testid="loginAdminBtn"
        onClick={() =>
          login({ username: 'admin-tester', role: 'admin', token: 'admin-tok' })
        }
      >
        login as admin
      </button>
      <button data-testid="logoutBtn" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
}
