// Demo Request
export interface IDemoRequest {
  _id?: string;
  name: string;
  email: string;
  number?: string;
  company?: string;
  service?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact
export interface IContact {
  _id?: string;
  name: string;
  email: string;
  number?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Project
export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  impact?: string;
  tags?: string[];
  details?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


// Service
export interface IService {
  _id?: string;
  icon: string; // e.g., "bot", "bar-chart", "shopping-cart"
  title: string;
  description: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}


// Visitor
export interface IVisitor {
  _id?: string;
  ip: string;
  location?: string;
  deviceInfo?: string;
  userAgent?: string;
  timestamp?: Date;
}

// Testimonial
export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}


// Newsletter Subscription
export interface INewsletter {
  uuid?: string;
  email: string;
  message?: string;
  createdAt?: Date;
}


// Stories

export interface IStory {
  _id?: string;
  title: string;
  slug: string;
  project: string;
  industry: string;
  thumbnail: string;
  summary: string;
  impact: string[];
  content: string;
  tags: string[];
  publishedAt: Date;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IAnalytics {
  _id?: string;
  ip: string;
  device?: string;
  os?: string;
  browser?: string;
  page: string;
  referrer?: string;
  timestamp: Date;
  location?: string;
  userAgent?: string;
}

export interface IPromotion {
  _id?: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
  isActive: boolean;
  targetPage?: string;
  createdAt?: Date;
  expiresAt?: Date;
}

export interface IOpenPosition {
  _id?: string;
  title: string;
  department: string;
  description?: string;
  location?: string;
  isRemote?: boolean;
  isActive: boolean;
  createdAt?: Date;
}

export interface ICandidateApplication {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  positionApplied: string;
  createdAt?: Date;
}