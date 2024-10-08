// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Function to get Spotify token
const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID; // Access Client ID from environment variables
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Access Client Secret from environment variables

  try {
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      data: 'grant_type=client_credentials',
    });

    return tokenResponse.data.access_token; // Return the access token
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    throw new Error('Could not retrieve Spotify token');
  }
};

// API endpoint to get songs based on mood
app.get('/api/playlist/:mood', async (req, res) => {
  const mood = req.params.mood;

  try {
    const SPOTIFY_TOKEN = await getSpotifyToken(); // Fetch the access token

    // Fetch songs based on mood
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
      params: {
        q: mood,
        type: 'track', // Change to 'playlist' for playlist instead
        limit: 5,
      },
    });

    const songs = response.data.tracks.items.map((track) => ({
      title: track.name,
      url: track.external_urls.spotify,
    }));

    res.json(songs); // Send the song data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching playlist');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
