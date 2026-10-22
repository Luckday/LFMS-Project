export type Currency = 'USD' | 'PKR' | 'GBP' | 'AED';

export type LawyerStatus = 'verified' | 'pending' | 'rejected';

export type Language = 'en' | 'ur';

export interface Lawyer {
  id: string;
  name: string;
  title: string;
  firm: string;
  country: string;
  city: string;
  countryCode: string;
  flag: string;
  specializations: string[];
  experienceYears: number;
  consultationFeeUSD: number;
  rating: number;
  reviewsCount: number;
  barCouncil: string;
  barLicenseNumber: string;
  barIssuedDate: string;
  status: LawyerStatus;
  isFeatured: boolean;
  avatar: string;
  bio: string;
  education: string[];
  languages: string[];
  phone: string;
  email: string;
  address: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  winRate: number;
  casesCompleted: number;
  availability: 'Available Today' | 'Next Available: Tomorrow' | 'Booked This Week';
  registeredAt: string;
}

export interface FilterState {
  searchQuery: string;
  country: string;
  city: string;
  specialization: string;
  minExperience: number;
  maxFeeUSD: number;
  sortBy: 'rating' | 'experience' | 'fee-low' | 'fee-high' | 'cases';
  onlyFeatured: boolean;
}

export interface ConsultationBooking {
  id: string;
  lawyerId: string;
  lawyerName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: 'Virtual Video Consultation' | 'In-Office Conference' | 'Written Legal Opinion' | 'Emergency Injunction / Bail';
  preferredDate: string;
  preferredTime: string;
  caseSummary: string;
  urgency: 'Normal' | 'High Priority' | 'Urgent (24h)';
  submittedAt: string;
  status: 'Confirmed' | 'Pending Review';
}
