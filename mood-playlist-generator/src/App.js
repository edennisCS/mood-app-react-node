import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [mood, setMood] = useState(''); // Mood state
    const [playlists, setPlaylists] = useState([]); // Playlists for selected mood
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch playlists whenever the mood changes
    useEffect(() => {
        const fetchPlaylists = async () => {
            if (!mood) return; // Don't fetch if no mood is selected

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:5000/api/playlist/${mood}`);
                console.log('API Response:', response.data);
                setPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
                setError('Could not fetch playlists. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [mood]); // Dependency array includes mood, so it runs on mood change

    return (
        <div className="App">
            <h1>Mood-Based Playlist Generator</h1>
            
            {/* Mood Selection Buttons */}
            <div>
                <h2>Select Your Mood</h2>
                <button className="button" onClick={() => setMood('happy')}>Happy</button>
                <button className="button" onClick={() => setMood('sad')}>Sad</button>
                <button className="button" onClick={() => setMood('energetic')}>Energetic</button>
                <button className="button" onClick={() => setMood('relaxed')}>Relaxed</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Playlists for {mood || '...'}</h2>
                {loading ? (
                    // Don't show "No playlists found" while loading
                    <p>Loading playlists...</p>
                ) : playlists.length > 0 ? (
                    <ul>
                        {playlists.map((playlist, index) => (
                            <li key={index}>
                                <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                                    {playlist.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    mood ? <p>No playlists found for this mood.</p> : <p>Please select a mood.</p>
                )}
            </div>
        </div>
    );
}

export default App;
