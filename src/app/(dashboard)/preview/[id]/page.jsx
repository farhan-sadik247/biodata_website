'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import BiodataTemplate from '@/components/biodata/BiodataTemplate';
import { generateFilename } from '@/lib/utils';
import styles from './preview.module.scss';

export default function PreviewPage({ params }) {
  const router = useRouter();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [biodataId, setBiodataId] = useState(null);
  const templateRef = useRef();

  useEffect(() => {
    // Unwrap params for Next.js 15
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setBiodataId(unwrappedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (biodataId) {
      fetchBiodata();
    }
  }, [biodataId]);

  const fetchBiodata = async () => {
    try {
      const response = await axios.get(`/api/biodata/${biodataId}`);
      setBiodata(response.data.biodata);
    } catch (error) {
      alert('Failed to load bio-data');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    if (!templateRef.current) return;
    
    setExporting(true);
    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(generateFilename(biodata?.personalInfo?.fullName, 'pdf'));
    } catch (error) {
      alert('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  const exportToPNG = async () => {
    if (!templateRef.current) return;
    
    setExporting(true);
    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = generateFilename(biodata?.personalInfo?.fullName, 'png');
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert('Failed to export PNG');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.preview}>
        <div className={styles.preview__container}>
          <div className={styles.preview__actions}>
            <Link href="/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
            <div className={styles.preview__buttons}>
              <Link href={`/edit/${biodataId}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="secondary" onClick={exportToPNG} loading={exporting}>
                Export PNG
              </Button>
              <Button variant="primary" onClick={exportToPDF} loading={exporting}>
                Export PDF
              </Button>
            </div>
          </div>

          <Card>
            <Card.Body>
              <BiodataTemplate ref={templateRef} biodata={biodata} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
