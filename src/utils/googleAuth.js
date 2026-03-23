/**
 * Google OAuth Configuration and Utilities
 * 
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project
 * 3. Enable "Google+ API"
 * 4. Create OAuth 2.0 credentials (Web application)
 * 5. Add authorized redirect URIs: http://localhost:5173, http://localhost:3000
 * 6. Copy the Client ID and update GOOGLE_CLIENT_ID below
 */

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const initGoogleAuth = () => {
  if (!GOOGLE_CLIENT_ID) {
    console.warn('Google Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in .env file');
    return false;
  }
  
  // Load Google Sign-In script if not already loaded
  if (!window.google) {
    return loadGoogleScript();
  }
  return true;
};

const loadGoogleScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Google Sign-In script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const parseGoogleToken = (credentialResponse) => {
  try {
    // Decode JWT token (without verification since we trust Google)
    const token = credentialResponse.credential;
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
      authMethod: 'google'
    };
  } catch (error) {
    console.error('Error parsing Google token:', error);
    return null;
  }
};
