import { useState, useEffect } from 'react';
import { Inp, Btn } from '../components/ui/Atoms';
import useAuth from '../context/useAuth';

export default function LoginPage({ onRegister }) {
  const { setOwner, owners, setRememberMe, authMethod, setAuthMethod, rememberMe, handleGoogleSignIn } = useAuth();
  const [pinForm, setPinForm] = useState({ businessName: '', pin: '' });
  const [emailForm, setEmailForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    loadGoogleButton();
  }, []);

  const loadGoogleButton = () => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        setGoogleLoaded(true);
        renderGoogleButton();
      }
    };
    document.head.appendChild(script);
  };

  const renderGoogleButton = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId.trim() === '') {
      console.log('Google Client ID not configured. To enable Google Sign-In, add VITE_GOOGLE_CLIENT_ID to .env file');
      return;
    }
    
    if (window.google && document.getElementById('google_signin_button')) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google_signin_button'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  };

  const handleGoogleCallback = (response) => {
    setError('');
    setLoading(true);
    
    try {
      const owner = handleGoogleSignIn(response);
      if (owner) {
        setError('');
      } else {
        setError('Failed to sign in with Google');
      }
    } catch (err) {
      setError('Google sign-in failed: ' + err.message);
    }
    setLoading(false);
  };

  const handlePinLogin = () => {
    setError('');
    setLoading(true);
    
    if (!pinForm.businessName.trim() || !pinForm.pin.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const owner = owners.find(o => 
      o.businessName.toLowerCase() === pinForm.businessName.toLowerCase() && 
      o.pin === pinForm.pin
    );
    
    if (!owner) {
      setError('Invalid business name or PIN');
      setLoading(false);
      return;
    }

    setRememberMe(rememberMe);
    setOwner(owner);
    setPinForm({ businessName: '', pin: '' });
    setLoading(false);
  };

  const handleEmailLogin = () => {
    setError('');
    setLoading(true);
    
    if (!emailForm.email.trim() || !emailForm.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const owner = owners.find(o => 
      o.email && o.email.toLowerCase() === emailForm.email.toLowerCase() && 
      o.password === emailForm.password
    );
    
    if (!owner) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    setRememberMe(rememberMe);
    setOwner(owner);
    setEmailForm({ email: '', password: '' });
    setLoading(false);
  };

  const handleLogin = authMethod === 'pin' ? handlePinLogin : handleEmailLogin;

  return (
    <div style={{ padding: '64px 24px 32px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg,#10b981,#059669)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, margin: '0 auto 16px' }}>🔔</div>
        <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 800, margin: '0 0 6px' }}>SubTrack</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>Smart subscription and payment tracker</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '24px 20px', marginBottom: 16 }}>
        
        {/* Auth Method Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,.06)', padding: 4, borderRadius: 8 }}>
          <button
            onClick={() => setAuthMethod('pin')}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: 6,
              background: authMethod === 'pin' ? 'rgba(16,185,129,.2)' : 'transparent',
              color: authMethod === 'pin' ? '#10b981' : '#64748b',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            PIN
          </button>
          <button
            onClick={() => setAuthMethod('email')}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: 6,
              background: authMethod === 'email' ? 'rgba(16,185,129,.2)' : 'transparent',
              color: authMethod === 'email' ? '#10b981' : '#64748b',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            Email
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,.1)',
            border: '1px solid rgba(239,68,68,.3)',
            color: '#fca5a5',
            padding: '10px 12px',
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 16
          }}>
            {error}
          </div>
        )}

        {/* PIN Authentication */}
        {authMethod === 'pin' && (
          <>
            <Inp 
              label="Business Name" 
              placeholder="e.g. PowerFit Gym" 
              value={pinForm.businessName} 
              onChange={e => setPinForm({ ...pinForm, businessName: e.target.value })}
              disabled={loading}
            />
            <Inp 
              label="PIN" 
              type="password" 
              placeholder="Your PIN" 
              value={pinForm.pin} 
              onChange={e => setPinForm({ ...pinForm, pin: e.target.value })}
              disabled={loading}
            />
            <p style={{ color: '#64748b', fontSize: 12, textAlign: 'center', margin: '12px 0' }}>
              Demo: <b style={{ color: '#94a3b8' }}>PowerFit Gym</b> / PIN: <b style={{ color: '#94a3b8' }}>1234</b>
            </p>
          </>
        )}

        {/* Email Authentication */}
        {authMethod === 'email' && (
          <>
            <Inp 
              label="Email" 
              type="email"
              placeholder="your@email.com" 
              value={emailForm.email} 
              onChange={e => setEmailForm({ ...emailForm, email: e.target.value })}
              disabled={loading}
            />
            <Inp 
              label="Password" 
              type="password" 
              placeholder="Your password" 
              value={emailForm.password} 
              onChange={e => setEmailForm({ ...emailForm, password: e.target.value })}
              disabled={loading}
            />
            <p style={{ color: '#64748b', fontSize: 12, textAlign: 'center', margin: '12px 0' }}>
              Demo: <b style={{ color: '#94a3b8' }}>demo@example.com</b> / Pass: <b style={{ color: '#94a3b8' }}>Demo@123</b>
            </p>
          </>
        )}

        {/* Remember Me Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer', color: '#cbd5e1' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            disabled={loading}
            style={{ cursor: 'pointer', width: 16, height: 16 }}
          />
          <span style={{ fontSize: 13 }}>Remember me on this device</span>
        </label>

        <Btn onClick={handleLogin} disabled={loading} style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Login →'}
        </Btn>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={{ color: '#64748b', fontSize: 14 }}>New owner? </span>
        <button 
          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }} 
          onClick={onRegister}
          disabled={loading}
        >
          Create Account
        </button>
      </div>

      {/* Google Sign-In Button */}
      {googleLoaded && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ color: '#64748b', fontSize: 12 }}>or sign in with:</span>
          </div>
          <div id="google_signin_button" style={{ maxWidth: '100%' }}></div>
        </div>
      )}
    </div>
  );
}