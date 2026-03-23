import { createContext, useState, useEffect } from 'react';
import { INIT_OWNERS } from '../data/seed';
import { defaultSettings } from '../data/seed';
import { parseGoogleToken } from '../utils/googleAuth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [owner, setOwnerState] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [authMethod, setAuthMethod] = useState('pin'); // 'pin' or 'email'
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState([]);
  const [allClientsData, setAllClientsData] = useState({});
  const [allSettingsData, setAllSettingsData] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const savedOwners = localStorage.getItem('subtrack_owners');
    const savedCurrentOwner = localStorage.getItem('subtrack_currentOwner');
    const savedAuthMethod = localStorage.getItem('subtrack_authMethod');
    const savedClientsData = localStorage.getItem('subtrack_clients');
    const savedSettingsData = localStorage.getItem('subtrack_settings');
    
    let parsedOwners = INIT_OWNERS;
    if (savedOwners) {
      try {
        parsedOwners = JSON.parse(savedOwners);
      } catch (e) {
        console.error('Error loading owners:', e);
      }
    }
    setOwners(parsedOwners);

    // Initialize clients and settings
    let clients = {};
    let settings = {};
    
    if (savedClientsData) {
      try {
        clients = JSON.parse(savedClientsData);
      } catch (e) {
        console.error('Error loading clients:', e);
      }
    }
    
    if (savedSettingsData) {
      try {
        settings = JSON.parse(savedSettingsData);
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }

    // Ensure all owners have entries
    parsedOwners.forEach(owner => {
      if (!clients[owner.id]) {
        clients[owner.id] = [];
      }
      if (!settings[owner.id]) {
        settings[owner.id] = defaultSettings(owner.businessType || 'other');
      }
    });

    setAllClientsData(clients);
    setAllSettingsData(settings);

    // Restore current owner if exists
    if (savedCurrentOwner) {
      try {
        const currentOwner = JSON.parse(savedCurrentOwner);
        setOwnerState(currentOwner);
      } catch (e) {
        console.error('Error restoring session:', e);
      }
    }

    if (savedAuthMethod) {
      setAuthMethod(savedAuthMethod);
    }

    setLoading(false);
  }, []);

  // Persist owners whenever they change
  useEffect(() => {
    if (owners.length > 0) {
      localStorage.setItem('subtrack_owners', JSON.stringify(owners));
    }
  }, [owners]);

  // Persist current owner whenever it changes
  useEffect(() => {
    if (owner) {
      localStorage.setItem('subtrack_currentOwner', JSON.stringify(owner));
    } else {
      localStorage.removeItem('subtrack_currentOwner');
    }
  }, [owner]);

  // Persist clients data
  useEffect(() => {
    if (Object.keys(allClientsData).length > 0) {
      localStorage.setItem('subtrack_clients', JSON.stringify(allClientsData));
    }
  }, [allClientsData]);

  // Persist settings data
  useEffect(() => {
    if (Object.keys(allSettingsData).length > 0) {
      localStorage.setItem('subtrack_settings', JSON.stringify(allSettingsData));
    }
  }, [allSettingsData]);

  // Persist auth method
  useEffect(() => {
    localStorage.setItem('subtrack_authMethod', authMethod);
  }, [authMethod]);

  const setOwner = (newOwner) => {
    setOwnerState(newOwner);
    if (rememberMe && newOwner) {
      localStorage.setItem('subtrack_rememberMe', 'true');
    }
  };

  const logout = () => {
    setOwnerState(null);
    localStorage.removeItem('subtrack_currentOwner');
    localStorage.removeItem('subtrack_rememberMe');
  };

  const addOwner = (newOwnerData) => {
    const newOwner = {
      id: newOwnerData.id || Math.random().toString(36).substr(2, 9),
      ...newOwnerData
    };
    
    setOwners(prev => [...prev, newOwner]);
    
    // Initialize empty clients and settings for new owner
    setAllClientsData(prev => ({
      ...prev,
      [newOwner.id]: []
    }));
    
    setAllSettingsData(prev => ({
      ...prev,
      [newOwner.id]: defaultSettings(newOwner.businessType || 'other')
    }));
    
    return newOwner;
  };

  const handleGoogleSignIn = (googleData) => {
    const userData = parseGoogleToken(googleData);
    if (!userData) return null;

    // Check if user already exists with this email
    let existingOwner = owners.find(o => o.email && o.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existingOwner) {
      // Login with existing Google account
      setRememberMe(true);
      setOwner(existingOwner);
      return existingOwner;
    } else {
      // Auto-register with Google
      const newOwner = {
        id: userData.id,
        ownerName: userData.name,
        businessName: userData.name + "'s Business",
        businessType: 'other',
        email: userData.email,
        picture: userData.picture,
        authMethod: 'google'
      };
      
      addOwner(newOwner);
      setRememberMe(true);
      setOwner(newOwner);
      return newOwner;
    }
  };

  const updateOwner = (updatedOwner) => {
    setOwners(prev => prev.map(o => o.id === updatedOwner.id ? updatedOwner : o));
    if (owner?.id === updatedOwner.id) {
      setOwner(updatedOwner);
    }
  };

  const getClientData = () => allClientsData[owner?.id] || [];
  const setClientData = (data) => {
    setAllClientsData(prev => ({
      ...prev,
      [owner.id]: data
    }));
  };

  const getSettingsData = () => allSettingsData[owner?.id] || defaultSettings(owner?.businessType || 'other');
  const setSettingsData = (data) => {
    setAllSettingsData(prev => ({
      ...prev,
      [owner.id]: data
    }));
  };

  const value = {
    owner,
    setOwner,
    logout,
    owners,
    addOwner,
    updateOwner,
    handleGoogleSignIn,
    rememberMe,
    setRememberMe,
    authMethod,
    setAuthMethod,
    loading,
    // Client and settings management
    allClientsData,
    setAllClientsData,
    allSettingsData,
    setAllSettingsData,
    getClientData,
    setClientData,
    getSettingsData,
    setSettingsData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
