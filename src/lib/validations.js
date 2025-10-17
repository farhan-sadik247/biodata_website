import { z } from 'zod';

// Authentication Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Personal Info Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  latestDegree: z.string().optional(),
  dateOfBirth: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodGroup: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  maritalStatus: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
});

// Family Info Schema
export const familyInfoSchema = z.object({
  father: z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    designation: z.string().optional(),
    designatedArea: z.string().optional(),
  }).optional(),
  mother: z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    designation: z.string().optional(),
    designatedArea: z.string().optional(),
  }).optional(),
  siblings: z.array(z.object({
    name: z.string().optional(),
    relation: z.enum(['Brother', 'Sister']).optional(),
    occupation: z.string().optional(),
    designation: z.string().optional(),
    designatedArea: z.string().optional(),
  })).optional(),
});

// Education Info Schema
export const educationInfoSchema = z.object({
  educationInfo: z.array(z.object({
    degree: z.string().optional(),
    institution: z.string().optional(),
    passingYear: z.string().optional(),
    result: z.string().optional(),
  })).optional(),
});

// Professional Info Schema
export const professionalInfoSchema = z.object({
  currentPosition: z.string().optional(),
  organization: z.string().optional(),
  experience: z.string().optional(),
});

// Additional Info Schema
export const additionalInfoSchema = z.object({
  hobbies: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
});

// Complete Bio-Data Schema
export const biodataSchema = z.object({
  personalInfo: personalInfoSchema,
  familyInfo: familyInfoSchema,
  educationInfo: z.array(z.object({
    degree: z.string().optional(),
    institution: z.string().optional(),
    passingYear: z.string().optional(),
    result: z.string().optional(),
  })).optional(),
  professionalInfo: professionalInfoSchema,
  additionalInfo: additionalInfoSchema,
});
