'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import styles from './page.module.scss';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>
              Create Professional <span className={styles.hero__gradient}>Bio-Data</span> in Minutes
            </h1>
            <p className={styles.hero__description}>
              Generate beautiful, professional bio-data and CVs with our easy-to-use platform. 
              Export to PDF or PNG format instantly.
            </p>
            <div className={styles.hero__actions}>
              <Link href="/auth">
                <Button variant="primary" size="large">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" size="large">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={styles.hero__visual}>
            <div className={styles.hero__card}>
              📄
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.features__container}>
          <h2 className={styles.features__title}>Why Choose Our Platform?</h2>
          
          <div className={styles.features__grid}>
            <div className={styles.feature}>
              <div className={styles.feature__icon}>✨</div>
              <h3 className={styles.feature__title}>Easy to Use</h3>
              <p className={styles.feature__description}>
                Simple multi-step form makes creating bio-data a breeze
              </p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.feature__icon}>🎨</div>
              <h3 className={styles.feature__title}>Beautiful Design</h3>
              <p className={styles.feature__description}>
                Professional templates with modern 3D design elements
              </p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.feature__icon}>📥</div>
              <h3 className={styles.feature__title}>Export Anywhere</h3>
              <p className={styles.feature__description}>
                Download as PDF or PNG format instantly
              </p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.feature__icon}>🔒</div>
              <h3 className={styles.feature__title}>Secure & Private</h3>
              <p className={styles.feature__description}>
                Your data is encrypted and stored securely
              </p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.feature__icon}>💾</div>
              <h3 className={styles.feature__title}>Auto-Save</h3>
              <p className={styles.feature__description}>
                Never lose your work with automatic saving
              </p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.feature__icon}>📱</div>
              <h3 className={styles.feature__title}>Responsive</h3>
              <p className={styles.feature__description}>
                Works perfectly on all devices and screen sizes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
