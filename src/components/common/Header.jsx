'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
import styles from './Header.module.scss';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__logo}>
          <span className={styles.header__logoIcon}>📄</span>
          <span className={styles.header__logoText}>Bio-Data Generator</span>
        </Link>

        <nav className={styles.header__nav}>
          {user ? (
            <>
              <Link href="/dashboard" className={styles.header__link}>
                Dashboard
              </Link>
              <Link href="/create" className={styles.header__link}>
                Create New
              </Link>
              <Button variant="outline" size="small" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="primary" size="small">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
