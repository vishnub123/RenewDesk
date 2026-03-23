import { useState } from 'react';
import { Inp, Sel, Btn } from '../components/ui/Atoms';
import useAuth from '../context/useAuth';
import { validatePassword } from '../utils/passwordValidator';

export default function RegisterPage({ onBack }) {
  const { addOwner, setOwner, owners, authMethod } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [pinForm, setPinForm] = useState({
    ownerName: '',
    businessName: '',
    businessType: 'gym',
    pin: ''
  });

  const [emailForm, setEmailForm] = useState({
    ownerName: '',
    businessName: '',
    businessType: 'gym',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validatePinForm = () => {
    if (!pinForm.ownerName.trim() || !pinForm.businessName.trim() || !pinForm.pin.trim()) {
      setError('Please fill in all required fields');
      return false;
    }
    if (pinForm.pin.length < 4 || pinForm.pin.length > 6) {
      setError('PIN must be 4-6 digits');
      return false;
    }
    if (owners.find(o => o.businessName.toLowerCase() === pinForm.businessName.toLowerCase())) {
      setError('Business name already exists');
      return false;
    }
    return true;
  };

  const validateEmailForm = () => {
    if (!emailForm.ownerName.trim() || !emailForm.businessName.trim() || !emailForm.email.trim() || !emailForm.password.trim()) {
      setError('Please fill in all required fields');
      return false;
    }
    
    const pwdValidation = validatePassword(emailForm.password);
    const isPasswordValid = Object.values(pwdValidation).every(v => v === true);
    
    if (!isPasswordValid) {
      setError('Password must contain: 6+ characters, 1 uppercase letter, 1 number, and 1 special character');
      return false;
    }
    
    if (emailForm.password !== emailForm.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!emailForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (owners.find(o => o.email && o.email.toLowerCase() === emailForm.email.toLowerCase())) {
      setError('Email already registered');
      return false;
    }
    if (owners.find(o => o.businessName.toLowerCase() === emailForm.businessName.toLowerCase())) {
      setError('Business name already exists');
      return false;
    }
    return true;
  };

  const handlePinRegister = () => {
    setError('');
    setLoading(true);

    if (!validatePinForm()) {
      setLoading(false);
      return;
    }

    const newOwner = {
      id: Math.random().toString(36).substr(2, 9),
      ...pinForm,
      authMethod: 'pin'
    };

    addOwner(newOwner);
    setOwner(newOwner);
    setPinForm({ ownerName: '', businessName: '', businessType: 'gym', pin: '' });
    setLoading(false);
  };

  const handleEmailRegister = () => {
    setError('');
    setLoading(true);

    if (!validateEmailForm()) {
      setLoading(false);
      return;
    }

    const newOwner = {
      id: Math.random().toString(36).substr(2, 9),
      ownerName: emailForm.ownerName,
      businessName: emailForm.businessName,
      businessType: emailForm.businessType,
      email: emailForm.email,
      password: emailForm.password,
      authMethod: 'email'
    };

    addOwner(newOwner);
    setOwner(newOwner);
    setEmailForm({ ownerName: '', businessName: '', businessType: 'gym', email: '', password: '', confirmPassword: '' });
    setLoading(false);
  };

  const handleRegister = authMethod === 'pin' ? handlePinRegister : handleEmailRegister;

  return (
    <div style={{ padding: '56px 24px 32px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', marginBottom: 24, fontSize: 14, fontFamily: 'inherit' }}>← Back</button>
      <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800, margin: '0 0 4px' }}>Create Account</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Set up your business to start tracking</p>

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

      {/* Common Fields */}
      <Inp 
        label="Your Name *" 
        placeholder="Owner's full name" 
        value={authMethod === 'pin' ? pinForm.ownerName : emailForm.ownerName}
        onChange={e => authMethod === 'pin' 
          ? setPinForm({...pinForm, ownerName: e.target.value})
          : setEmailForm({...emailForm, ownerName: e.target.value})
        }
        disabled={loading}
      />
      <Inp 
        label="Business Name *" 
        placeholder="e.g. FitZone Gym" 
        value={authMethod === 'pin' ? pinForm.businessName : emailForm.businessName}
        onChange={e => authMethod === 'pin'
          ? setPinForm({...pinForm, businessName: e.target.value})
          : setEmailForm({...emailForm, businessName: e.target.value})
        }
        disabled={loading}
      />
      <Sel 
        label="Business Type" 
        value={authMethod === 'pin' ? pinForm.businessType : emailForm.businessType}
        onChange={e => authMethod === 'pin'
          ? setPinForm({...pinForm, businessType: e.target.value})
          : setEmailForm({...emailForm, businessType: e.target.value})
        }
        disabled={loading}
      >
        <option value="gym">💪 Gym / Fitness Center</option>
        <option value="hostel">🏠 PG / Hostel</option>
        <option value="coaching">📚 Coaching / Tuition</option>
        <option value="club">🎾 Sports Club</option>
        <option value="other">🏢 Other Business</option>
      </Sel>

      {/* PIN Specific */}
      {authMethod === 'pin' && (
        <Inp 
          label="Set PIN *" 
          type="password" 
          placeholder="4-6 digit PIN" 
          value={pinForm.pin}
          onChange={e => setPinForm({...pinForm, pin: e.target.value})}
          disabled={loading}
        />
      )}

      {/* Email Specific */}
      {authMethod === 'email' && (
        <>
          <Inp 
            label="Email *" 
            type="email"
            placeholder="your@email.com" 
            value={emailForm.email}
            onChange={e => setEmailForm({...emailForm, email: e.target.value})}
            disabled={loading}
          />
          <Inp 
            label="Password *" 
            type="password" 
            placeholder="Create a strong password" 
            value={emailForm.password}
            onChange={e => setEmailForm({...emailForm, password: e.target.value})}
            disabled={loading}
          />
          
          {/* Password Requirements Feedback */}
          {emailForm.password && (
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '12px 14px', marginBottom: 13, fontSize: 12 }}>
              <div style={{ color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Password Requirements:</div>
              <div style={{ color: (/.{6,}/).test(emailForm.password) ? '#10b981' : '#64748b', marginBottom: 4 }}>
                {(/.{6,}/).test(emailForm.password) ? '✓' : '○'} At least 6 characters
              </div>
              <div style={{ color: (/[A-Z]/).test(emailForm.password) ? '#10b981' : '#64748b', marginBottom: 4 }}>
                {(/[A-Z]/).test(emailForm.password) ? '✓' : '○'} One capital letter (A-Z)
              </div>
              <div style={{ color: (/[0-9]/).test(emailForm.password) ? '#10b981' : '#64748b', marginBottom: 4 }}>
                {(/[0-9]/).test(emailForm.password) ? '✓' : '○'} One numerical digit (0-9)
              </div>
              <div style={{ color: (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/).test(emailForm.password) ? '#10b981' : '#64748b' }}>
                {(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/).test(emailForm.password) ? '✓' : '○'} One special character (!@#$%^&*)
              </div>
            </div>
          )}

          <Inp 
            label="Confirm Password *" 
            type="password" 
            placeholder="Confirm your password" 
            value={emailForm.confirmPassword}
            onChange={e => setEmailForm({...emailForm, confirmPassword: e.target.value})}
            disabled={loading}
          />
        </>
      )}

      <Btn onClick={handleRegister} disabled={loading} sx={{ marginTop: 8 }}>
        {loading ? 'Creating Account...' : 'Create Account 🚀'}
      </Btn>
    </div>
  );
}