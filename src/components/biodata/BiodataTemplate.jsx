'use client';

import React from 'react';
import { formatDate } from '@/lib/utils';
import styles from './BiodataTemplate.module.scss';

const BiodataTemplate = React.forwardRef(({ biodata }, ref) => {
  let itemNumber = 1;

  // Helper function to format address
  const formatAddress = (address) => {
    if (!address) return '';
    const parts = [
      address.village && `Village: ${address.village}`,
      address.postOffice && `Post Office: ${address.postOffice}`,
      address.upazila && `Upazilla: ${address.upazila}`,
      address.district && `District: ${address.district}`,
    ].filter(Boolean);
    return parts.join(', ') + (parts.length > 0 ? '.' : '');
  };

  // Helper to render a field only if it has value
  const renderField = (label, value, multiline = false) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const lines = multiline && typeof value === 'string' ? value.split('\n').filter(Boolean) : [value];
    return (
      <div className={styles.field} key={`field-${itemNumber}`}>
        <span className={styles.number}>{itemNumber++}.</span>
        <span className={styles.label}>{label}</span>
        <span className={styles.colon}>:</span>
        <div className={styles.value}>
          {lines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={styles.template}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Bio-Data</h1>
      </div>

      {/* Personal Information Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Information:</h2>
        <div className={styles.infoList}>
          {biodata.personalInfo?.fullName && renderField(
            'Name',
            [
              biodata.personalInfo.fullName,
              biodata.personalInfo.latestDegree,
            ].filter(Boolean).join('\n'),
            true
          )}
          
          {biodata.familyInfo?.father?.name && renderField(
            "Father's Name",
            [
              biodata.familyInfo.father.name,
              biodata.familyInfo.father.occupation,
              biodata.familyInfo.father.designation,
              biodata.familyInfo.father.designatedArea,
            ].filter(Boolean).join('\n'),
            true
          )}
          
          {biodata.familyInfo?.mother?.name && renderField(
            "Mother's Name",
            [
              biodata.familyInfo.mother.name,
              biodata.familyInfo.mother.occupation,
              biodata.familyInfo.mother.designation,
              biodata.familyInfo.mother.designatedArea,
            ].filter(Boolean).join('\n'),
            true
          )}
          
          {biodata.familyInfo?.siblings?.map((sibling, index) => {
            if (!sibling.name) return null;
            const siblingInfo = [
              sibling.name,
              sibling.occupation,
              sibling.designation,
              sibling.designatedArea,
            ].filter(Boolean).join('\n');
            return renderField(
              sibling.relation === 'Sister' ? "Sister's Name" : 
              sibling.relation === 'Brother' ? "Brother's Name" : 
              sibling.relation === 'Brother-in-law' ? "Brother-in-law" :
              sibling.relation === 'Sister-in-law' ? "Sister-in-law" : sibling.relation,
              siblingInfo,
              true
            );
          })}
          
          {biodata.personalInfo?.presentAddress && renderField(
            'Present Address',
            formatAddress(biodata.personalInfo.presentAddress)
          )}
          
          {biodata.personalInfo?.permanentAddress && renderField(
            'Permanent Address',
            formatAddress(biodata.personalInfo.permanentAddress)
          )}
          
          {biodata.personalInfo?.dateOfBirth && renderField(
            'Date of birth',
            formatDate(biodata.personalInfo.dateOfBirth)
          )}
          
          {renderField('Religion', biodata.personalInfo?.religion)}
          {renderField('Marital Status', biodata.personalInfo?.maritalStatus)}
          {renderField('Blood Group', biodata.personalInfo?.bloodGroup)}
          {renderField('Height', biodata.personalInfo?.height)}
          {renderField('Weight', biodata.personalInfo?.weight)}
          {renderField('Nationality', biodata.personalInfo?.nationality)}
          {renderField('Contact Number', biodata.personalInfo?.contactNumber)}
          {renderField('Email', biodata.personalInfo?.email)}
        </div>
      </section>

      {/* Educational Qualification - Modern Card Layout */}
      {biodata.educationInfo && biodata.educationInfo.length > 0 && (
        <section className={styles.section}>
          <div className={styles.field}>
            <span className={styles.number}>{itemNumber++}.</span>
            <span className={styles.label}>Educational Qualification:</span>
          </div>
          
          <div className={styles.educationSection}>
            {/* Modern Card Layout for Screen */}
            <div className={styles.educationGrid}>
              {biodata.educationInfo
                .filter(edu => edu.degree || edu.subject || edu.institution) // Only show entries with data
                .map((edu, index) => (
                <div key={index} className={styles.educationCard}>
                  <div className={styles.educationHeader}>
                    <span className={styles.educationNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className={styles.educationDegree}>
                      {edu.degree || 'Degree'}
                    </h4>
                  </div>
                  
                  <div className={styles.educationDetails}>
                    <div className={styles.educationDetail}>
                      <span className={styles.label}>Group/Subject</span>
                      <span className={`${styles.value} ${!(edu.subject || edu.group) ? styles.empty : ''}`}>
                        {edu.subject || edu.group || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className={styles.educationDetail}>
                      <span className={styles.label}>Institute</span>
                      <span className={`${styles.value} ${!edu.institution ? styles.empty : ''}`}>
                        {edu.institution || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className={styles.educationDetail}>
                      <span className={styles.label}>GPA/CGPA</span>
                      <span className={`${styles.value} ${!(edu.result || edu.gpa || edu.cgpa) ? styles.empty : ''}`}>
                        {edu.result || edu.gpa || edu.cgpa || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className={styles.educationDetail}>
                      <span className={styles.label}>Passing Year</span>
                      <span className={`${styles.value} ${!edu.passingYear ? styles.empty : ''}`}>
                        {edu.passingYear || 'Not specified'}
                      </span>
                    </div>
                    
                    <div className={styles.educationDetail} style={{gridColumn: '1 / -1'}}>
                      <span className={styles.label}>Board/University</span>
                      <span className={`${styles.value} ${!(edu.board || edu.university) ? styles.empty : ''}`}>
                        {edu.board || edu.university || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Clean Table for Print */}
            <table className={styles.educationTablePrint}>
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Examination</th>
                  <th>Group/Subject</th>
                  <th>Institute</th>
                  <th>GPA/CGPA</th>
                  <th>Year</th>
                  <th>Board/University</th>
                </tr>
              </thead>
              <tbody>
                {biodata.educationInfo
                  .filter(edu => edu.degree || edu.subject || edu.institution)
                  .map((edu, index) => (
                  <tr key={index}>
                    <td>{String(index + 1).padStart(2, '0')}</td>
                    <td>{edu.degree || ''}</td>
                    <td>{edu.subject || edu.group || ''}</td>
                    <td>{edu.institution || ''}</td>
                    <td>{edu.result || edu.gpa || edu.cgpa || ''}</td>
                    <td>{edu.passingYear || ''}</td>
                    <td>{edu.board || edu.university || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Professional Information */}
      {(biodata.professionalInfo?.currentPosition || 
        biodata.professionalInfo?.organization || 
        biodata.professionalInfo?.experience) && (
        <section className={styles.section}>
          <div className={styles.infoList}>
            {renderField(
              'Current Position',
              [
                biodata.professionalInfo.currentPosition,
                biodata.professionalInfo.organization,
                biodata.professionalInfo.experience && `Experience: ${biodata.professionalInfo.experience}`,
              ].filter(Boolean).join('\n'),
              true
            )}
          </div>
        </section>
      )}

      {/* Additional Information */}
      {biodata.additionalInfo && (
        <section className={styles.section}>
          <div className={styles.infoList}>
            {biodata.additionalInfo.hobbies && biodata.additionalInfo.hobbies.length > 0 && 
              renderField('Hobbies', biodata.additionalInfo.hobbies.join(', '))}
            {biodata.additionalInfo.skills && biodata.additionalInfo.skills.length > 0 && 
              renderField('Skills', biodata.additionalInfo.skills.join(', '))}
            {biodata.additionalInfo.languages && biodata.additionalInfo.languages.length > 0 && 
              renderField('Languages', biodata.additionalInfo.languages.join(', '))}
          </div>
        </section>
      )}
    </div>
  );
});

BiodataTemplate.displayName = 'BiodataTemplate';

export default BiodataTemplate;
