import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AdminAnalytics from '../src/pages/AdminAnalytics';

// 1. MOCK CHART.JS (We don't need to test the third-party library itself)
vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-bar-chart" />
}));

// 2. MOCK CHILD COMPONENTS
vi.mock('../src/components/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../src/components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../src/components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

// 3. MOCK FETCH
global.fetch = vi.fn();

describe('AdminAnalytics Component', () => {

  const mockAnalyticsData = {
    kpis: {
      avgResolution: "3.0",
      completionRate: 85,
      active: 120
    },
    trends: [
      { month_name: "Jan", received: 100, resolved: 80 },
      { month_name: "Feb", received: 120, resolved: 90 }
    ],
    districts: [
      { district: "Colombo", count: 50 },
      { district: "Kandy", count: 30 }
    ],
    authorities: [
      { authority_name: "Water Board", total_handled: 200, resolved_count: 180, rate: 90 },
      { authority_name: "Road Dev", total_handled: 150, resolved_count: 60, rate: 40 }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // --- 1. RENDERING TESTS ---
  it('renders the initial loading state correctly', () => {
    global.fetch.mockReturnValue(new Promise(() => {})); // Never resolves
    
    render(<AdminAnalytics />);
    
    expect(screen.getByText('Statistical Insights')).toBeTruthy();
    expect(screen.getByText('Calculating national statistics...')).toBeTruthy();
  });

  // --- 2. ASYNC/API TESTS ---
  it('fetches and displays the analytics KPIs and data successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockAnalyticsData })
    });

    render(<AdminAnalytics />);

    await waitFor(() => {
      // Check KPI Cards
      expect(screen.getByText('3.0 Days')).toBeTruthy();
      expect(screen.getByText('85%')).toBeTruthy();
      expect(screen.getByText('120')).toBeTruthy(); // Active pending
      
      // Check if Mocked Chart is rendered
      expect(screen.getByTestId('mock-bar-chart')).toBeTruthy();

      // Check District Progress Bars
      expect(screen.getByText('Colombo')).toBeTruthy();
      expect(screen.getByText('50')).toBeTruthy();

      // Check Authority Performance Table
      expect(screen.getByText('Water Board')).toBeTruthy();
      expect(screen.getByText('200')).toBeTruthy(); // total handled
      expect(screen.getByText('90% Resolved')).toBeTruthy();
    });
  });

  // --- 3. ERROR HANDLING TESTS ---
  it('handles API failure gracefully by showing an error message', async () => {
    global.fetch.mockRejectedValue(new Error("Network Error"));

    render(<AdminAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load data.')).toBeTruthy();
    });
  });

  // --- 4. STATE/INTERACTION TESTS ---
  it('triggers the CSV Export logic when the Export button is clicked', async () => {
    // We don't mock document.createElement to avoid breaking React Testing Library.
    // Instead, we spy on the real HTMLAnchorElement methods.
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const removeSpy = vi.spyOn(HTMLAnchorElement.prototype, 'remove').mockImplementation(() => {});
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    
    // We can also spy on setAttribute to verify the correct attributes were set
    const setAttributeSpy = vi.spyOn(HTMLAnchorElement.prototype, 'setAttribute');

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockAnalyticsData })
    });

    render(<AdminAnalytics />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('3.0 Days')).toBeTruthy();
    });

    // Click Export
    const exportBtn = screen.getByRole('button', { name: /Export CSV/i });
    fireEvent.click(exportBtn);

    // Verify CSV logic was executed
    expect(setAttributeSpy).toHaveBeenCalledWith('download', 'UrbanSync_Authority_Performance.csv');
    // Ensure the data passed into href includes our mocked authority name
    expect(setAttributeSpy).toHaveBeenCalledWith(
      'href', 
      expect.stringContaining('Water%20Board')
    );
    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    // Clean up our spies
    clickSpy.mockRestore();
    removeSpy.mockRestore();
    appendChildSpy.mockRestore();
    setAttributeSpy.mockRestore();
  });

});
