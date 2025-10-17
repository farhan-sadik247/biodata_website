'use client';

import React, { useState } from 'react';
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
import styles from './create.module.scss';

const STEPS = [
  { id: 1, label: 'Personal', component: PersonalInfoForm },
  { id: 2, label: 'Family', component: FamilyInfoForm },
  { id: 3, label: 'Education', component: EducationInfoForm },
  { id: 4, label: 'Professional', component: ProfessionalInfoForm },
  { id: 5, label: 'Additional', component: AdditionalInfoForm },
];

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const autoSave = async () => {
    setAutoSaving(true);
    try {
      const data = methods.getValues();
      if (biodataId) {
        // Update existing draft
        await axios.put(`/api/biodata/${biodataId}`, data);
      } else {
        // Create new draft on first save
        const response = await axios.post('/api/biodata', data);
        setBiodataId(response.data.biodata._id);
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setTimeout(() => setAutoSaving(false), 1000);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (biodataId) {
        await axios.put(`/api/biodata/${biodataId}`, data);
      } else {
        await axios.post('/api/biodata', data);
      }
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to create bio-data');
    } finally {
      setLoading(false);
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
              <h1 className={styles.create__title}>Create Bio-Data</h1>
              
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
                        loading={loading}
                      >
                        Create Bio-Data
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
