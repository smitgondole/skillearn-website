export type SkillCategory = 'SPORTS' | 'CREATIVE' | 'DIGITAL' | 'FITNESS';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Teacher';

export interface UserProfile {
  id: string;
  name: string;
  role: 'coach' | 'player' | 'learner' | 'creator';
  primarySkill: string;
  category: SkillCategory;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  location: string; // Pune neighborhood
  distanceKm: number;
  pricePerSession: number; // in INR
  verified: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    skill: boolean;
  };
  bio: string;
  responseTime: string;
  completionRate: number; // e.g. 98%
  positiveRatingPercent: number; // e.g. 97%
  skills: { name: string; level: SkillLevel; progressPercent: number }[];
  achievements: string[];
  certifications: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
  teachingMode: 'In-person' | 'Hybrid' | 'Online';
  experienceYears: number;
  featured?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  sport: string;
  category: SkillCategory;
  rating: number;
  reviewCount: number;
  location: string; // Pune
  address: string;
  distanceKm: number;
  pricePerHour: number;
  availableToday: boolean;
  images: string[];
  amenities: string[];
  courts: {
    id: string;
    name: string;
    surface: string;
    indoor: boolean;
  }[];
  timeSlots: string[];
}

export interface Booking {
  id: string;
  coachId: string;
  coachName: string;
  skillName: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  locationType: 'coach_location' | 'venue' | 'my_location';
  venueName?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  sessionPrice: number;
  venuePrice: number;
  platformFee: number;
  totalPrice: number;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  coachId: string;
  coachName: string;
  skill: string;
  rating: number;
  date: string;
  comment: string;
  breakdown: {
    teaching: number;
    communication: number;
    punctuality: number;
    skill: number;
  };
}

export interface SkillProgressItem {
  id: string;
  skillName: string;
  category: SkillCategory;
  level: SkillLevel;
  progressPercent: number;
  sessionsCompleted: number;
  targetSessions: number;
  syllabus: {
    week: number;
    title: string;
    topics: { name: string; completed: boolean }[];
  }[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
  bookingCard?: {
    skill: string;
    date: string;
    time: string;
    venue: string;
  };
}

export interface ChatThread {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userSkill: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'session' | 'review' | 'skill' | 'booking';
}
