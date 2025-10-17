'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

const ProfessionalInfoForm = () => {
  const { register } = useFormContext();

  return (
    <div>
      <h2 className="mb-3">Professional Information</h2>
      <div className="form__group">
        <label className="form__label">Current Position</label>
        <input type="text" className="form__input" {...register('professionalInfo.currentPosition')} placeholder="e.g., Senior Software Engineer" />
      </div>
      <div className="form__group">
        <label className="form__label">Organization</label>
        <input type="text" className="form__input" {...register('professionalInfo.organization')} placeholder="Company name" />
      </div>
      <div className="form__group">
        <label className="form__label">Experience</label>
        <input type="text" className="form__input" {...register('professionalInfo.experience')} placeholder="e.g., 5 years" />
      </div>
    </div>
  );
};

export default ProfessionalInfoForm;
