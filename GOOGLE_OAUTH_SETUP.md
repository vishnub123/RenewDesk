# SubTrack Authentication - Google OAuth Setup Guide

## New Features Added

### 1. Google Sign-In Button
- One-click login with Google account
- Located on the login page above traditional auth methods
- Auto-registers users on first sign-in
- Seamlessly integrates with existing PIN and Email authentication

### 2. Enhanced Password Requirements
When registering with Email/Password, passwords must contain:
- ✓ At least 6 characters
- ✓ One capital letter (A-Z)
- ✓ One numerical digit (0-9)
- ✓ One special character (!@#$%^&*()_+=-[]{}; etc)

Real-time feedback shows which requirements are met/unmet as you type.

## Setup Instructions for Google OAuth

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name (e.g., "SubTrack Auth")
4. Click "Create"

### Step 2: Enable Google+ API
1. In the Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted to create a consent screen first:
   - Choose "External" for User Type
   - Fill in required fields
   - Skip optional fields
   - Click "Save and Continue"
4. For Application Type, select "Web application"
5. Add "Authorized JavaScript origins":
   - http://localhost:5173 (development)
   - http://localhost:3000 (alternate dev)
   - Your production domain

6. Add "Authorized redirect URIs":
   - http://localhost:5173 (development)
   - http://localhost:3000 (alternate dev)
   - Your production domain

7. Click "Create"

### Step 4: Get Your Client ID
1. Copy the Client ID from the popup or credentials list
2. Create a `.env` file in your project root:
   ```
   VITE_GOOGLE_CLIENT_ID=your_copied_client_id_here
   ```
3. Restart your dev server

## Demo Credentials

### PIN Authentication
- Business: PowerFit Gym
- PIN: 1234

### Email Authentication
- Email: demo@example.com
- Password: Demo@123

### Google Sign-In
- Requires Google Account + Client ID setup as above

## Files Modified/Created

### New Files:
- `src/utils/passwordValidator.js` - Password validation logic
- `src/utils/googleAuth.js` - Google OAuth utilities
- `.env.example` - Environment variables template

### Updated Files:
- `src/pages/LoginPage.jsx` - Added Google Sign-In button
- `src/pages/RegisterPage.jsx` - Added password strength indicator
- `src/context/AuthContext.jsx` - Added handleGoogleSignIn function
- `src/data/seed.js` - Added email auth demo user

## Password Validation Rules

```javascript
// Requirements Object
{
  minLength: /^.{6,}$/ // 6+ characters
  hasUppercase: /[A-Z]/ // At least 1 A-Z
  hasNumber: /[0-9]/ // At least 1 digit
  hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ // Special chars
}
```

## Troubleshooting

### Google Button Not Appearing
- Check that `VITE_GOOGLE_CLIENT_ID` is set in `.env`
- Restart development server after adding `.env`
- Check browser console for errors

### Google Sign-In Failing
- Verify Client ID is correct
- Check that domain is in "Authorized JavaScript origins"
- Ensure HTTPS for production (Google requires it)

### Password Validation Too Strict
- All 4 requirements must be met
- Example valid passwords: `MyPassword123!`, `Secure@2024`, `Auth#Pass99`

## Future Enhancements
- Email verification
- Password reset flow
- Two-factor authentication
- OAuth providers (GitHub, Microsoft, etc)
- Social profile sync
