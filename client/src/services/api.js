// filepath: client/src/services/api.js
const API_BASE_URL = 'http://localhost:4000/api'; // Or your deployed backend URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = `HTTP error! Status: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

export const getCampaigns = async () => {
  const response = await fetch(`${API_BASE_URL}/campaign`);
  return handleResponse(response);
};

export const getCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}/campaign/${id}`);
  return handleResponse(response);
};

export const createCampaign = async (campaignData, token) => {
  const response = await fetch(`${API_BASE_URL}/campaign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include token if authentication is required
    },
    body: JSON.stringify(campaignData),
  });
  return handleResponse(response);
};

export const updateCampaign = async (id, campaignData, token) => {
    const response = await fetch(`${API_BASE_URL}/campaign/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token if authentication is required
      },
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response);
  };

export const deleteCampaign = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/campaign/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, // Include token if authentication is required
    },
  });
  return handleResponse(response);
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// Add similar functions for other API endpoints (donate, donation, query, etc.)