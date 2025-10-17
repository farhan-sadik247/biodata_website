'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import styles from './auth.module.scss';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const calculatePasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengths = [
      { score: 0, text: '', color: '' },
      { score: 1, text: 'Very Weak', color: '#ef4444' },
      { score: 2, text: 'Weak', color: '#f97316' },
      { score: 3, text: 'Fair', color: '#eab308' },
      { score: 4, text: 'Good', color: '#22c55e' },
      { score: 5, text: 'Strong', color: '#10b981' },
    ];

    return strengths[score];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password' && !isLogin) {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          setError(result.message);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const result = await register(formData.email, formData.password, formData.confirmPassword);
        if (!result.success) {
          setError(result.message);
          console.error('Registration error:', result.message);
        }
      }
    } catch (err) {
      console.error('Error during auth:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authPage__container}>
        <div className={`${styles.book} ${!isLogin ? styles.bookFlipped : ''}`}>
          {/* Login Side */}
          <div className={`${styles.page} ${styles.pageLogin}`}>
            <div className={styles.pageContent}>
              <div className={styles.header}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to your account</p>
              </div>

              {error && isLogin && (
                <div className={styles.error}>{error}</div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="login-email" className={styles.label}>
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="login-password" className={styles.label}>
                    🔒 Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      name="password"
                      className={styles.input}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  size="large"
                >
                  Sign In
                </Button>
              </form>

              <div className={styles.footer}>
                <p>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className={styles.link}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Register Side */}
          <div className={`${styles.page} ${styles.pageRegister}`}>
            <div className={styles.pageContent}>
              <div className={styles.header}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join us today</p>
              </div>

              {error && !isLogin && (
                <div className={styles.error}>{error}</div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="register-email" className={styles.label}>
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="register-password" className={styles.label}>
                    🔒 Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="register-password"
                      name="password"
                      className={styles.input}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordStrength.text && (
                    <div className={styles.passwordStrength}>
                      <div className={styles.strengthBar}>
                        <div 
                          className={styles.strengthFill} 
                          style={{ 
                            width: `${(passwordStrength.score / 5) * 100}%`,
                            backgroundColor: passwordStrength.color 
                          }}
                        />
                      </div>
                      <span 
                        className={styles.strengthText}
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                  )}
                  <div className={styles.passwordHints}>
                    <small>Password must contain:</small>
                    <small>• At least 8 characters</small>
                    <small>• Uppercase and lowercase letters</small>
                    <small>• At least one number</small>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirm-password" className={styles.label}>
                    🔐 Confirm Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      name="confirmPassword"
                      className={styles.input}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  size="large"
                >
                  Sign Up
                </Button>
              </form>

              <div className={styles.footer}>
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className={styles.link}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
