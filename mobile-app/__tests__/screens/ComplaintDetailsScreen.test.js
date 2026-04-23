import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ComplaintDetailsScreen from '../../src/screens/ComplaintDetailsScreen';

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
    MaterialCommunityIcons: (props) => <View testID={`icon-${props.name}`} {...props} />,
  };
});

// Mock react-native-webview since it doesn't run in Node/Jest
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: (props) => <View testID="mock-webview" {...props} />,
  };
});

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

global.fetch = jest.fn();

// ==========================================
// 2. TEST SUITE
// ==========================================
describe('ComplaintDetailsScreen', () => {
  const mockOnBack = jest.fn();
  const mockComplaintId = '12345';

  const mockComplaintData = {
    id: mockComplaintId,
    title: 'Huge Pothole on Main St',
    category: 'Roads',
    description: 'There is a massive pothole causing traffic near the junction.',
    status: 'IN PROGRESS',
    location_text: 'Main St, Colombo',
    latitude: 6.9271,
    longitude: 79.8612,
    authority_name: 'Road Development Authority',
    created_at: '2023-10-01T10:00:00Z',
    image_url: '/uploads/img1.jpg,/uploads/img2.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Spy on Alert to simulate button presses later
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  // --- 1. RENDERING TESTS ---
  it('renders the initial loading state correctly', () => {
    // Return a Promise that never resolves to keep the loading state active
    global.fetch.mockReturnValue(new Promise(() => {}));

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    expect(getByText('Loading Details...')).toBeTruthy();
  });

  // --- 2. ERROR HANDLING TESTS ---
  it('shows an error state with a Go Back button if complaint fetch fails or returns null', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: false, data: null }),
    });

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => {
      expect(getByText('Complaint not found.')).toBeTruthy();
    });

    fireEvent.press(getByText('Go Back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  // --- 3. ASYNC/API DATA FETCHING TESTS ---
  it('fetches and renders all complaint details including WebView and Images', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaintData }),
    });

    const { getByText, getByTestId, getAllByTestId } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => {
      // Basic Text Details
      expect(getByText('Huge Pothole on Main St')).toBeTruthy();
      expect(getByText('There is a massive pothole causing traffic near the junction.')).toBeTruthy();
      expect(getByText('Main St, Colombo')).toBeTruthy();
      expect(getByText('#SL-12345')).toBeTruthy();
      expect(getByText('IN PROGRESS')).toBeTruthy();
      
      // Authority timeline
      expect(getByText('Road Development Authority')).toBeTruthy();
      expect(getByText('Work In Progress')).toBeTruthy();

      // Ensure WebView mapped correctly
      expect(getByTestId('mock-webview')).toBeTruthy();
    });
  });

  // --- 4. STATE/INTERACTION TESTS ---
  it('opens and closes the full-screen image modal', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaintData }),
    });

    const { getByText, getAllByTestId, getByTestId, queryByTestId } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => expect(getByText('Huge Pothole on Main St')).toBeTruthy());

    // 1. Find the expand icon (which bubbles up to TouchableOpacity)
    const expandIcons = getAllByTestId('icon-expand');
    expect(expandIcons.length).toBeGreaterThan(0);

    // 2. Press to open Modal
    fireEvent.press(expandIcons[0]);

    // 3. Verify Modal Close button is accessible (meaning modal is open)
    const closeBtn = getByTestId('icon-close-circle');
    expect(closeBtn).toBeTruthy();

    // 4. Press Close button
    fireEvent.press(closeBtn);
  });

  it('triggers the cancel complaint flow and makes a PATCH request', async () => {
    global.fetch
      .mockResolvedValueOnce({ // GET Details
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockComplaintData }),
      })
      .mockResolvedValueOnce({ // PATCH Cancel
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => expect(getByText('Cancel Complaint')).toBeTruthy());

    const cancelBtn = getByText('Cancel Complaint');
    fireEvent.press(cancelBtn);

    // Verify Alert was shown
    expect(Alert.alert).toHaveBeenCalledWith(
      'Cancel Complaint',
      'Are you sure you want to withdraw this complaint? This cannot be undone.',
      expect.any(Array)
    );

    // Simulate pressing "Yes, Cancel" in the Alert
    const confirmButton = Alert.alert.mock.calls[0][2].find(b => b.style === 'destructive');
    confirmButton.onPress();

    await waitFor(() => {
      // Verify PATCH request fired
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/complaints/update-status/${mockComplaintId}`),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ status: 'CANCELLED' })
        })
      );
      
      // Verify success alert and back navigation
      expect(Alert.alert).toHaveBeenCalledWith('Withdrawn', 'Your complaint has been cancelled.');
      expect(mockOnBack).toHaveBeenCalled();
    });
  });

});
