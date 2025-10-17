'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Button from '../common/Button';

const EducationInfoForm = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'educationInfo' });

  return (
    <div>
      <h2 className="mb-3">Education Information</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="form__array-item">
          <button type="button" className="form__array-remove" onClick={() => remove(index)}>✕</button>
          
          <div className="form__row form__row--two">
            <div className="form__group">
              <label className="form__label">Name of Examination</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.degree`)} 
                placeholder="e.g., S.S.C, H.S.C, B.B.A, M.B.A" 
              />
            </div>
            <div className="form__group">
              <label className="form__label">Group/Subject</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.subject`)} 
                placeholder="e.g., Science, Management, CSE" 
              />
            </div>
          </div>

          <div className="form__row form__row--two">
            <div className="form__group">
              <label className="form__label">Educational Institute</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.institution`)} 
                placeholder="Institution name" 
              />
            </div>
            <div className="form__group">
              <label className="form__label">Board/University</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.board`)} 
                placeholder="e.g., Dinajpur, Rajshahi, Islamic University" 
              />
            </div>
          </div>
          
          <div className="form__row form__row--two">
            <div className="form__group">
              <label className="form__label">GPA/CGPA</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.gpa`)} 
                placeholder="e.g., 5.00, 3.25" 
              />
            </div>
            <div className="form__group">
              <label className="form__label">Passing Year</label>
              <input 
                type="text" 
                className="form__input" 
                {...register(`educationInfo.${index}.passingYear`)} 
                placeholder="e.g., 2015, 2022" 
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({})}>+ Add Education</Button>
    </div>
  );
};

export default EducationInfoForm;
