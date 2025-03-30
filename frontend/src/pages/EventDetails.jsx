import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { eventId } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Event Details</h1>
      <p>Event ID: {eventId}</p>
      <div>
        <h2>Event Information</h2>
        <p>This is a placeholder for event details. Add your event information here.</p>
      </div>
    </div>
  );
}

export default EventDetails;
