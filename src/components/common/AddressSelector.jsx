'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  getDivisions, 
  getDistrictsByDivision, 
  getUpazilasByDistrict
} from 'bd-geodata';

const AddressSelector = ({ fieldPrefix, label, required = false }) => {
  const { register, setValue, watch } = useFormContext();
  
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  
  const selectedDivision = watch(`${fieldPrefix}.division`);
  const selectedDistrict = watch(`${fieldPrefix}.district`);

  // Load divisions on mount
  useEffect(() => {
    try {
      const divisionList = getDivisions();
      setDivisions(divisionList || []);
    } catch (error) {
      console.error('Error loading divisions:', error);
      setDivisions([]);
    }
  }, []);

  // Load districts when division changes
  useEffect(() => {
    if (selectedDivision && divisions.length > 0) {
      try {
        console.log('Selected Division:', selectedDivision);
        console.log('Available Divisions:', divisions);
        
        const divisionObj = divisions.find(d => d.name === selectedDivision);
        console.log('Found Division Object:', divisionObj);
        
        if (divisionObj) {
          const districtList = getDistrictsByDivision(divisionObj.id);
          console.log('Loaded Districts:', districtList);
          setDistricts(districtList || []);
        }
        // Reset dependent fields
        setValue(`${fieldPrefix}.district`, '');
        setValue(`${fieldPrefix}.upazila`, '');
        setValue(`${fieldPrefix}.postOffice`, '');
        setUpazilas([]);
      } catch (error) {
        console.error('Error loading districts:', error);
        setDistricts([]);
      }
    } else {
      setDistricts([]);
      setUpazilas([]);
    }
  }, [selectedDivision, divisions, fieldPrefix, setValue]);

  // Load upazilas when district changes
  useEffect(() => {
    if (selectedDistrict && districts.length > 0) {
      try {
        console.log('Selected District:', selectedDistrict);
        console.log('Available Districts:', districts);
        
        const districtObj = districts.find(d => d.name === selectedDistrict);
        console.log('Found District Object:', districtObj);
        
        if (districtObj) {
          const upazilaList = getUpazilasByDistrict(districtObj.id);
          console.log('Loaded Upazilas:', upazilaList);
          setUpazilas(upazilaList || []);
        }
        // Reset dependent fields
        setValue(`${fieldPrefix}.upazila`, '');
        setValue(`${fieldPrefix}.postOffice`, '');
      } catch (error) {
        console.error('Error loading upazilas:', error);
        setUpazilas([]);
      }
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict, districts, fieldPrefix, setValue]);

  return (
    <div className="address-selector">
      <h3 className="form__section-title">{label}</h3>
      
      <div className="form__row form__row--two">
        <div className="form__group">
          <label className={`form__label ${required ? 'form__label--required' : ''}`}>
            Division (বিভাগ)
          </label>
          <select
            className="form__input form__select"
            {...register(`${fieldPrefix}.division`, {
              required: required ? 'Division is required' : false,
            })}
          >
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.name}>
                {division.bn_name} ({division.name})
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label className={`form__label ${required ? 'form__label--required' : ''}`}>
            District (জেলা)
          </label>
          <select
            className="form__input form__select"
            {...register(`${fieldPrefix}.district`, {
              required: required ? 'District is required' : false,
            })}
            disabled={!selectedDivision}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.bn_name} ({district.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form__row form__row--two">
        <div className="form__group">
          <label className="form__label">Upazila/Thana (উপজেলা/থানা)</label>
          <select
            className="form__input form__select"
            {...register(`${fieldPrefix}.upazila`)}
            disabled={!selectedDistrict}
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.bn_name} ({upazila.name})
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Post Office (ডাকঘর)</label>
          <input
            type="text"
            className="form__input"
            placeholder="Enter post office name"
            {...register(`${fieldPrefix}.postOffice`)}
          />
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Village/Area (গ্রাম/এলাকা)</label>
        <input
          type="text"
          className="form__input"
          placeholder="Enter your village or area"
          {...register(`${fieldPrefix}.village`)}
        />
      </div>

      <div className="form__group">
        <label className="form__label">Full Address (সম্পূর্ণ ঠিকানা)</label>
        <textarea
          className="form__input"
          {...register(`${fieldPrefix}.fullAddress`)}
          placeholder="House/Road/Block details (if any)"
          rows="2"
        />
      </div>
    </div>
  );
};

AddressSelector.displayName = 'AddressSelector';

export default AddressSelector;
