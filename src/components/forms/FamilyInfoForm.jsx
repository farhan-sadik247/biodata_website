'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Button from '../common/Button';

const FamilyInfoForm = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'familyInfo.siblings',
  });

  return (
    <div>
      <h2 className="mb-3">Family Information</h2>
      
      <h3 className="mt-4 mb-2">Father&apos;s Information</h3>
      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Name</label>
          <input type="text" className="form__input" {...register('familyInfo.father.name')} placeholder="Father's name" />
        </div>
        <div className="form__group">
          <label className="form__label">Designation</label>
          <input type="text" className="form__input" {...register('familyInfo.father.occupation')} placeholder="Occupation" />
        </div>
      </div>
      
      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Institution Name</label>
          <input type="text" className="form__input" {...register('familyInfo.father.designation')} placeholder="Designation" />
        </div>
        <div className="form__group">
          <label className="form__label">Designated Area</label>
          <input type="text" className="form__input" {...register('familyInfo.father.designatedArea')} placeholder="Area" />
        </div>
      </div>

      <h3 className="mt-4 mb-2">Mother&apos;s Information</h3>
      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Name</label>
          <input type="text" className="form__input" {...register('familyInfo.mother.name')} placeholder="Mother's name" />
        </div>
        <div className="form__group">
          <label className="form__label">Designation</label>
          <input type="text" className="form__input" {...register('familyInfo.mother.occupation')} placeholder="Occupation" />
        </div>
      </div>
      
      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Institution Name</label>
          <input type="text" className="form__input" {...register('familyInfo.mother.designation')} placeholder="Designation" />
        </div>
        <div className="form__group">
          <label className="form__label">Designated Area</label>
          <input type="text" className="form__input" {...register('familyInfo.mother.designatedArea')} placeholder="Area" />
        </div>
      </div>

      <h3 className="mt-4 mb-2">Siblings</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="form__array-item">
          <button type="button" className="form__array-remove" onClick={() => remove(index)}>✕</button>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Name</label>
              <input type="text" className="form__input" {...register(`familyInfo.siblings.${index}.name`)} placeholder="Sibling's name" />
            </div>
            <div className="form__group">
              <label className="form__label">Relation</label>
              <select className="form__input" {...register(`familyInfo.siblings.${index}.relation`)}>
                <option value="">Select</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Brother-in-law">Brother-in-law</option>
                <option value="Sister-in-law">Sister-in-law</option>
              </select>
            </div>
          </div>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Designation</label>
              <input type="text" className="form__input" {...register(`familyInfo.siblings.${index}.occupation`)} placeholder="Occupation" />
            </div>
            <div className="form__group">
              <label className="form__label">Institution Name</label>
              <input type="text" className="form__input" {...register(`familyInfo.siblings.${index}.designation`)} placeholder="Designation" />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({})}>+ Add Sibling</Button>
    </div>
  );
};

export default FamilyInfoForm;
