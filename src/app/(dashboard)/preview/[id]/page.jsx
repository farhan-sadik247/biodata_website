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
      // Force desktop/print mode for export
      const originalClass = templateRef.current.className;
      const originalStyle = templateRef.current.style.cssText;
      
      // Apply desktop export styles
      templateRef.current.classList.add('export-mode');
      templateRef.current.style.width = '210mm';
      templateRef.current.style.minWidth = '210mm';
      templateRef.current.style.maxWidth = '210mm';
      templateRef.current.style.padding = '20mm';
      templateRef.current.style.fontSize = '11pt';
      templateRef.current.style.lineHeight = '1.6';
      templateRef.current.style.backgroundColor = 'white';
      templateRef.current.style.height = 'auto';
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get actual content dimensions
      const elementHeight = templateRef.current.scrollHeight;
      const elementWidth = templateRef.current.scrollWidth;
      
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: elementWidth,
        height: elementHeight,
        windowWidth: 1200, // Wider window for better rendering
        windowHeight: elementHeight,
      });
      
      // Restore original styles
      templateRef.current.className = originalClass;
      templateRef.current.style.cssText = originalStyle;
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create custom PDF size to fit content
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Convert pixels to mm (assuming 96 DPI)
      const pdfWidth = (imgWidth * 25.4) / 96; // Convert to mm
      const pdfHeight = (imgHeight * 25.4) / 96; // Convert to mm
      
      // Create PDF with custom dimensions
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });
      
      // Add image to fill entire page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.save(generateFilename(biodata?.personalInfo?.fullName, 'pdf'));
    } catch (error) {
      console.error('Export PDF error:', error);
      alert('Failed to export PDF');
      // Restore styles in case of error
      if (templateRef.current) {
        templateRef.current.classList.remove('export-mode');
      }
    } finally {
      setExporting(false);
    }
  };

  const exportToPNG = async () => {
    if (!templateRef.current) return;
    
    setExporting(true);
    try {
      // Force desktop/print mode for export
      const originalClass = templateRef.current.className;
      const originalStyle = templateRef.current.style.cssText;
      
      // Apply desktop export styles for PNG (capture full content)
      templateRef.current.classList.add('export-mode');
      templateRef.current.style.width = '210mm';
      templateRef.current.style.minWidth = '210mm';
      templateRef.current.style.maxWidth = '210mm';
      templateRef.current.style.padding = '20mm';
      templateRef.current.style.fontSize = '11pt';
      templateRef.current.style.lineHeight = '1.6';
      templateRef.current.style.backgroundColor = 'white';
      templateRef.current.style.height = 'auto';
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get actual content dimensions for PNG (no height limit)
      const elementHeight = templateRef.current.scrollHeight;
      const elementWidth = templateRef.current.scrollWidth;
      
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: elementWidth,
        height: elementHeight,
        windowWidth: 1200,
        windowHeight: elementHeight,
      });
      
      // Restore original styles
      templateRef.current.className = originalClass;
      templateRef.current.style.cssText = originalStyle;
      
      const link = document.createElement('a');
      link.download = generateFilename(biodata?.personalInfo?.fullName, 'png');
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export PNG error:', error);
      alert('Failed to export PNG');
      // Restore styles in case of error
      if (templateRef.current) {
        templateRef.current.classList.remove('export-mode');
      }
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
