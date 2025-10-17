'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { getPasswordStrength } from '@/lib/utils';
import styles from '../login/login.module.scss';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await register(email, password, confirmPassword);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <Card className={styles.auth__card}>
          <div className={styles.auth__header}>
            <h1 className={styles.auth__title}>Create Account</h1>
            <p className={styles.auth__subtitle}>Sign up to get started</p>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit} className={styles.auth__form}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
              {password && (
                <div className={styles.passwordStrength}>
                  <div 
                    className={styles.passwordStrength__bar}
                    data-strength={passwordStrength.strength}
                  >
                    <div className={styles.passwordStrength__fill}></div>
                  </div>
                  <span className={styles.passwordStrength__label}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="form__group">
              <label htmlFor="confirmPassword" className="form__label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form__input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              size="large"
            >
              Create Account
            </Button>
          </form>

          <div className={styles.auth__footer}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles.auth__link}>
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
