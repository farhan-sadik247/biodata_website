'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import BiodataCard from '@/components/biodata/BiodataCard';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBiodatas = async () => {
    try {
      const response = await axios.get('/api/biodata');
      setBiodatas(response.data.biodatas || []);
    } catch (error) {
      console.error('Failed to fetch bio-datas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiodatas();
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <div className={styles.dashboard__container}>
          <div className={styles.dashboard__header}>
            <div>
              <h1 className={styles.dashboard__title}>My Dashboard</h1>
              <p className={styles.dashboard__subtitle}>Welcome back, {user?.email}</p>
            </div>
            <Link href="/create">
              <Button variant="primary" size="large">+ Create New Bio-Data</Button>
            </Link>
          </div>

          <div className={styles.dashboard__stats}>
            <Card variant="hover">
              <Card.Body>
                <div className={styles.stat}>
                  <div className={styles.stat__icon}>📄</div>
                  <div>
                    <div className={styles.stat__value}>{biodatas.length}</div>
                    <div className={styles.stat__label}>Total Bio-Datas</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className={styles.dashboard__content}>
            <h2 className={styles.dashboard__sectionTitle}>Your Bio-Datas</h2>
            
            {loading ? (
              <div className="loading">
                <div className="loading__spinner"></div>
              </div>
            ) : biodatas.length === 0 ? (
              <Card>
                <Card.Body>
                  <div className={styles.empty}>
                    <div className={styles.empty__icon}>📄</div>
                    <h3>No bio-datas yet</h3>
                    <p>Create your first bio-data to get started</p>
                    <Link href="/create">
                      <Button variant="primary">Create Bio-Data</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <div className={styles.dashboard__grid}>
                {biodatas.map((biodata) => (
                  <BiodataCard
                    key={biodata._id}
                    biodata={biodata}
                    onRefresh={fetchBiodatas}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
