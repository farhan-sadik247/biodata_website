'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import AddressSelector from '@/components/common/AddressSelector';

const PersonalInfoForm = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="mb-3">Personal Information</h2>
      
      <div className="form__row">
        <div className="form__group">
          <label className="form__label form__label--required">Full Name</label>
          <input
            type="text"
            className={`form__input ${errors.personalInfo?.fullName ? 'form__input--error' : ''}`}
            {...register('personalInfo.fullName', { required: 'Full name is required' })}
            placeholder="Enter your full name"
          />
          {errors.personalInfo?.fullName && (
            <span className="form__error">{errors.personalInfo.fullName.message}</span>
          )}
        </div>

        <div className="form__group">
          <label className="form__label">Latest Degree</label>
          <input
            type="text"
            className="form__input"
            {...register('personalInfo.latestDegree')}
            placeholder="e.g., BSc in Computer Science"
          />
        </div>
      </div>

      <div className="form__row form__row--three">
        <div className="form__group">
          <label className="form__label">Date of Birth</label>
          <input
            type="date"
            className="form__input"
            {...register('personalInfo.dateOfBirth')}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Height</label>
          <input
            type="text"
            className="form__input"
            {...register('personalInfo.height')}
            placeholder="e.g., 5 feet 8 inches"
          />
        </div>

        <div className="form__group">
          <label className="form__label">Weight</label>
          <input
            type="text"
            className="form__input"
            {...register('personalInfo.weight')}
            placeholder="e.g., 70 kg"
          />
        </div>
      </div>

      <div className="form__row form__row--three">
        <div className="form__group">
          <label className="form__label">Blood Group</label>
          <select className="form__input" {...register('personalInfo.bloodGroup')}>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Nationality</label>
          <input
            type="text"
            className="form__input"
            {...register('personalInfo.nationality')}
            placeholder="e.g., Bangladeshi"
          />
        </div>

        <div className="form__group">
          <label className="form__label">Religion</label>
          <input
            type="text"
            className="form__input"
            {...register('personalInfo.religion')}
            placeholder="e.g., Islam"
          />
        </div>
      </div>

      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Marital Status</label>
          <select className="form__input" {...register('personalInfo.maritalStatus')}>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Contact Number</label>
          <input
            type="tel"
            className="form__input"
            {...register('personalInfo.contactNumber')}
            placeholder="+880 1712-345678"
          />
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Email</label>
        <input
          type="email"
          className="form__input"
          {...register('personalInfo.email')}
          placeholder="your@email.com"
        />
      </div>

      <AddressSelector 
        fieldPrefix="personalInfo.presentAddress" 
        label="Present Address (বর্তমান ঠিকানা)"
        required={false}
      />

      <AddressSelector 
        fieldPrefix="personalInfo.permanentAddress" 
        label="Permanent Address (স্থায়ী ঠিকানা)"
        required={false}
      />
    </div>
  );
};

export default PersonalInfoForm;
