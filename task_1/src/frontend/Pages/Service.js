import React, { useState } from 'react';
import './Service.css';

const Service = () => {
  const [option, setOption] = useState('');
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');
  const [funFact, setFunFact] = useState('');
  const [emojis, setEmojis] = useState([]); // State to hold emojis

  const calculateAge = () => {
    const now = new Date();
    let output = '';

    if (option === 'date-month-year') {
      const birthDate = new Date(date);
      const diff = now - birthDate;
      const ageDate = new Date(diff);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;
      output = `${years} years, ${months} months, ${days} days`;
    } else if (option === 'year-only') {
      const age = now.getFullYear() - parseInt(year);
      output = `${age} years`;
    } else if (option === 'date-month-year-time') {
      const [datePart, timePart] = date.split('T');
      const birthDate = new Date(`${datePart}T${time}`);
      const diff = now - birthDate;
      const ageDate = new Date(diff);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;
      const hours = ageDate.getUTCHours();
      const minutes = ageDate.getUTCMinutes();
      output = `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes`;
    }

    setResult(output);
    generateFunFact(output);

    // Show multiple emojis at random positions within the service container
    showRandomEmojis();
  };

  const generateFunFact = (ageDescription) => {
    const funFacts = [
      "Did you know? A year on Venus is shorter than a day on Venus!",
      "Age is merely the number of laps you've taken around the sun!",
      "In your lifetime, your heart will beat over 2.5 billion times!",
      "Every seven years, your body replaces every cell! You're literally a new person!",
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFunFact(`${randomFact} Also, your calculated age: ${ageDescription}`);
  };

  const showRandomEmojis = () => {
    const numberOfEmojis = 8; // Number of emojis to show
    const emojiArray = [];

    for (let i = 0; i < numberOfEmojis; i++) {
      const randomX = Math.random() * 90; // Random x position as percentage
      const randomY = Math.random() * 80; // Random y position as percentage
      emojiArray.push({
        id: i,
        x: randomX,
        y: randomY,
      });
    }

    setEmojis(emojiArray);

    // Hide emojis after 3 seconds
    setTimeout(() => setEmojis([]), 3000);
  };

  return (
    <div id='services'>
    <div className="service-container" >
      <h1 className="title">Age Calculator</h1>
      <p className="subtitle">Select an option:</p>

      <div className="options">
        <label className="option-label">
          <input
            type="radio"
            value="date-month-year"
            checked={option === 'date-month-year'}
            onChange={() => setOption('date-month-year')}
          />
          Enter your date, month, and year of birth
        </label>

        <label className="option-label">
          <input
            type="radio"
            value="year-only"
            checked={option === 'year-only'}
            onChange={() => setOption('year-only')}
          />
          Enter just your year of birth
        </label>

        <label className="option-label">
          <input
            type="radio"
            value="date-month-year-time"
            checked={option === 'date-month-year-time'}
            onChange={() => setOption('date-month-year-time')}
          />
          Enter your date, month, and year of birth with time
        </label>
      </div>

      <div className="inputs">
        {option === 'date-month-year' && (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        )}
        {option === 'year-only' && (
          <input
            type="number"
            placeholder="Enter your year of birth"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input-field"
          />
        )}
        {option === 'date-month-year-time' && (
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-field"
            />
          </div>
        )}
      </div>

      <button onClick={calculateAge} className="calculate-button">
        Calculate
      </button>
      

      {result && (
        <div className="result-section">
          <hr></hr>
          <h2>Your Age:</h2>
          <p>{result}</p>
          <h3>Fun Fact:</h3>
          <p>{funFact}</p>
        </div>
      )}

      {/* Render emojis at random positions within the service container */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="emoji-popup"
          style={{
            left: `${emoji.x}%`, // Set the x position as a percentage
            top: `${emoji.y}%`,   // Set the y position as a percentage
          }}
        >
          <span role="img" aria-label="emoji">🎉</span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Service;
