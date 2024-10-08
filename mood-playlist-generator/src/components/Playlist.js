import React, { useState } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [mood, setMood] = useState(''); // Initially, no mood selected
  const [songs, setSongs] = useState([]); // Store fetched songs
  const [error, setError] = useState(null); // For handling errors
  const [loading, setLoading] = useState(false); // To show loading state

  const fetchPlaylist = async () => {
    if (!mood) return; // Don't fetch if no mood is selected

    setLoading(true); // Set loading state to true
    setError(null); // Reset any previous errors

    try {
      const response = await axios.get(`http://localhost:5000/api/playlist/${mood}`);
      console.log('API Response:', response.data); // Log the response data
      setSongs(response.data); // Set the fetched songs
    } catch (error) {
      console.error('Error fetching playlist:', error.message);
      setError('Could not fetch playlists. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>Get Your Playlist</h1>
      <select onChange={(e) => setMood(e.target.value)} value={mood}>
        <option value="">Select a mood...</option> {/* Default option to prompt user */}
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="energetic">Energetic</option>
        <option value="relaxed">Relaxed</option>
      </select>
      <button onClick={fetchPlaylist} disabled={!mood}>Get Playlist</button> {/* Disable if no mood is selected */}

      {loading && <p>Loading...</p>} {/* Loading Indicator */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error Message */}

      <h2>Songs:</h2>
      {mood === '' ? ( // Check if mood is empty
        <p>Please select a mood to see the playlist.</p> // Prompt user
      ) : songs.length > 0 ? (
        <ul>
          {songs.map((song) => (
            <li key={song.url}>
              <a href={song.url} target="_blank" rel="noopener noreferrer">{song.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists found for this mood.</p> // Fallback for when there are no songs
      )}
    </div>
  );
};

export default Playlist;
