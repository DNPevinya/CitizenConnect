import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ViewComplaintsScreen from '../../src/screens/ViewComplaintsScreen';

// Fake Dependencies 

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

// Intercept all network requests to avoid hitting a real database during tests
global.fetch = jest.fn();

// Dummy Data
// A few fake complaints covering different statuses so we can test the filtering logic.
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
    complaint_id: 3, // Testing the fallback ID logic in the component
    title: 'Deep Pothole', 
    description: 'Damaging cars on 5th Ave.', 
    status: 'IN PROGRESS', 
    created_at: '2026-04-22T10:00:00Z', 
    authority_id: 2 
  },
];

describe('ViewComplaintsScreen', () => {
  const mockOnNavigateToDetails = jest.fn();
  const testUserId = 99;

  beforeEach(() => {
    // Start fresh for every test
    jest.clearAllMocks();
  });

  it('fetches complaints on mount and renders them correctly', async () => {
    // Pretend the server returned our fake list of complaints
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getByText } = render(
      <ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} userId={testUserId} />
    );

    // Verify it asked the server for the correct user's data
    expect(global.fetch).toHaveBeenCalledWith(`http://mock-server.com/api/complaints/user/${testUserId}`);

    // Wait for the UI to update and verify the data rendered properly
    await waitFor(() => {
      expect(getByText('Broken Water Pipe')).toBeTruthy();
      expect(getByText('Noise Complaint')).toBeTruthy();
      expect(getByText('Deep Pothole')).toBeTruthy();
      
      // Verify that the custom ID formatting (#SL-1) worked
      expect(getByText('#SL-1')).toBeTruthy(); 
    });
  });

  it('displays the empty state when no complaints are returned or the fetch fails', async () => {
    // Force a network failure to test the error handling
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    const { getByText } = render(<ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />);

    // Ensure the fallback message appears gracefully
    await waitFor(() => {
      expect(getByText('No reports found.')).toBeTruthy();
    });
  });

  it('filters the list when a status tab is pressed', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getByText, queryByText } = render(<ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />);

    // Wait for the initial list to load
    await waitFor(() => expect(getByText('Broken Water Pipe')).toBeTruthy());

    // Tap the "Resolved" tab
    fireEvent.press(getByText('Resolved'));

    // Verify the list filtered out the unresolved items
    await waitFor(() => {
      expect(getByText('Noise Complaint')).toBeTruthy();
      expect(queryByText('Broken Water Pipe')).toBeNull();
      expect(queryByText('Deep Pothole')).toBeNull();
    });
  });

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

    // Test searching by word
    fireEvent.changeText(searchInput, 'Pothole');
    await waitFor(() => {
      expect(getByText('Deep Pothole')).toBeTruthy();
      expect(queryByText('Broken Water Pipe')).toBeNull();
    });

    // Test searching by ID format
    fireEvent.changeText(searchInput, 'SL-1');
    await waitFor(() => {
      expect(getByText('Broken Water Pipe')).toBeTruthy();
      expect(queryByText('Deep Pothole')).toBeNull();
    });
  });

  it('triggers onNavigateToDetails with the correct ID when "View Details" is pressed', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaints }),
    });

    const { getAllByText, getByText } = render(
      <ViewComplaintsScreen onNavigateToDetails={mockOnNavigateToDetails} />
    );

    await waitFor(() => expect(getByText('Broken Water Pipe')).toBeTruthy());

    // Grab the first "View Details" button, which corresponds to the first item (ID: 1)
    const viewDetailsButtons = getAllByText('View Details');
    fireEvent.press(viewDetailsButtons[0]);

    // Verify it told the app navigator to open the details page for ID 1
    expect(mockOnNavigateToDetails).toHaveBeenCalledWith(1);
  });
});