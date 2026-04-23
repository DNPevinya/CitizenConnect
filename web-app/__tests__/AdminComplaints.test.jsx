import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AdminComplaints from '../src/pages/AdminComplaints';

// 1. MOCK THE ROUTER
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock('../src/components/ReassignModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="reassign-modal">
      <button onClick={onClose} data-testid="close-reassign">Close</button>
    </div>
  ) : null 
}));
vi.mock('../src/components/DetailsModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="details-modal">
      <button onClick={onClose} data-testid="close-details">Close</button>
    </div>
  ) : null 
}));
vi.mock('../src/components/DeleteComplaintModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="delete-modal">
      <button onClick={onClose} data-testid="close-delete">Close</button>
    </div>
  ) : null 
}));

// 3. MOCK FETCH & LOCAL STORAGE
global.fetch = vi.fn();

const mockStats = { total: 100, pending: 10, active: 40, resolved: 50 };
const mockComplaints = [
  { complaint_id: 101, title: 'Massive Pipe Leak', category: 'Water Supply Services', status: 'PENDING', authority_name: null, created_at: '2023-10-01' },
  { complaint_id: 102, title: 'Broken Streetlight', category: 'Public Safety & Law Enforcement', status: 'RESOLVED', authority_name: 'Police', created_at: '2023-10-02' },
  { complaint_id: 103, title: 'Deep Pothole', category: 'Urban Infrastructure & Municipal Services', status: 'IN PROGRESS', authority_name: 'City Council', created_at: '2023-10-03' },
];

describe('AdminComplaints Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock Super Admin user in LocalStorage
    const adminUser = { id: 1, role: 'super_admin' };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(adminUser));

    // Default successful fetch responses
    global.fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, data: mockStats })
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, data: mockComplaints })
      });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // --- 1. ACCESS & SECURITY TESTS ---
  it('redirects to login if no user is in localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    render(<AdminComplaints />);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('redirects to officer dashboard if user is not super_admin', () => {
    const officerUser = { id: 2, role: 'officer' };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(officerUser));
    render(<AdminComplaints />);
    expect(mockNavigate).toHaveBeenCalledWith('/officer/dashboard');
  });

  // --- 2. RENDERING & DATA FETCHING ---
  it('shows loading state initially and then renders complaints', async () => {
    render(<AdminComplaints />);
    
    expect(screen.getByText('Loading Master List...')).toBeTruthy();

    await waitFor(() => {
      // Check if all complaints are rendered
      expect(screen.getByText('#CMP-101')).toBeTruthy();
      expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
      expect(screen.getByText('#CMP-102')).toBeTruthy();
      expect(screen.getByText('#CMP-103')).toBeTruthy();
    });
  });

  // --- 3. FILTERING TESTS ---
  it('filters complaints by search term (Title or ID)', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText('Search Subject or ID...');
    fireEvent.change(searchInput, { target: { value: 'Pothole' } });

    expect(screen.queryByText('Massive Pipe Leak')).toBeNull();
    expect(screen.getByText('Deep Pothole')).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: '101' } });
    expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    expect(screen.queryByText('Deep Pothole')).toBeNull();
  });

  it('filters complaints by Category', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    });

    const categorySelect = screen.getAllByRole('combobox')[0]; // The first select is Category
    fireEvent.change(categorySelect, { target: { value: 'Water Supply Services' } });

    expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    expect(screen.queryByText('Deep Pothole')).toBeNull();
  });

  it('filters complaints by Status', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    });

    const statusSelect = screen.getAllByRole('combobox')[1]; // The second select is Status
    fireEvent.change(statusSelect, { target: { value: 'RESOLVED' } });

    expect(screen.getByText('Broken Streetlight')).toBeTruthy();
    expect(screen.queryByText('Massive Pipe Leak')).toBeNull();
  });

  it('clears all filters when Clear button is clicked', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    });

    // Apply some filters
    const searchInput = screen.getByPlaceholderText('Search Subject or ID...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    expect(screen.queryByText('Massive Pipe Leak')).toBeNull();

    // Click Clear
    fireEvent.click(screen.getByText('Clear'));

    // Everything should be back
    expect(screen.getByText('Massive Pipe Leak')).toBeTruthy();
    expect(screen.getByText('Deep Pothole')).toBeTruthy();
  });

  // --- 4. MODALS INTERACTION ---
  it('opens and closes the Details modal', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getAllByText('View Details').length).toBe(3);
    });

    // Click first View Details
    fireEvent.click(screen.getAllByText('View Details')[0]);
    expect(screen.getByTestId('details-modal')).toBeTruthy();

    fireEvent.click(screen.getByTestId('close-details'));
    expect(screen.queryByTestId('details-modal')).toBeNull();
  });

  it('opens and closes the Reassign modal', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      expect(screen.getAllByText('Reassign').length).toBe(3);
    });

    // Click first Reassign
    fireEvent.click(screen.getAllByText('Reassign')[0]);
    expect(screen.getByTestId('reassign-modal')).toBeTruthy();

    fireEvent.click(screen.getByTestId('close-reassign'));
    expect(screen.queryByTestId('reassign-modal')).toBeNull();
  });

  it('opens and closes the Delete modal', async () => {
    render(<AdminComplaints />);

    await waitFor(() => {
      // The delete button is an SVG, but it has title="Delete Complaint"
      expect(screen.getAllByTitle('Delete Complaint').length).toBe(3);
    });

    // Click first Delete
    fireEvent.click(screen.getAllByTitle('Delete Complaint')[0]);
    expect(screen.getByTestId('delete-modal')).toBeTruthy();

    fireEvent.click(screen.getByTestId('close-delete'));
    expect(screen.queryByTestId('delete-modal')).toBeNull();
  });

});
