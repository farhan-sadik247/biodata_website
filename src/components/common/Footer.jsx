'use client';

import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>
          © {currentYear} Bio-Data Generator. All rights reserved by Farhan Sadik.
        </p>
        <div className={styles.footer__links}>
          <a href="#" className={styles.footer__link}>
            Privacy Policy
          </a>
          <a href="#" className={styles.footer__link}>
            Terms of Service
          </a>
          <a href="#" className={styles.footer__link}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
