import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import OfficerComplaintDetails from '../src/pages/OfficerComplaintDetails';

// 1. MOCK THE ROUTER
// Note: The component uses useSearchParams, not useParams
const mockNavigate = vi.fn();
let mockSearchParams = new URLSearchParams({ id: '123' });

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams],
}));

// 2. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock('../src/components/RejectComplaintModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="reject-modal">
      <button onClick={onClose} data-testid="close-reject-modal">Close</button>
    </div>
  ) : null 
}));

// 3. MOCK FETCH & LOCAL STORAGE
global.fetch = vi.fn();
// Mock alert since it is used in the component
global.alert = vi.fn();

const mockComplaint = {
  complaint_id: 123,
  status: 'PENDING',
  created_at: '2026-04-23T12:00:00Z',
  title: 'Broken Water Pipe',
  description: 'Massive water leak on Main St.',
  category: 'Water Supply Services',
  user_id: 456,
  location_text: 'Main St, Colombo',
  latitude: 6.9271,
  longitude: 79.8612,
  image_url: '/uploads/img1.jpg,/uploads/img2.jpg',
  admin_notes: 'Urgent attention required.'
};

describe('OfficerComplaintDetails Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams({ id: '123' }); // Reset params
    
    // Mock an Officer user in LocalStorage
    const officerUser = { id: 2, role: 'officer', authorityName: 'Water Board', fullName: 'John Doe' };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(officerUser));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // --- 1. RENDERING TESTS ---
  it('shows loading state initially', () => {
    // Return a promise that never resolves to keep it in loading state
    global.fetch.mockReturnValueOnce(new Promise(() => {}));
    
    render(<OfficerComplaintDetails />);
    expect(screen.getByText('Loading Complaint Details...')).toBeTruthy();
  });

  it('renders complaint details successfully after fetching', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaint })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      // Check Header/Title
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
      expect(screen.getByText('Broken Water Pipe')).toBeTruthy();
      expect(screen.getByText('Massive water leak on Main St.')).toBeTruthy();
      expect(screen.getByText('Water Supply Services')).toBeTruthy();
      
      // Check Admin Notes
      expect(screen.getByText('Urgent attention required.')).toBeTruthy();
      
      // Check Location
      expect(screen.getByText('Main St, Colombo')).toBeTruthy();
      
      // Check Images (2 images split by comma)
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(2);
      expect(images[0].src).toContain('/uploads/img1.jpg');
    });
  });

  it('displays "Complaint not found" if API fails to find it', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, message: 'Not found' })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint not found.')).toBeTruthy();
    });
  });

  // --- 2. CONDITIONAL UI TESTS ---
  it('shows Reject & Escalate button for PENDING status', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: { ...mockComplaint, status: 'PENDING' } })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Reject & Escalate')).toBeTruthy();
    });
  });

  it('hides Reject & Escalate button for RESOLVED status', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: { ...mockComplaint, status: 'RESOLVED' } })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
      expect(screen.queryByText('Reject & Escalate')).toBeNull();
    });
  });

  it('hides Reject & Escalate button for REJECTED status', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: { ...mockComplaint, status: 'REJECTED' } })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
      expect(screen.queryByText('Reject & Escalate')).toBeNull();
    });
  });

  // --- 3. STATE / INTERACTION & API TESTS ---
  it('opens and closes the Reject modal', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaint })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Reject & Escalate')).toBeTruthy();
    });

    // Click Escalate
    fireEvent.click(screen.getByText('Reject & Escalate'));
    expect(screen.getByTestId('reject-modal')).toBeTruthy();

    // Close Modal
    fireEvent.click(screen.getByTestId('close-reject-modal'));
    expect(screen.queryByTestId('reject-modal')).toBeNull();
  });

  it('successfully updates the complaint status', async () => {
    // 1. Fetch details
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaint }) // starts as PENDING
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
    });

    // 2. Select new status
    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'IN PROGRESS' } });

    // 3. Mock the PATCH request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    // 4. Click Apply Transition
    const applyButton = screen.getByText('Apply Transition');
    fireEvent.click(applyButton);

    await waitFor(() => {
      // Check if fetch was called with the correct URL and Body
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/complaints/update-status/123', expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'IN PROGRESS' })
      }));
      // Check if success alert was triggered
      expect(global.alert).toHaveBeenCalledWith("Status updated successfully!");
    });
  });

  it('displays an error alert if the status update fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaint })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
    });

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'RESOLVED' } });

    // Mock a failed PATCH request
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    fireEvent.click(screen.getByText('Apply Transition'));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Failed to update status.");
    });
  });

  it('navigates back when the back button is clicked', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaint })
    });

    render(<OfficerComplaintDetails />);

    await waitFor(() => {
      expect(screen.getByText('Complaint #CMP-123')).toBeTruthy();
    });

    // The back button is the SVG inside a button, we can select the button by its role or closest testid/class.
    // In the component: <button onClick={() => navigate(-1)} className="w-8 h-8 flex ...
    const buttons = screen.getAllByRole('button');
    // The back button is the first button rendered in the header section
    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
