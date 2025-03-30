import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    gender: '',
    location: {
      coordinates: [0, 0]
    },
    interests: []
  });
  const [newInterest, setNewInterest] = useState('');

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log(response);

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile({
          ...data,
          age: data.age || '',
          gender: data.gender || '',
          interests: data.interests || []
        });
      } catch (error) {
        setMessage({ text: error.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new interest to the list
  const handleAddInterest = () => {
    if (newInterest.trim() !== '' && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  // Remove interest from the list
  const handleRemoveInterest = (interestToRemove) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfile(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: [position.coords.longitude, position.coords.latitude]
            }
          }));
          setMessage({ text: 'Location updated successfully', type: 'success' });
        },
        (error) => {
          setMessage({ text: 'Error getting location: ' + error.message, type: 'error' });
        }
      );
    } else {
      setMessage({ text: 'Geolocation is not supported by this browser', type: 'error' });
    }
  };

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Extract only the preference fields we want to update
      const preferences = {
        age: profile.age,
        gender: profile.gender,
        location: profile.location,
        interests: profile.interests
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update preferences');
      }

      setMessage({ text: 'Preferences updated successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem' }}>
        Profile Settings
      </h1>
      
      {message.text && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '4px',
          backgroundColor: message.type === 'error' ? '#fee2e2' : '#ecfdf5',
          color: message.type === 'error' ? '#dc2626' : '#059669'
        }}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={profile.username}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: '#f9fafb'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: '#f9fafb'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
              Age
            </label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
              Gender
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
            Location
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                Current coordinates: {profile.location.coordinates[0].toFixed(6)}, {profile.location.coordinates[1].toFixed(6)}
              </p>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                color: '#111827',
                cursor: 'pointer'
              }}
            >
              Get Current Location
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
            Interests
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add a new interest"
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddInterest}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#1a1a1a',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {profile.interests.map((interest, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f3f4f6',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem'
                }}
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={saveLoading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: saveLoading ? 'default' : 'pointer',
              opacity: saveLoading ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {saveLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
