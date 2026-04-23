import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ViewComplaintsScreen from '../../src/screens/ViewComplaintsScreen';

// ==========================================
// 1. MOCKS
// ==========================================
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} />,
  };
});

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

global.fetch = jest.fn();

// ==========================================
// 2. MOCK DATA
// ==========================================
const mockComplaints = [
  { 
    id: 1, 
    title: 'Broken Water Pipe', 
    description: 'Massive leak on Main St.', 
    status: 'PENDING', 
    created_at: '2026-04-20T10:00:00Z', 
    authority_id: null 
  },
  { 
    id: 2, 
    title: 'Noise Complaint', 
    description: 'Loud construction at night.', 
    status: 'RESOLVED', 
    created_at: '2026-04-21T10:00:00Z', 
    authority_id: 5 
  },
  { 
    complaint_id: 3, // Testing the fallback ID logic in your component
    title: 'Deep Pothole', 
    description: 'Damaging cars on 5th Ave.', 
    status: 'IN PROGRESS', 
    created_at: '2026-04-22T10:00:00Z', 
    authority_id: 2 
  },
];

// ==========================================
// 3. TEST SUITE
// ==========================================
describe('ViewComplaintsScreen', () => {
  const mockOnNavigateToDetails = jest.fn();
  const testUserId = 99;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- TEST 1: FETCH & RENDER ---
  it('fetches complaints on mount and renders them correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getByText, getAllByText } = render(
      <ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} userId={testUserId} />
    );

    // Verify API was called with the correct user ID
    expect(global.fetch).toHaveBeenCalledWith(`http://mock-server.com/api/complaints/user/${testUserId}`);

    // Wait for loading to finish and data to render
    await waitFor(() => {
      expect(getByText('Broken Water Pipe')).toBeTruthy();
      expect(getByText('Noise Complaint')).toBeTruthy();
      expect(getByText('Deep Pothole')).toBeTruthy();
      // Verifying the custom ID formatting (#SL-1)
      expect(getByText('#SL-1')).toBeTruthy(); 
    });
  });

  // --- TEST 2: EMPTY STATE & ERROR HANDLING ---
  it('displays the empty state when no complaints are returned or fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    const { getByText } = render(<ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />);

    await waitFor(() => {
      expect(getByText('No reports found.')).toBeTruthy();
    });
  });

  // --- TEST 3: SEGMENTED TAB FILTERING ---
  it('filters the list when a status tab is pressed', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getByText, queryByText } = render(<ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />);

    await waitFor(() => expect(getByText('Broken Water Pipe')).toBeTruthy());

    // Click the "Resolved" tab
    fireEvent.press(getByText('Resolved'));

    // "Noise Complaint" should remain, but "Broken Water Pipe" should be hidden
    await waitFor(() => {
      expect(getByText('Noise Complaint')).toBeTruthy();
      expect(queryByText('Broken Water Pipe')).toBeNull();
      expect(queryByText('Deep Pothole')).toBeNull();
    });
  });

  // --- TEST 4: SEARCH BAR LOGIC ---
  it('filters the list based on search query input', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getByText, getByPlaceholderText, queryByText } = render(
      <ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />
    );

    await waitFor(() => expect(getByText('Deep Pothole')).toBeTruthy());

    const searchInput = getByPlaceholderText('Search by ID or Title...');

    // Search by Title
    fireEvent.changeText(searchInput, 'Pothole');
    await waitFor(() => {
      expect(getByText('Deep Pothole')).toBeTruthy();
      expect(queryByText('Broken Water Pipe')).toBeNull();
    });

    // Search by ID format
    fireEvent.changeText(searchInput, 'SL-1');
    await waitFor(() => {
      expect(getByText('Broken Water Pipe')).toBeTruthy();
      expect(queryByText('Deep Pothole')).toBeNull();
    });
  });

  // --- TEST 5: NAVIGATION ---
  it('triggers onNavigateToDetails with the correct ID when "View Details" is pressed', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getAllByText, getByText } = render(
      <ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />
    );

    await waitFor(() => expect(getByText('Broken Water Pipe')).toBeTruthy());

    // Grab all "View Details" buttons. The first one belongs to ID 1 (Broken Water Pipe).
    const viewDetailsButtons = getAllByText('View Details');
    fireEvent.press(viewDetailsButtons[0]);

    // Verify it passes the correct ID back up to the parent navigator
    expect(mockOnNavigateToDetails).toHaveBeenCalledWith(1);
  });
});