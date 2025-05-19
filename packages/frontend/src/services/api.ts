import axios from 'axios';
import { Event, Participant } from '../types/event';

// Get the API URL from environment variables, default to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Events API
export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<Event[]>('/api/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event> => {
  try {
    const response = await api.get<Event>(`/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  try {
    const response = await api.post<Event>('/api/events', event);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  try {
    const response = await api.put<Event>(`/api/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/events/${id}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Participants API
export const getEventParticipants = async (eventId: string): Promise<Participant[]> => {
  try {
    const response = await api.get<Participant[]>(`/api/events/${eventId}/participants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

export const addParticipant = async (eventId: string, participant: Omit<Participant, 'id'>): Promise<Participant> => {
  try {
    const response = await api.post<Participant>(`/api/events/${eventId}/participants`, participant);
    return response.data;
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

export const removeParticipant = async (eventId: string, participantId: string): Promise<void> => {
  try {
    await api.delete(`/api/events/${eventId}/participants/${participantId}`);
  } catch (error) {
    console.error('Error removing participant:', error);
    throw error;
  }
};