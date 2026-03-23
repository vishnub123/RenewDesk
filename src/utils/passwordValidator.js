/**
 * Password validation utility
 * Requirements: min 6 chars, 1 uppercase, 1 number, 1 special character
 */

export const passwordRequirements = {
  minLength: { regex: /.{6,}/, label: 'At least 6 characters' },
  hasUppercase: { regex: /[A-Z]/, label: 'One capital letter' },
  hasNumber: { regex: /[0-9]/, label: 'One numerical digit' },
  hasSpecialChar: { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, label: 'One special character (!@#$%^&* etc)' },
};

export const validatePassword = (password) => {
  const results = {};
  for (const [key, requirement] of Object.entries(passwordRequirements)) {
    results[key] = requirement.regex.test(password);
  }
  return results;
};

export const isPasswordValid = (password) => {
  const validation = validatePassword(password);
  return Object.values(validation).every(v => v === true);
};

export const getPasswordFeedback = (password) => {
  const validation = validatePassword(password);
  const missing = Object.entries(validation)
    .filter(([_, isValid]) => !isValid)
    .map(([key, _]) => passwordRequirements[key].label);
  
  return {
    isValid: missing.length === 0,
    missing,
    met: Object.entries(validation)
      .filter(([_, isValid]) => isValid)
      .map(([key, _]) => passwordRequirements[key].label)
  };
};
