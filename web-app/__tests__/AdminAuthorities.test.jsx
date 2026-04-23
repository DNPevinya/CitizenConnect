import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AdminAuthorities from '../src/pages/AdminAuthorities';

// 1. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

vi.mock('../src/components/AddAuthorityModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="add-modal">
      <button onClick={onClose} data-testid="close-add">Close</button>
    </div>
  ) : null 
}));

vi.mock('../src/components/EditAuthorityModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="edit-modal">
      <button onClick={onClose} data-testid="close-edit">Close</button>
    </div>
  ) : null 
}));

vi.mock('../src/components/DeleteModal', () => ({ 
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="delete-modal">
      <button onClick={onClose} data-testid="close-delete">Close</button>
    </div>
  ) : null 
}));

// 2. MOCK FETCH & LOCAL STORAGE
global.fetch = vi.fn();

const mockAuthorities = [
  { authority_id: 1, name: 'Water Board', department: 'Water Supply Services', region: 'Colombo', officer_count: 5 },
  { authority_id: 2, name: 'Traffic Police', department: 'Public Safety', region: 'Kandy', officer_count: 10 },
];
const mockDepartments = [{ id: 1, name: 'Water Supply Services' }, { id: 2, name: 'Public Safety' }];
const mockRegions = [{ id: 1, name: 'Colombo' }, { id: 2, name: 'Kandy' }];

describe('AdminAuthorities Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default successful fetch responses for the 3 Promise.all calls
    global.fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, data: mockAuthorities }) // authorities-list
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, data: mockDepartments }) // departments-list
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, data: mockRegions }) // regions-list
      });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // --- 1. RENDERING & DATA FETCHING ---
  it('shows loading state initially and then renders authorities table and stats', async () => {
    render(<AdminAuthorities />);
    
    expect(screen.getByText('Loading...')).toBeTruthy();

    await waitFor(() => {
      // Check Stats Cards (Total Authorities: 2, Assigned Officers: 15)
      expect(screen.getByText('Total Authorities')).toBeTruthy();
      // "2" might be present as the h3 text
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      expect(h3Elements.some(el => el.textContent === '2')).toBe(true);
      expect(h3Elements.some(el => el.textContent === '15')).toBe(true); // 5 + 10 officers

      // Check Table Data
      expect(screen.getByText('Water Board')).toBeTruthy();
      expect(screen.getByText('Water Supply Services')).toBeTruthy();
      expect(screen.getByText('5 Officers')).toBeTruthy();

      expect(screen.getByText('Traffic Police')).toBeTruthy();
      expect(screen.getByText('Kandy')).toBeTruthy();
      expect(screen.getByText('10 Officers')).toBeTruthy();
    });
  });

  // --- 2. FILTERING TESTS ---
  it('filters authorities by search term (Name or Department)', async () => {
    render(<AdminAuthorities />);

    await waitFor(() => {
      expect(screen.getByText('Water Board')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText('Search authorities...');
    
    // Filter by name
    fireEvent.change(searchInput, { target: { value: 'Traffic' } });

    expect(screen.queryByText('Water Board')).toBeNull();
    expect(screen.getByText('Traffic Police')).toBeTruthy();

    // Filter by department
    fireEvent.change(searchInput, { target: { value: 'Water' } });
    
    expect(screen.getByText('Water Board')).toBeTruthy();
    expect(screen.queryByText('Traffic Police')).toBeNull();

    // No matches
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    expect(screen.queryByText('Water Board')).toBeNull();
    expect(screen.queryByText('Traffic Police')).toBeNull();
    expect(screen.getByText('No authorities match your search.')).toBeTruthy();
  });

  // --- 3. MODALS INTERACTION ---
  it('opens and closes the Add Authority modal', async () => {
    render(<AdminAuthorities />);

    await waitFor(() => {
      expect(screen.getByText('Water Board')).toBeTruthy();
    });

    // Click Add Authority
    fireEvent.click(screen.getByText('Add Authority'));
    expect(screen.getByTestId('add-modal')).toBeTruthy();

    // Close Modal
    fireEvent.click(screen.getByTestId('close-add'));
    expect(screen.queryByTestId('add-modal')).toBeNull();
  });

  it('opens and closes the Edit Authority modal', async () => {
    render(<AdminAuthorities />);

    await waitFor(() => {
      expect(screen.getAllByTitle('Edit Authority').length).toBe(2);
    });

    // Click first Edit
    fireEvent.click(screen.getAllByTitle('Edit Authority')[0]);
    expect(screen.getByTestId('edit-modal')).toBeTruthy();

    // Close Modal
    fireEvent.click(screen.getByTestId('close-edit'));
    expect(screen.queryByTestId('edit-modal')).toBeNull();
  });

  it('opens and closes the Delete Authority modal', async () => {
    render(<AdminAuthorities />);

    await waitFor(() => {
      expect(screen.getAllByTitle('Delete Authority').length).toBe(2);
    });

    // Click first Delete
    fireEvent.click(screen.getAllByTitle('Delete Authority')[0]);
    expect(screen.getByTestId('delete-modal')).toBeTruthy();

    // Close Modal
    fireEvent.click(screen.getByTestId('close-delete'));
    expect(screen.queryByTestId('delete-modal')).toBeNull();
  });

});
