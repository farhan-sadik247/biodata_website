'use client';

import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Button from '../common/Button';
import { formatDate } from '@/lib/utils';
import '@/styles/components/_card.scss';

const BiodataCard = ({ biodata, onDelete, onRefresh }) => {
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this bio-data?')) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/biodata/${biodata._id}`);
      onRefresh();
    } catch (error) {
      alert('Failed to delete bio-data');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="biodata-card">
      <div className="biodata-card__image">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem', color: 'white'}}>👤</div>
      </div>
      
      <div className="biodata-card__content">
        <h3 className="biodata-card__title">{biodata.personalInfo?.fullName || 'Untitled'}</h3>
        
        <div className="biodata-card__meta">
          <span>📅 {formatDate(biodata.createdAt)}</span>
          <span>📧 {biodata.personalInfo?.email || 'No email'}</span>
        </div>
        
        <div className="biodata-card__actions">
          <Link href={`/preview/${biodata._id}`}>
            <Button variant="primary" size="small" fullWidth>View</Button>
          </Link>
          <Link href={`/edit/${biodata._id}`}>
            <Button variant="outline" size="small" fullWidth>Edit</Button>
          </Link>
          <Button 
            variant="danger" 
            size="small" 
            fullWidth 
            onClick={handleDelete}
            loading={deleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;
