import React, { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { getEvents } from '../services/api';

const EventDisplay: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found. Create your first event!</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="event-details">
                <span>Date: {new Date(event.date).toLocaleDateString()}</span>
                <span>Location: {event.location}</span>
                <span>Participants: {event.participants.length}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDisplay; 