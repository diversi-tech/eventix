import axios from 'axios';
import { StoreItem } from '../types';

// Get the API URL from environment variables, default to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch a store item by ID
export const getItemById = async (id: number): Promise<StoreItem> => {
  try {
    const response = await api.get<StoreItem>(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};