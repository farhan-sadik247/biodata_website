'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../common/Button';

const AdditionalInfoForm = () => {
  const { register, setValue, watch } = useFormContext();
  const [hobbyInput, setHobbyInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const hobbies = watch('additionalInfo.hobbies') || [];
  const skills = watch('additionalInfo.skills') || [];
  const languages = watch('additionalInfo.languages') || [];

  const addItem = (type, input, setInput) => {
    if (input.trim()) {
      const current = watch(`additionalInfo.${type}`) || [];
      setValue(`additionalInfo.${type}`, [...current, input.trim()]);
      setInput('');
    }
  };

  const removeItem = (type, index) => {
    const current = watch(`additionalInfo.${type}`) || [];
    setValue(`additionalInfo.${type}`, current.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e, type, input, setInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(type, input, setInput);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Additional Information</h2>
      
      <div className="form__group">
        <label className="form__label">Hobbies</label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form__input"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            placeholder="Add a hobby"
            onKeyDown={(e) => handleKeyPress(e, 'hobbies', hobbyInput, setHobbyInput)}
          />
          <Button type="button" variant="outline" onClick={() => addItem('hobbies', hobbyInput, setHobbyInput)}>Add</Button>
        </div>
        <div className="d-flex gap-2 flex-column">
          {hobbies.map((hobby, index) => (
            <div key={index} className="d-flex gap-2 align-center">
              <span>{hobby}</span>
              <button type="button" onClick={() => removeItem('hobbies', index)} style={{cursor: 'pointer', border: 'none', background: 'transparent'}}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Skills</label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form__input"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add a skill"
            onKeyDown={(e) => handleKeyPress(e, 'skills', skillInput, setSkillInput)}
          />
          <Button type="button" variant="outline" onClick={() => addItem('skills', skillInput, setSkillInput)}>Add</Button>
        </div>
        <div className="d-flex gap-2 flex-column">
          {skills.map((skill, index) => (
            <div key={index} className="d-flex gap-2 align-center">
              <span>{skill}</span>
              <button type="button" onClick={() => removeItem('skills', index)} style={{cursor: 'pointer', border: 'none', background: 'transparent'}}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Languages</label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form__input"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            placeholder="Add a language"
            onKeyDown={(e) => handleKeyPress(e, 'languages', languageInput, setLanguageInput)}
          />
          <Button type="button" variant="outline" onClick={() => addItem('languages', languageInput, setLanguageInput)}>Add</Button>
        </div>
        <div className="d-flex gap-2 flex-column">
          {languages.map((language, index) => (
            <div key={index} className="d-flex gap-2 align-center">
              <span>{language}</span>
              <button type="button" onClick={() => removeItem('languages', index)} style={{cursor: 'pointer', border: 'none', background: 'transparent'}}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
