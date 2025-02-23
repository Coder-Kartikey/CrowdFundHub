import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { mockCampaigns } from '../utils/mockData';
import { BrowserRouter } from 'react-router-dom';

// Mock the localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Home Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('renders loading indicator initially', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders campaign cards after loading', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCampaigns));

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('article').length).toBe(mockCampaigns.length);
    });
  });

  it('stores mock campaigns in local storage if local storage is empty', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('campaigns', JSON.stringify(mockCampaigns));
    });
  });

  it('retrieves campaigns from local storage', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCampaigns));

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith('campaigns');
    });
  });
});