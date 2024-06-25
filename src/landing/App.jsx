import React from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you are using React Router

const LandingPage = () => {
  const history = useHistory();

  const handleGetStartedClick = () => {
    // Redirect to the main page
    history.push('/main');
  };

  return (
    <div style={landingPageStyle}>
      <Logo />
      <div style={contentContainerStyle}>
        <h1 style={headerStyle}>Your App Name</h1>
        <p style={descriptionStyle}>Generate beautiful images with ease.</p>
        <button style={getStartedButtonStyle} onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const landingPageStyle = {
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentContainerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const headerStyle = {
  fontSize: '2rem',
  margin: '10px 0',
};

const descriptionStyle = {
  fontSize: '1rem',
  margin: '10px 0',
};

const getStartedButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#ffffff',
  padding: '10px 20px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default LandingPage;
