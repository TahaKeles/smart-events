import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // all events
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navigateToEventDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        marginBottom: '2rem',
        color: '#1a1a1a',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '0.75rem'
      }}>
        Upcoming Events
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {events.map((event) => (
          <div 
            key={event._id} 
            style={{ 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
            onClick={() => navigateToEventDetails(event._id)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ 
              height: '180px', 
              backgroundImage: `url(${event.image || 'https://via.placeholder.com/800x400?text=No+Image'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                color: 'white',
                fontWeight: '500'
              }}>
                <div style={{ fontSize: '0.8rem', opacity: '0.9' }}>
                  {formatDate(event.date || event.dateTime)}
                </div>
              </div>
              {event.category && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {event.category}
                </div>
              )}
            </div>
            
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#1a1a1a',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {event.title}
              </h3>
              
              <p style={{ 
                color: '#4b5563', 
                marginBottom: '1rem',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.5',
                height: '3em'
              }}>
                {event.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.25rem' }}>📍</span>
                  <span style={{ 
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {event.venue || 'New York, NY'}
                  </span>
                </div>
                
                <div>
                  {event.price > 0 ? 
                    <span style={{ fontWeight: '500', color: '#1a1a1a' }}>${event.price.toFixed(2)}</span> : 
                    <span style={{ color: '#059669', fontWeight: '500' }}>Free</span>
                  }
                </div>
              </div>
              
              {event.maxAttendees && (
                <div style={{ 
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <div style={{ 
                    backgroundColor: '#f3f4f6', 
                    borderRadius: '999px',
                    overflow: 'hidden',
                    height: '6px'
                  }}>
                    <div style={{ 
                      width: `${Math.min(100, (event.attendees?.length / event.maxAttendees) * 100)}%`,
                      backgroundColor: (event.attendees?.length / event.maxAttendees) > 0.8 ? '#ef4444' : '#10b981',
                      height: '100%'
                    }} />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '0.25rem' 
                  }}>
                    <span>{event.attendees?.length || 0} attending</span>
                    <span>{event.maxAttendees - (event.attendees?.length || 0)} spots left</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          color: '#4b5563',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          marginTop: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '4rem auto',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
          </div>
          
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            No Events Yet
          </h3>
          
          <p style={{ 
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            maxWidth: '400px',
            margin: '0 auto 1.5rem'
          }}>
            We're working on bringing exciting events to your area. 
            Make sure your location is set in your profile to discover nearby events.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem'
          }}>
            <button
              onClick={() => navigate('/profile')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f3f4f6',
                color: '#4b5563',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Update Profile
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Refresh Events
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;