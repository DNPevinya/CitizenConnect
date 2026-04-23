import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import OfficerComplaints from '../src/pages/OfficerComplaints';

// 1. MOCK ROUTER
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: ({ title }) => <header data-testid="header">{title}</header> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

// 3. MOCK LOCAL STORAGE & FETCH
Object.defineProperty(window, 'localStorage', {
  value: { 
    getItem: vi.fn(),
    setItem: vi.fn() 
  },
  writable: true
});

global.fetch = vi.fn();

describe('OfficerComplaints Component', () => {

  const mockOfficerUser = {
    id: 1,
    fullName: 'Jane Officer',
    authority_id: 10,
    authorityName: 'Water Board',
    role: 'officer'
  };

  const mockComplaints = [
    { complaint_id: 101, citizen_name: 'Alex Doe', citizen_phone: '555-0100', title: 'Leaking pipe on main st', status: 'PENDING' },
    { complaint_id: 102, citizen_name: 'Sam Smith', citizen_phone: '555-0200', title: 'No water pressure', status: 'IN PROGRESS' },
    { complaint_id: 103, citizen_name: 'Charlie Brown', citizen_phone: '555-0300', title: 'Contaminated supply', status: 'RESOLVED' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default to an authorized officer in local storage
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockOfficerUser));
  });

  afterEach(() => {
    cleanup();
  });

  // --- 1. RENDER & SECURITY TESTS ---
  it('redirects to login if no user is found in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(null);
    render(<OfficerComplaints />);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    // Fetch shouldn't be called if unauthorized
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('renders correctly and sets up layout with officer context', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] })
    });

    render(<OfficerComplaints />);
    
    expect(screen.getByText('Assigned Workbox')).toBeTruthy();
    expect(screen.getByTestId('sidebar')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
    
    // Header title should include the authority name parsed from local storage
    await waitFor(() => {
      expect(screen.getByTestId('header').textContent).toBe('Master Workbox | Water Board');
    });
  });

  // --- 2. ASYNC/API TESTS ---
  it('fetches and displays assigned complaints based on authority_id', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerComplaints />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/complaints/authority/10');
      
      // Verify rows are rendered
      expect(screen.getByText('#CMP-101')).toBeTruthy();
      expect(screen.getByText('Leaking pipe on main st')).toBeTruthy();
      
      expect(screen.getByText('#CMP-102')).toBeTruthy();
      expect(screen.getByText('No water pressure')).toBeTruthy();
    });
  });

  // --- 3. ERROR HANDLING ---
  it('handles API failure gracefully (no crash, empty table)', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Down'));

    render(<OfficerComplaints />);

    await waitFor(() => {
      // The header for the table should still be there
      expect(screen.getByText('Complaint ID')).toBeTruthy();
      // No rows should be rendered
      expect(screen.queryByText('#CMP-101')).toBeNull();
    });
  });

  // --- 4. STATE/INTERACTION TESTS ---
  it('filters complaints by search query (Title, ID, Citizen Info)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerComplaints />);

    await waitFor(() => {
      expect(screen.getByText('#CMP-101')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText('Search by ID, Name or Phone...');
    
    // Search by partial title
    fireEvent.change(searchInput, { target: { value: 'pressure' } });
    expect(screen.queryByText('#CMP-101')).toBeNull();
    expect(screen.getByText('#CMP-102')).toBeTruthy();

    // Search by partial citizen name
    fireEvent.change(searchInput, { target: { value: 'Alex' } });
    expect(screen.getByText('#CMP-101')).toBeTruthy();
    expect(screen.queryByText('#CMP-102')).toBeNull();

    // Search by ID
    fireEvent.change(searchInput, { target: { value: '103' } });
    expect(screen.queryByText('#CMP-101')).toBeNull();
    expect(screen.getByText('#CMP-103')).toBeTruthy();
  });

  it('filters complaints by status dropdown', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerComplaints />);

    await waitFor(() => {
      expect(screen.getByText('#CMP-101')).toBeTruthy();
    });

    const statusDropdown = screen.getByRole('combobox');
    
    // Filter by Pending
    fireEvent.change(statusDropdown, { target: { value: 'Pending' } });
    
    // The component converts dropdown "Pending" to "PENDING" and matches exactly
    expect(screen.getByText('#CMP-101')).toBeTruthy(); 
    expect(screen.queryByText('#CMP-102')).toBeNull();
    expect(screen.queryByText('#CMP-103')).toBeNull();
  });

  it('navigates to complaint details when the action button is clicked', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerComplaints />);

    await waitFor(() => {
      expect(screen.getByText('#CMP-101')).toBeTruthy();
    });

    // The action buttons don't have text, but they are the only buttons in the rows.
    // They might be found by Role. Let's find all buttons and click the first one.
    const actionButtons = screen.getAllByRole('button');
    fireEvent.click(actionButtons[0]);

    // Verify it navigates to the details page with the correct query param
    expect(mockNavigate).toHaveBeenCalledWith('/officer/complaint-details?id=101');
  });

});
