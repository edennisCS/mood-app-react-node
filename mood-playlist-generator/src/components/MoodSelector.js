// src/components/MoodSelector.js
import React from 'react';

const moods = ['happy', 'sad', 'energetic', 'relaxed']; // Ensure these match the API

const MoodSelector = ({ onMoodSelect, setShowMoodSelector }) => {
    return (
        <div className="center">
            <h2>Select Your Mood</h2>
            <div>
                {moods.map((mood) => (
                    <button key={mood} onClick={() => {
                        onMoodSelect(mood);
                        setShowMoodSelector(false); // Close the selector after selecting
                    }}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)} {/* Capitalize mood for display */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;
