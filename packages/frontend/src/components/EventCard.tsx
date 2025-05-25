import React from 'react';
import { Event } from '@eventix/shared';

interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="event-card"
      onClick={() => onClick?.(event)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        backgroundColor: '#f9f9f9',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#f9f9f9';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{event.title}</h3>
      {event.description && (
        <p style={{ margin: '4px 0', color: '#666' }}>{event.description}</p>
      )}
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>When:</strong> {formatDate(event.datetime)}
      </p>
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>Where:</strong> {event.location}
      </p>
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>Meal Type:</strong> {event.mealType}
      </p>
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>Expected Guests:</strong> {event.expectedCount}
      </p>
      <p style={{ margin: '4px 0', fontSize: '12px', color: '#999' }}>
        ID: {event.id}
      </p>
    </div>
  );
};

export default EventCard; 