'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import FamilyInfoForm from '@/components/forms/FamilyInfoForm';
import EducationInfoForm from '@/components/forms/EducationInfoForm';
import ProfessionalInfoForm from '@/components/forms/ProfessionalInfoForm';
import AdditionalInfoForm from '@/components/forms/AdditionalInfoForm';
import styles from '../../create/create.module.scss';

const STEPS = [
  { id: 1, label: 'Personal', component: PersonalInfoForm },
  { id: 2, label: 'Family', component: FamilyInfoForm },
  { id: 3, label: 'Education', component: EducationInfoForm },
  { id: 4, label: 'Professional', component: ProfessionalInfoForm },
  { id: 5, label: 'Additional', component: AdditionalInfoForm },
];

export default function EditPage({ params }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [biodataId, setBiodataId] = useState(null);
  const [autoSaving, setAutoSaving] = useState(false);
  
  const methods = useForm({
    defaultValues: {
      personalInfo: {},
      familyInfo: { father: {}, mother: {}, siblings: [] },
      educationInfo: [],
      professionalInfo: {},
      additionalInfo: { hobbies: [], skills: [], languages: [] },
    },
  });

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
      const data = response.data.biodata;
      methods.reset(data);
      setLoading(false);
    } catch (error) {
      alert('Failed to load bio-data');
      router.push('/dashboard');
    }
  };

  const autoSave = async () => {
    setAutoSaving(true);
    try {
      const data = methods.getValues();
      await axios.put(`/api/biodata/${biodataId}`, data);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setTimeout(() => setAutoSaving(false), 1000);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await axios.put(`/api/biodata/${biodataId}`, data);
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to update bio-data');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    await autoSave();
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = async () => {
    await autoSave();
    setCurrentStep(currentStep - 1);
  };

  const handleFormKeyDown = (e) => {
    // Prevent form submission on Enter key except for submit button
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault();
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <ProtectedRoute>
      <div className={styles.create}>
        <div className={styles.create__container}>
          {autoSaving && (
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              zIndex: 1000,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              ✓ Saved
            </div>
          )}
          <Card>
            <Card.Body>
              <h1 className={styles.create__title}>Edit Bio-Data</h1>
              
              <div className="progress__container">
                <div className="progress__steps">
                  <div className="progress__line" style={{ width: `${progress}%` }}></div>
                  {STEPS.map((step, index) => (
                    <div
                      key={step.id}
                      className={`progress__step ${index === currentStep ? 'progress__step--active' : ''} ${index < currentStep ? 'progress__step--completed' : ''}`}
                    >
                      <div className="progress__step-circle">{index < currentStep ? '✓' : step.id}</div>
                      <div className="progress__step-label">{step.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
                  <CurrentStepComponent />

                  <div className={styles.create__actions}>
                    {currentStep > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < STEPS.length - 1 ? (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        loading={saving}
                      >
                        Update Bio-Data
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </Card.Body>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
