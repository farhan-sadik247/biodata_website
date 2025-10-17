import mongoose from 'mongoose';

const BiodataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    personalInfo: {
      fullName: { type: String, required: true },
      latestDegree: { type: String },
      dateOfBirth: { type: Date },
      height: { type: String },
      weight: { type: String },
      bloodGroup: { type: String },
      nationality: { type: String },
      religion: { type: String },
      maritalStatus: { type: String },
      contactNumber: { type: String },
      email: { type: String },
      presentAddress: {
        division: { type: String },
        district: { type: String },
        upazila: { type: String },
        postOffice: { type: String },
        village: { type: String },
        fullAddress: { type: String },
      },
      permanentAddress: {
        division: { type: String },
        district: { type: String },
        upazila: { type: String },
        postOffice: { type: String },
        village: { type: String },
        fullAddress: { type: String },
      },
    },
    familyInfo: {
      father: {
        name: { type: String },
        occupation: { type: String },
        designation: { type: String },
        designatedArea: { type: String },
      },
      mother: {
        name: { type: String },
        occupation: { type: String },
        designation: { type: String },
        designatedArea: { type: String },
      },
      siblings: [
        {
          name: { type: String },
          relation: { type: String, enum: ['Brother', 'Sister', 'Brother-in-law', 'Sister-in-law'] },
          occupation: { type: String },
          designation: { type: String },
          designatedArea: { type: String },
        },
      ],
    },
    educationInfo: [
      {
        degree: { type: String },
        subject: { type: String },
        group: { type: String },
        institution: { type: String },
        passingYear: { type: String },
        result: { type: String },
        gpa: { type: String },
        cgpa: { type: String },
        board: { type: String },
        university: { type: String },
      },
    ],
    professionalInfo: {
      currentPosition: { type: String },
      organization: { type: String },
      experience: { type: String },
    },
    additionalInfo: {
      hobbies: [{ type: String }],
      skills: [{ type: String }],
      languages: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
BiodataSchema.index({ userId: 1, createdAt: -1 });

// Prevent model recompilation during hot reload
export default mongoose.models.Biodata || mongoose.model('Biodata', BiodataSchema);
