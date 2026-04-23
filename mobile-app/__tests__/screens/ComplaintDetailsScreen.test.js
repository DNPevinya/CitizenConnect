import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ComplaintDetailsScreen from '../../src/screens/ComplaintDetailsScreen';


// Fake Dependencies (Mocks)
// We replace complex native libraries with simple views 
// so the test runner doesn't crash trying to render them.

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Trick: Give every icon a testID based on its name so we can find it later
  return {
    Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} />,
    MaterialCommunityIcons: (props) => <View testID={`icon-${props.name}`} {...props} />,
  };
});

// WebViews crash Node.js test environments, so we fake it out entirely
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: (props) => <View testID="mock-webview" {...props} />,
  };
});

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

// Intercept all API calls so we don't hit the real backend
global.fetch = jest.fn();

describe('ComplaintDetailsScreen', () => {
  const mockOnBack = jest.fn();
  const mockComplaintId = '12345';

  // Dummy data to feed into the screen when it tries to fetch details
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
    jest.clearAllMocks(); // Start fresh for every test
    // We spy on Alert so we can programmatically "click" its buttons during tests
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('shows a loading spinner before the API responds', () => {
    // Force the fetch to hang forever so we can inspect the loading state
    global.fetch.mockReturnValue(new Promise(() => {}));

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    expect(getByText('Loading Details...')).toBeTruthy();
  });

  it('shows an error screen with a back button if the complaint is deleted or fails to load', async () => {
    // Pretend the server returned an empty result
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: false, data: null }),
    });

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    // Wait for the UI to show the error message
    await waitFor(() => {
      expect(getByText('Complaint not found.')).toBeTruthy();
    });

    // Make sure the fallback back button actually works
    fireEvent.press(getByText('Go Back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('loads the complaint data and renders the text, images, and map correctly', async () => {
    // Feed it our dummy data
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaintData }),
    });

    const { getByText, getByTestId } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => {
      // Check if all the crucial text blocks rendered
      expect(getByText('Huge Pothole on Main St')).toBeTruthy();
      expect(getByText('There is a massive pothole causing traffic near the junction.')).toBeTruthy();
      expect(getByText('Main St, Colombo')).toBeTruthy();
      expect(getByText('#SL-12345')).toBeTruthy();
      expect(getByText('IN PROGRESS')).toBeTruthy();
      
      // Verify the dynamic timeline states
      expect(getByText('Road Development Authority')).toBeTruthy();
      expect(getByText('Work In Progress')).toBeTruthy();

      // Ensure the map (WebView) didn't crash and is present
      expect(getByTestId('mock-webview')).toBeTruthy();
    });
  });

  it('allows the user to tap an image to view it full-screen', async () => {
    // Feed it data so the images render
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockComplaintData }),
    });

    const { getByText, getAllByTestId, getByTestId } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    await waitFor(() => expect(getByText('Huge Pothole on Main St')).toBeTruthy());

    // Find the expand icon over the images
    const expandIcons = getAllByTestId('icon-expand');
    expect(expandIcons.length).toBeGreaterThan(0);

    // Tap the first one to open the modal
    fireEvent.press(expandIcons[0]);

    // If the close button exists, it proves the modal successfully opened
    const closeBtn = getByTestId('icon-close-circle');
    expect(closeBtn).toBeTruthy();

    // Close it back up
    fireEvent.press(closeBtn);
  });

  it('handles the complex "Cancel Complaint" flow and hits the PATCH endpoint', async () => {
    // This test requires TWO API mocks: one for the initial load, one for the cancellation
    global.fetch
      .mockResolvedValueOnce({ // 1. Initial Load
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockComplaintData }),
      })
      .mockResolvedValueOnce({ // 2. The Cancel Request
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

    const { getByText } = render(
      <ComplaintDetailsScreen onBack={mockOnBack} complaintId={mockComplaintId} />
    );

    // Wait for the button to appear
    await waitFor(() => expect(getByText('Cancel Complaint')).toBeTruthy());

    // Tap it
    const cancelBtn = getByText('Cancel Complaint');
    fireEvent.press(cancelBtn);

    // Check that the confirmation popup appeared
    expect(Alert.alert).toHaveBeenCalledWith(
      'Cancel Complaint',
      'Are you sure you want to withdraw this complaint? This cannot be undone.',
      expect.any(Array)
    );

    // Dig into the Alert mock and artificially click the "destructive" (Yes, Cancel) button
    const confirmButton = Alert.alert.mock.calls[0][2].find(b => b.style === 'destructive');
    confirmButton.onPress();

    // Verify the aftermath
    await waitFor(() => {
      // Did it actually tell the backend to cancel?
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/complaints/update-status/${mockComplaintId}`),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ status: 'CANCELLED' })
        })
      );
      
      // Did it show a success message and kick the user back to the list?
      expect(Alert.alert).toHaveBeenCalledWith('Withdrawn', 'Your complaint has been cancelled.');
      expect(mockOnBack).toHaveBeenCalled();
    });
  });
});