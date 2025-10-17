'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import styles from './login.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
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
            <h1 className={styles.auth__title}>Welcome Back</h1>
            <p className={styles.auth__subtitle}>Sign in to your account</p>
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
                placeholder="Enter your password"
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
              Sign In
            </Button>
          </form>

          <div className={styles.auth__footer}>
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className={styles.auth__link}>
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
