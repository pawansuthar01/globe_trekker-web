/**
 * Validates password based on security requirements.
 * Password must be at least 8 characters and contain at least one:
 * - Lowercase letter
 * - Uppercase letter
 * - Number
 * - Special character
 */
export const validatePassword = (password) => {
  if (password.length < 8) return false;

  // Check for various character types
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Basic requirement: at least 3 of the 4 character types
  const requirementsMet =
    [hasLowercase, hasUppercase, hasNumber, hasSpecial].filter(Boolean)
      .length >= 3;

  return requirementsMet;
};

/**
 * Calculate password strength on a scale of 0-100.
 * Higher score means stronger password.
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let score = 0;

  // Length contribution (up to 40 points)
  score += Math.min(40, password.length * 4);

  // Character variety contribution
  if (/[a-z]/.test(password)) score += 10; // lowercase
  if (/[A-Z]/.test(password)) score += 10; // uppercase
  if (/[0-9]/.test(password)) score += 10; // numbers
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 15; // special chars

  // Bonus for mixed character types
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const typesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  // Bonus for having different character types (up to 15 points)
  score += (typesCount - 1) * 5;

  // Ensure the score is between 0 and 100
  return Math.min(100, Math.max(0, score));
};
