import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import OfficerDashboard from '../src/pages/OfficerDashboard';

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
  },
  writable: true
});

global.fetch = vi.fn();

describe('OfficerDashboard Component', () => {

  const mockOfficerUser = {
    id: 2,
    fullName: 'Jane Smith',
    authority_id: 15,
    authorityName: 'Electrical Dept',
    role: 'officer'
  };

  const mockComplaints = [
    { complaint_id: 201, citizen_name: 'John Wick', citizen_phone: '555-0999', title: 'Power outage', status: 'PENDING' },
    { complaint_id: 202, citizen_name: 'Sarah Connor', citizen_phone: '555-0888', title: 'Sparking wire', status: 'IN PROGRESS' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockOfficerUser));
  });

  afterEach(() => {
    cleanup();
  });

  // --- 1. RENDER & SECURITY TESTS ---
  it('redirects to login if no user is found in localStorage', () => {
    window.localStorage.getItem.mockReturnValue(null);
    render(<OfficerDashboard />);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('renders the initial loading state and layout correctly', () => {
    global.fetch.mockReturnValue(new Promise(() => {})); // Keeps it loading
    
    render(<OfficerDashboard />);
    
    // Header should reflect the officer's name and department from localStorage
    expect(screen.getByTestId('header').textContent).toBe('Welcome, Officer Jane Smith | Electrical Dept');
    
    // Total Assigned Cases should show "..."
    expect(screen.getByText('Total Assigned Cases')).toBeTruthy();
    expect(screen.getByText('...')).toBeTruthy();
    
    // Table should show syncing
    expect(screen.getByText('Syncing records...')).toBeTruthy();
  });

  // --- 2. ASYNC/API TESTS ---
  it('fetches and displays the officer statistics and recent activity', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerDashboard />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/complaints/authority/15');
      
      // Total Assigned Cases
      expect(screen.getByText('2')).toBeTruthy();
      
      // Recent Activity Table
      expect(screen.getByText('#CMP-201')).toBeTruthy();
      expect(screen.getByText('John Wick')).toBeTruthy();
      expect(screen.getByText('Power outage')).toBeTruthy();
      expect(screen.getByText('PENDING')).toBeTruthy();
      
      expect(screen.getByText('#CMP-202')).toBeTruthy();
      expect(screen.getByText('Sparking wire')).toBeTruthy();
    });
  });

  // --- 3. ERROR HANDLING ---
  it('handles API failure gracefully by leaving the table empty', async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(<OfficerDashboard />);

    await waitFor(() => {
      // The loading text should disappear
      expect(screen.queryByText('Syncing records...')).toBeNull();
      // Total count should be 0 because it falls back to complaints.length which is 0
      expect(screen.getByText('0')).toBeTruthy();
    });
  });

  // --- 4. STATE/INTERACTION TESTS ---
  it('navigates to the full workbox when View Full Workbox is clicked', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] })
    });

    render(<OfficerDashboard />);

    await waitFor(() => {
      expect(screen.queryByText('Syncing records...')).toBeNull();
    });

    const viewAllBtn = screen.getByText('View Full Workbox');
    fireEvent.click(viewAllBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/officer/complaints');
  });

  it('navigates to complaint details when a specific action button is clicked', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints })
    });

    render(<OfficerDashboard />);

    await waitFor(() => {
      expect(screen.getByText('#CMP-201')).toBeTruthy();
    });

    // Grab all action buttons in the table
    const actionButtons = screen.getAllByRole('button').filter(btn => 
      !btn.textContent.includes('View Full Workbox') // Exclude the header button
    );
    
    // Click the first one (for CMP-201)
    fireEvent.click(actionButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/officer/complaint-details?id=201');
  });

});
