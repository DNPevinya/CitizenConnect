import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Settings from '../src/pages/Settings';

// 1. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

// 2. MOCK FETCH & LOCALSTORAGE
global.fetch = vi.fn();

const mockUser = {
  fullName: 'Jane Doe',
  email: 'jane.doe@urbansync.com',
  authorityName: 'Central Traffic Division',
  role: 'officer'
};

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup localStorage mock before each test
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUser));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // --- TEST 1: RENDERING & LOCALSTORAGE ---
  it('parses localStorage and renders the read-only profile data correctly', async () => {
    render(<Settings />);

    // Wait for the component to mount and read the mocked localStorage
    await waitFor(() => {
      // Inputs in this component are readOnly, so we check their display values
      expect(screen.getByDisplayValue('Jane Doe')).toBeTruthy();
      expect(screen.getByDisplayValue('jane.doe@urbansync.com')).toBeTruthy();
      expect(screen.getByDisplayValue('Central Traffic Division')).toBeTruthy();
    });
  });

  // --- TEST 2: UI INTERACTION (PASSWORD VISIBILITY) ---
  it('toggles password visibility when the eye icon is clicked', () => {
    render(<Settings />);

    const currentPasswordInput = screen.getByPlaceholderText('••••••••');
    
    // Initially, the input type should be 'password'
    expect(currentPasswordInput.type).toBe('password');

    // The component has 4 buttons: 3 eye icons, 1 submit button. 
    // We grab the first button (which is the eye icon for the current password).
    const buttons = screen.getAllByRole('button');
    const firstEyeIcon = buttons[0];

    // Click the eye icon
    fireEvent.click(firstEyeIcon);

    // The input type should now be 'text'
    expect(currentPasswordInput.type).toBe('text');
  });

  // --- TEST 3: VALIDATION (MISMATCH) ---
  it('displays a mismatch error if new password and confirm password do not match', async () => {
    render(<Settings />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'oldpass123' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'newSecurePass!' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat new password'), { target: { value: 'differentPass!' } });

    // Click Submit
    fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

    // Verify Error Message Appears
    await waitFor(() => {
      expect(screen.getByText(/Mismatch Error/i)).toBeTruthy();
      // Ensure API was NOT called
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  // --- TEST 4: BUTTON DISABLED STATE (LENGTH VALIDATION) ---
  it('disables the submit button if the new password is less than 8 characters', () => {
    render(<Settings />);

    const submitButton = screen.getByRole('button', { name: /Update Password/i });
    
    // Initially disabled because new password is empty (length 0)
    expect(submitButton.disabled).toBe(true);

    // Type a 5-character password
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: '12345' } });
    expect(submitButton.disabled).toBe(true);

    // Type an 8-character password
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: '12345678' } });
    expect(submitButton.disabled).toBe(false);
  });

  // --- TEST 5: API SUCCESS ---
  it('submits successfully when valid, matching passwords are provided', async () => {
    // Mock the successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Password updated successfully.' }),
    });

    render(<Settings />);

    // Fill out the form correctly
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'oldpass123' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 8 characters'), { target: { value: 'newSecurePass!' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat new password'), { target: { value: 'newSecurePass!' } });

    // Click Submit
    fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

    // Verify API call and Success Message
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/update-password', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'jane.doe@urbansync.com', // Pulled from our mocked localStorage
          currentPassword: 'oldpass123',
          newPassword: 'newSecurePass!'
        })
      }));
      
      expect(screen.getByText('Password updated successfully.')).toBeTruthy();
    });
  });
});