import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AdminOfficerManagement from '../src/pages/AdminOfficerManagement';

// 1. MOCK CHILD COMPONENTS
// We mock these to isolate the testing to just the AdminOfficerManagement component's logic
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

// For Modals, we check if they receive the `isOpen` prop correctly
vi.mock('../src/components/AddOfficerModal', () => ({ 
  default: ({ isOpen }) => isOpen ? <div data-testid="add-modal" /> : null 
}));
vi.mock('../src/components/EditOfficerModal', () => ({ 
  default: ({ isOpen }) => isOpen ? <div data-testid="edit-modal" /> : null 
}));
vi.mock('../src/components/DeleteOfficerModal', () => ({ 
  default: ({ isOpen }) => isOpen ? <div data-testid="delete-modal" /> : null 
}));

// 2. MOCK FETCH
global.fetch = vi.fn();

describe('AdminOfficerManagement Component', () => {

  const mockOfficers = [
    { user_id: 1, full_name: 'John Doe', email: 'john@example.com', employee_id_code: 'EMP001', authority_id: 10, authority_name: 'Water Board', status: 'Active' },
    { user_id: 2, full_name: 'Jane Smith', email: 'jane@example.com', employee_id_code: 'EMP002', authority_id: 11, authority_name: 'Electricity Board', status: 'Inactive' }
  ];

  const mockAuthorities = [
    { authority_id: 10, name: 'Water Board' },
    { authority_id: 11, name: 'Electricity Board' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // --- 1. RENDERING TESTS ---
  it('renders correctly and shows the syncing state initially', () => {
    // Return a never-resolving promise to keep it in the loading state
    global.fetch.mockReturnValue(new Promise(() => {}));
    
    render(<AdminOfficerManagement />);
    
    // Check initial UI text
    expect(screen.getByText('Officer Management')).toBeTruthy();
    expect(screen.getByText('Manage department officers, system access levels, and credentials.')).toBeTruthy();
    
    // Check Loading state
    expect(screen.getByText('Syncing database...')).toBeTruthy();
    
    // Verify mocked layout components render
    expect(screen.getByTestId('sidebar')).toBeTruthy();
    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  // --- 2. ASYNC/API DATA FETCHING TESTS ---
  it('fetches and displays officers and authorities successfully', async () => {
    // Mock the Promise.all dual fetch
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockOfficers })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockAuthorities })
      });

    render(<AdminOfficerManagement />);

    await waitFor(() => {
      // Check if officers rendered into the table
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('EMP001')).toBeTruthy();
      expect(screen.getByText('Jane Smith')).toBeTruthy();
      expect(screen.getByText('EMP002')).toBeTruthy();

      // Check if dropdown options rendered dynamically from authorities API
      expect(screen.getByRole('option', { name: 'Water Board' })).toBeTruthy();
      expect(screen.getByRole('option', { name: 'Electricity Board' })).toBeTruthy();
    });
  });

  // --- 3. ERROR HANDLING TESTS ---
  it('handles API failure gracefully and shows empty state', async () => {
    // Force a rejection to test the catch block
    global.fetch.mockRejectedValue(new Error("Network Error"));

    render(<AdminOfficerManagement />);

    await waitFor(() => {
      // Should clear loading state and show the empty fallback
      expect(screen.getByText('No officers match your filters.')).toBeTruthy();
    });
  });

  // --- 4. STATE/INTERACTION TESTS (FILTERING) ---
  it('filters officers by search term (Name, ID, or Email)', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockOfficers }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockAuthorities }) });

    render(<AdminOfficerManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, ID, or email...');
    
    // Search for Jane
    fireEvent.change(searchInput, { target: { value: 'Jane' } });

    // John should be hidden, Jane should remain
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    
    // Search by EMP ID
    fireEvent.change(searchInput, { target: { value: 'EMP001' } });
    expect(screen.queryByText('Jane Smith')).toBeNull();
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('filters officers by department dropdown', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockOfficers }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockAuthorities }) });

    render(<AdminOfficerManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    // The first select is Department, second is Status
    const selects = screen.getAllByRole('combobox');
    const deptSelect = selects[0];

    // Select Authority ID 11 (Electricity Board)
    fireEvent.change(deptSelect, { target: { value: '11' } }); 

    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
  });

  it('filters officers by status dropdown', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockOfficers }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockAuthorities }) });

    render(<AdminOfficerManagement />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    const selects = screen.getAllByRole('combobox');
    const statusSelect = selects[1];

    // Select Active status
    fireEvent.change(statusSelect, { target: { value: 'Active' } });

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.queryByText('Jane Smith')).toBeNull();
  });

  // --- 5. STATE/INTERACTION TESTS (MODALS) ---
  it('opens the Add Officer Modal when clicking the add button', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: [] }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: [] }) });

    render(<AdminOfficerManagement />);

    const addButton = screen.getByText(/Add New Officer/i);
    fireEvent.click(addButton);

    // Verify modal is opened
    expect(screen.getByTestId('add-modal')).toBeTruthy();
  });

  it('opens the Edit and Delete Modals when clicking action buttons on table rows', async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockOfficers }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true, data: mockAuthorities }) });

    render(<AdminOfficerManagement />);

    // Wait for rows to render
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    // Click Edit on the first row
    const editButtons = screen.getAllByTitle('Edit Officer');
    fireEvent.click(editButtons[0]);
    expect(screen.getByTestId('edit-modal')).toBeTruthy();
    
    // Click Delete on the first row
    const deleteButtons = screen.getAllByTitle('Permanently Delete');
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByTestId('delete-modal')).toBeTruthy();
  });

});
