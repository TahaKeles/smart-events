import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching event details');
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleRSVP = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/rsvp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRsvpStatus(res.data.message);
      // Refresh event data to update attendees
      const updatedEvent = await axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvent(updatedEvent.data);
    } catch (err) {
      setRsvpStatus(err.response?.data?.message || 'Error processing RSVP');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="event-details-container">
      <div className="event-content">
        <div className="event-image-container">
          <img 
            src={event.image} 
            alt={event.title} 
            className="event-image"
          />
        </div>

        <div className="event-info">
          <h1 className="event-title">{event.title}</h1>
          
          <div className="event-meta">
            <span className="event-category">{event.category}</span>
            <span className="event-attendees">
              {event.attendees.length}/{event.capacity} attendees
            </span>
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-details">
            <div className="detail-item">
              <span className="detail-label">Date & Time</span>
              <span className="detail-value">
                {format(new Date(event.dateTime), 'EEEE, MMMM d, yyyy h:mm a')}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Venue</span>
              <span className="detail-value">{event.venue}</span>
            </div>
          </div>

          {/* <button
            className={`rsvp-button ${event.attendees.length >= event.capacity ? 'disabled' : ''}`}
            onClick={handleRSVP}
            disabled={event.attendees.length >= event.capacity}
          >
            {event.attendees.length >= event.capacity ? 'Event Full' : 'RSVP Now'}
          </button> */}

          {/* {rsvpStatus && (
            <div className="rsvp-status">
              {rsvpStatus}
            </div>
          )} */}
        </div>
      </div>

      <style jsx>{`
        .event-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .event-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .event-content {
            grid-template-columns: 1fr;
          }
        }

        .event-image-container {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .event-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .event-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .event-title {
          font-size: 2rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .event-meta {
          display: flex;
          gap: 1rem;
        }

        .event-category {
          background: #f0f0f0;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #666;
        }

        .event-attendees {
          background: #e8f5e9;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #2e7d32;
        }

        .event-description {
          line-height: 1.6;
          color: #555;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.9rem;
          color: #666;
        }

        .detail-value {
          font-size: 1.1rem;
          color: #333;
        }

        .rsvp-button {
          padding: 1rem;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .rsvp-button:hover:not(.disabled) {
          background: #1976d2;
        }

        .rsvp-button.disabled {
          background: #bdbdbd;
          cursor: not-allowed;
        }

        .rsvp-status {
          padding: 1rem;
          background: #e3f2fd;
          border-radius: 8px;
          color: #1976d2;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #2196f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          padding: 2rem;
        }

        .error-message {
          color: #d32f2f;
          padding: 1rem;
          background: #ffebee;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default EventDetails;
