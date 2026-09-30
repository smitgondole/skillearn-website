import { UserProfile, Venue, Booking, ReviewItem, SkillProgressItem, ChatThread, AppNotification } from '../types';

export const INITIAL_USER = {
  name: 'Swetank Kulkarni',
  greetingName: 'Swetank',
  role: 'Learner & Peer Teacher',
  location: 'Kothrud, Pune',
  level: 'INTERMEDIATE',
  currentXp: 420,
  maxXp: 500,
  streakDays: 12,
  totalSessions: 24,
  skillsLearningCount: 4,
  skillsTeachingCount: 2,
};

export const POPULAR_SKILLS = [
  { id: 'badminton', name: 'Badminton', category: 'SPORTS', icon: '🏸', teachersCount: 48, avgPrice: 280, rating: 4.9, popular: true },
  { id: 'cricket', name: 'Cricket Nets & Bowling', category: 'SPORTS', icon: '🏏', teachersCount: 32, avgPrice: 320, rating: 4.8, popular: true },
  { id: 'football', name: 'Football (Striker & Defense)', category: 'SPORTS', icon: '⚽', teachersCount: 29, avgPrice: 250, rating: 4.7, popular: true },
  { id: 'tennis', name: 'Lawn Tennis', category: 'SPORTS', icon: '🎾', teachersCount: 21, avgPrice: 450, rating: 4.9, popular: true },
  { id: 'basketball', name: 'Basketball Fundamentals', category: 'SPORTS', icon: '🏀', teachersCount: 18, avgPrice: 300, rating: 4.8 },
  { id: 'pickleball', name: 'Pickleball', category: 'SPORTS', icon: '🏓', teachersCount: 16, avgPrice: 350, rating: 4.8 },
  { id: 'swimming', name: 'Freestyle Swimming', category: 'SPORTS', icon: '🏊‍♂️', teachersCount: 14, avgPrice: 400, rating: 4.9 },
  
  { id: 'photography', name: 'Street & Portrait Photography', category: 'CREATIVE', icon: '📷', teachersCount: 36, avgPrice: 400, rating: 4.9, popular: true },
  { id: 'videography', name: 'Cinematic Videography', category: 'CREATIVE', icon: '🎥', teachersCount: 24, avgPrice: 450, rating: 4.9 },
  { id: 'guitar', name: 'Acoustic & Electric Guitar', category: 'CREATIVE', icon: '🎸', teachersCount: 42, avgPrice: 350, rating: 4.9, popular: true },
  { id: 'filmmaking', name: 'Short Film Production', category: 'CREATIVE', icon: '🎬', teachersCount: 12, avgPrice: 500, rating: 4.7 },
  { id: 'music_production', name: 'Music Production (Ableton)', category: 'CREATIVE', icon: '🎧', teachersCount: 19, avgPrice: 450, rating: 4.8 },

  { id: 'video_editing', name: 'Premiere Pro & DaVinci Resolve', category: 'DIGITAL', icon: '✂️', teachersCount: 41, avgPrice: 350, rating: 4.8, popular: true },
  { id: 'social_media', name: 'Organic Growth & Reels', category: 'DIGITAL', icon: '📱', teachersCount: 38, avgPrice: 300, rating: 4.8 },
  { id: 'ai_coding', name: 'Modern Full-Stack & Python AI', category: 'DIGITAL', icon: '💻', teachersCount: 34, avgPrice: 500, rating: 4.9, popular: true },
  { id: 'ui_ux_design', name: 'Figma UI/UX & Systems', category: 'DIGITAL', icon: '🎨', teachersCount: 27, avgPrice: 420, rating: 4.9 },
  
  { id: 'calisthenics', name: 'Calisthenics & Bodyweight', category: 'FITNESS', icon: '💪', teachersCount: 25, avgPrice: 300, rating: 4.8 },
  { id: 'yoga', name: 'Hatha & Vinyasa Yoga', category: 'FITNESS', icon: '🧘‍♀️', teachersCount: 33, avgPrice: 280, rating: 4.9, popular: true },
  { id: 'marathon_running', name: 'Distance Running & Pacing', category: 'FITNESS', icon: '🏃‍♂️', teachersCount: 19, avgPrice: 220, rating: 4.8 }
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'aditya-sharma',
    name: 'Aditya Sharma',
    role: 'coach',
    primarySkill: 'Badminton Coach',
    category: 'SPORTS',
    title: 'Former Maharashtra State Ranked Player · 127 Verified Sessions',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    rating: 4.9,
    reviewCount: 47,
    sessionsCompleted: 127,
    location: 'Kothrud, Pune',
    distanceKm: 2.1,
    pricePerSession: 250,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'Specializing in explosive footwork, jump smashes, and tournament game psychology. I have coached beginners into university captains and casual weekend warriors into tournament finalists.',
    responseTime: 'Usually within 10 minutes',
    completionRate: 98,
    positiveRatingPercent: 96,
    skills: [
      { name: 'Smash & Deceptive Net Play', level: 'Expert', progressPercent: 96 },
      { name: 'Footwork & Stamina Drills', level: 'Advanced', progressPercent: 92 },
      { name: 'Singles Tactical Strategy', level: 'Advanced', progressPercent: 88 }
    ],
    achievements: ['Maharashtra U-19 Quarterfinalist', 'Certified BAI Level 1 Coach', 'Best Peer Mentor 2025 Pune'],
    certifications: ['Badminton Association of India Level 1', 'Sports Biomechanics Certification'],
    availability: {
      days: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
      timeSlots: ['06:00 AM', '07:00 AM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
    },
    teachingMode: 'In-person',
    experienceYears: 6,
    featured: true
  },
  {
    id: 'sneha-patil',
    name: 'Sneha Patil',
    role: 'coach',
    primarySkill: 'Street & Portrait Photography',
    category: 'CREATIVE',
    title: 'Visual Storyteller · National Geographic India Featured Contributor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
    rating: 4.9,
    reviewCount: 52,
    sessionsCompleted: 98,
    location: 'Koregaon Park, Pune',
    distanceKm: 4.8,
    pricePerSession: 400,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'I teach hands-on camera mastery without overwhelming jargon. We walk through Old Pune alleys or sunset spots, deconstructing natural lighting, framing compositions, and shutter discipline.',
    responseTime: 'Usually within 15 minutes',
    completionRate: 99,
    positiveRatingPercent: 98,
    skills: [
      { name: 'Manual Exposure & Focal Lengths', level: 'Expert', progressPercent: 98 },
      { name: 'Lightroom Color Grading', level: 'Advanced', progressPercent: 90 },
      { name: 'Street Documentary Portraits', level: 'Expert', progressPercent: 95 }
    ],
    achievements: ['Exhibited at Jehangir Art Gallery', 'Shot 14 editorial campaigns', 'Trained 100+ photographers'],
    certifications: ['Diploma in Visual Arts (Symbiosis)', 'Sony Alpha Masterclass Specialist'],
    availability: {
      days: ['Tue', 'Thu', 'Sat', 'Sun'],
      timeSlots: ['07:00 AM', '04:30 PM', '06:00 PM']
    },
    teachingMode: 'Hybrid',
    experienceYears: 5,
    featured: true
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    role: 'coach',
    primarySkill: 'Cricket Bowling & Batting Technique',
    category: 'SPORTS',
    title: 'Ex-DY Patil Club All-Rounder · Turf & Net Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    rating: 4.8,
    reviewCount: 39,
    sessionsCompleted: 114,
    location: 'Baner, Pune',
    distanceKm: 3.4,
    pricePerSession: 300,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'From wrist positioning for in-swing to back-foot punch mechanics. My sessions focus on high-repetition muscle memory, video breakdown of your action, and match-simulation drills.',
    responseTime: 'Usually within 25 minutes',
    completionRate: 97,
    positiveRatingPercent: 94,
    skills: [
      { name: 'Seam & Swing Bowling Mechanics', level: 'Advanced', progressPercent: 94 },
      { name: 'Batting Against Pace', level: 'Advanced', progressPercent: 89 },
      { name: 'Field Placement Game IQ', level: 'Intermediate', progressPercent: 82 }
    ],
    achievements: ['Pune District Senior Division Player', 'MCA Level O Certified'],
    certifications: ['Maharashtra Cricket Coaching Associate'],
    availability: {
      days: ['Mon', 'Tue', 'Thu', 'Sat'],
      timeSlots: ['06:30 AM', '05:30 PM', '07:00 PM']
    },
    teachingMode: 'In-person',
    experienceYears: 7,
    featured: true
  },
  {
    id: 'arjun-deshmukh',
    name: 'Arjun Deshmukh',
    role: 'coach',
    primarySkill: 'Football (Striker & Agility)',
    category: 'SPORTS',
    title: 'Pune Super League Striker · Turf Tactical Trainer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    rating: 4.7,
    reviewCount: 31,
    sessionsCompleted: 86,
    location: 'Viman Nagar, Pune',
    distanceKm: 6.2,
    pricePerSession: 250,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'I help wingers and strikers develop lethal 1v1 dribbling, first-touch control under pressure, and clinical finishing angles. We practice on real turf under floodlights.',
    responseTime: 'Usually within 12 minutes',
    completionRate: 96,
    positiveRatingPercent: 95,
    skills: [
      { name: '1v1 Ball Mastery & Body Feints', level: 'Expert', progressPercent: 93 },
      { name: 'Box Finishing & Volleys', level: 'Advanced', progressPercent: 88 }
    ],
    achievements: ['Top Scorer Pune Youth League 2024', 'AIFF D-License Coach'],
    certifications: ['AIFF Grassroots Coaching License'],
    availability: {
      days: ['Mon', 'Wed', 'Fri', 'Sat'],
      timeSlots: ['06:00 AM', '06:30 PM', '08:00 PM']
    },
    teachingMode: 'In-person',
    experienceYears: 4,
    featured: true
  },
  {
    id: 'meera-shah',
    name: 'Meera Shah',
    role: 'coach',
    primarySkill: 'Acoustic & Fingerstyle Guitar',
    category: 'CREATIVE',
    title: 'Indie Musician & Performer · 8+ Years Songwriting',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    rating: 4.9,
    reviewCount: 64,
    sessionsCompleted: 142,
    location: 'Aundh, Pune',
    distanceKm: 3.8,
    pricePerSession: 350,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'No boring chord sheets you never use! Learn fluid chord transitions, barre chords without finger fatigue, dynamic percussive fingerstyle, and how to accompany yourself singing.',
    responseTime: 'Usually within 8 minutes',
    completionRate: 100,
    positiveRatingPercent: 99,
    skills: [
      { name: 'Fingerstyle Percussive Grooves', level: 'Expert', progressPercent: 97 },
      { name: 'Barre Chords & Harmonic Transitions', level: 'Expert', progressPercent: 94 },
      { name: 'Ear Training & Song Improvisation', level: 'Advanced', progressPercent: 91 }
    ],
    achievements: ['Trinity College London Grade 8 Classical Guitar', 'Performed at NH7 Weekender (Acoustic Stage)'],
    certifications: ['Trinity Rock & Pop Guitar Grade 8'],
    availability: {
      days: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
      timeSlots: ['04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM']
    },
    teachingMode: 'Hybrid',
    experienceYears: 8,
    featured: true
  },
  {
    id: 'tanvi-kulkarni',
    name: 'Tanvi Kulkarni',
    role: 'coach',
    primarySkill: 'Premiere Pro & Reel Storytelling',
    category: 'DIGITAL',
    title: 'Full-Time Content Editor · Edited 10M+ Organic Views',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    rating: 4.8,
    reviewCount: 28,
    sessionsCompleted: 67,
    location: 'Shivaji Nagar, Pune',
    distanceKm: 1.8,
    pricePerSession: 350,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'Speed up your workflow 5x with sound design, seamless J/L cuts, kinetic typography, and pacing that captures attention in the first 2 seconds.',
    responseTime: 'Usually within 30 minutes',
    completionRate: 98,
    positiveRatingPercent: 97,
    skills: [
      { name: 'Sound Design & Audio Pacing', level: 'Advanced', progressPercent: 92 },
      { name: 'Color Correction & Match Cuts', level: 'Advanced', progressPercent: 88 }
    ],
    achievements: ['Lead video editor for top fintech creator', 'Adobe Certified Professional in Video Design'],
    certifications: ['Adobe Premiere Pro Master Certification'],
    availability: {
      days: ['Tue', 'Thu', 'Sat', 'Sun'],
      timeSlots: ['06:00 PM', '07:30 PM', '09:00 PM']
    },
    teachingMode: 'Online',
    experienceYears: 4
  },
  {
    id: 'vikram-joshi',
    name: 'Vikram Joshi',
    role: 'player',
    primarySkill: 'Badminton Doubles Partner',
    category: 'SPORTS',
    title: 'Intermediate Match Player · Looking for Rally Partners',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
    rating: 4.9,
    reviewCount: 19,
    sessionsCompleted: 42,
    location: 'Kothrud, Pune',
    distanceKm: 1.2,
    pricePerSession: 150,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'Looking for 3-4 players for weekly competitive badminton games at Smash Arena or Deccan Gymkhana. Friendly, high intensity rallies, split-court costs.',
    responseTime: 'Within 5 minutes',
    completionRate: 99,
    positiveRatingPercent: 97,
    skills: [
      { name: 'Fast Flat Rallies', level: 'Intermediate', progressPercent: 80 },
      { name: 'Doubles Rotation', level: 'Intermediate', progressPercent: 78 }
    ],
    achievements: ['Inter-college doubles finalist'],
    certifications: [],
    availability: {
      days: ['Tue', 'Thu', 'Sat', 'Sun'],
      timeSlots: ['06:00 AM', '07:00 PM', '08:00 PM']
    },
    teachingMode: 'In-person',
    experienceYears: 3
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'coach',
    primarySkill: 'Vinyasa Flow & Core Mobility',
    category: 'FITNESS',
    title: 'RYT-500 Yoga Acharya · Posture & Mobility Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    rating: 4.9,
    reviewCount: 45,
    sessionsCompleted: 110,
    location: 'Kalyani Nagar, Pune',
    distanceKm: 5.4,
    pricePerSession: 300,
    verified: { email: true, phone: true, identity: true, skill: true },
    bio: 'Whether you sit at a desk for 9 hours or play competitive squash, tight hips and weak thoracic mobility kill your form. Build durable, pain-free joint range.',
    responseTime: 'Within 20 minutes',
    completionRate: 98,
    positiveRatingPercent: 98,
    skills: [
      { name: 'Spine & Hip Decompression', level: 'Expert', progressPercent: 96 },
      { name: 'Pranayama & Active Recovery', level: 'Advanced', progressPercent: 92 }
    ],
    achievements: ['Yoga Alliance Certified RYT-500', 'Trained 200+ athletes across Pune'],
    certifications: ['RYT-500 International Yoga Alliance'],
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Fri', 'Sun'],
      timeSlots: ['06:30 AM', '07:45 AM', '06:00 PM']
    },
    teachingMode: 'Hybrid',
    experienceYears: 6
  }
];

export const MOCK_VENUES: Venue[] = [
  {
    id: 'smash-arena',
    name: 'Smash Arena',
    sport: 'Badminton Court',
    category: 'SPORTS',
    rating: 4.7,
    reviewCount: 88,
    location: 'Kothrud, Pune',
    address: 'Near MIT College Road, Ideal Colony, Kothrud, Pune 411038',
    distanceKm: 2.3,
    pricePerHour: 400,
    availableToday: true,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'
    ],
    amenities: ['Olympic BWF Mats', 'Changing Room & Showers', 'Drinking Water (RO)', 'Equipment Rental', 'Free Parking', 'Pro Yonex Stringing'],
    courts: [
      { id: 'court-1', name: 'Court 1 (Yonex Pro Mat)', surface: 'BWF Synthetic Wooden Base', indoor: true },
      { id: 'court-2', name: 'Court 2 (Yonex Pro Mat)', surface: 'BWF Synthetic Wooden Base', indoor: true },
      { id: 'court-3', name: 'Court 3 (Warmup & Drills)', surface: 'Synthetic Mat', indoor: true }
    ],
    timeSlots: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM']
  },
  {
    id: 'ace-turf-baner',
    name: 'ACE Football & Cricket Turf',
    sport: 'Multi-Sport Turf',
    category: 'SPORTS',
    rating: 4.8,
    reviewCount: 112,
    location: 'Baner, Pune',
    address: 'Survey 48/2, Pancard Club Road, Baner, Pune 411045',
    distanceKm: 3.9,
    pricePerHour: 1100,
    availableToday: true,
    images: [
      'https://images.unsplash.com/photo-1529900241451-b8449c4d9aa2?w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80'
    ],
    amenities: ['FIFA Quality Pro Astroturf', 'Night Floodlights 2000W', 'Dugout Seating', 'Bibs & Match Balls Provided', 'Cafeteria & Juice Bar'],
    courts: [
      { id: 'turf-a', name: 'Turf Alpha (6v6 Football / Box Cricket)', surface: 'FIFA Grade 50mm Rubber Infill', indoor: false },
      { id: 'turf-b', name: 'Turf Beta (5v5 Fast Football)', surface: 'Synthetic Grass', indoor: false }
    ],
    timeSlots: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM']
  },
  {
    id: 'deccan-tennis-club',
    name: 'Deccan Lawn Tennis & Pickleball Hub',
    sport: 'Tennis & Pickleball',
    category: 'SPORTS',
    rating: 4.9,
    reviewCount: 76,
    location: 'Deccan Gymkhana, Pune',
    address: 'Prabhat Road, Deccan Gymkhana, Pune 411004',
    distanceKm: 1.9,
    pricePerHour: 550,
    availableToday: true,
    images: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80'
    ],
    amenities: ['Clay & Hard Courts', 'Ball Machine Rental', 'Floodlights', 'Coach Lounge', 'Locker Facility'],
    courts: [
      { id: 'court-center', name: 'Center Hard Court', surface: 'DecoTurf Acrylic', indoor: false },
      { id: 'court-clay', name: 'Red Clay Court', surface: 'Crushed Brick Clay', indoor: false },
      { id: 'court-pickle', name: 'Dedicated Pickleball Court', surface: 'Cushioned Acrylic', indoor: false }
    ],
    timeSlots: ['06:00 AM', '07:00 AM', '05:00 PM', '06:30 PM', '08:00 PM']
  },
  {
    id: 'phoenix-basketball-arena',
    name: 'Phoenix Indoor Basketball Arena',
    sport: 'Basketball Court',
    category: 'SPORTS',
    rating: 4.7,
    reviewCount: 64,
    location: 'Viman Nagar, Pune',
    address: 'Near Symbiosis Campus, Viman Nagar, Pune 411014',
    distanceKm: 6.8,
    pricePerHour: 600,
    availableToday: true,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'
    ],
    amenities: ['Maple Wood Spring Court', 'Hydraulic Breakaway Rims', 'Electronic Shot Clocks', 'Air Conditioned Spectator Stand'],
    courts: [
      { id: 'full-court', name: 'Full FIBA Court', surface: 'North American Maple Wood', indoor: true },
      { id: 'half-court', name: 'Half Court (3x3 Drills)', surface: 'Hardwood', indoor: true }
    ],
    timeSlots: ['06:00 AM', '05:00 PM', '07:00 PM', '08:30 PM']
  },
  {
    id: 'koregaon-movement-studio',
    name: 'The Flow Movement & Sound Studio',
    sport: 'Movement & Music',
    category: 'CREATIVE',
    rating: 4.9,
    reviewCount: 58,
    location: 'Koregaon Park, Pune',
    address: 'Lane 7, South Main Road, Koregaon Park, Pune 411001',
    distanceKm: 4.9,
    pricePerHour: 500,
    availableToday: true,
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
    ],
    amenities: ['Acoustic Soundproofing', 'Full Wall Mirrors', 'Yamaha PA & Bluetooth Rig', 'Yoga Props & Mats', 'Tea Lounge'],
    courts: [
      { id: 'studio-a', name: 'Main Movement Hall', surface: 'Sprung Oak Flooring', indoor: true },
      { id: 'studio-b', name: 'Jam & Recording Pod', surface: 'Acoustic Carpet & Isolation', indoor: true }
    ],
    timeSlots: ['08:00 AM', '11:00 AM', '04:00 PM', '06:00 PM', '08:00 PM']
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    coachId: 'aditya-sharma',
    coachName: 'Aditya Sharma',
    skillName: 'Badminton Drills & Jump Smash Technique',
    date: 'Today, 29 September',
    timeSlot: '6:00 PM',
    durationMinutes: 60,
    locationType: 'venue',
    venueName: 'Smash Arena (Court 1)',
    status: 'confirmed',
    sessionPrice: 250,
    venuePrice: 200,
    platformFee: 20,
    totalPrice: 470,
    createdAt: '2026-09-28'
  },
  {
    id: 'bk-102',
    coachId: 'sneha-patil',
    coachName: 'Sneha Patil',
    skillName: 'Low-Light Street Framing Walk',
    date: '3 Oct 2026',
    timeSlot: '5:30 PM',
    durationMinutes: 90,
    locationType: 'coach_location',
    venueName: 'Koregaon Park Heritage Lane',
    status: 'confirmed',
    sessionPrice: 400,
    venuePrice: 0,
    platformFee: 20,
    totalPrice: 420,
    createdAt: '2026-09-27'
  },
  {
    id: 'bk-100',
    coachId: 'rohan-mehta',
    coachName: 'Rohan Mehta',
    skillName: 'Pace Bowling Action Analysis',
    date: '24 Sep 2026',
    timeSlot: '6:00 PM',
    durationMinutes: 60,
    locationType: 'venue',
    venueName: 'ACE Sports Turf (Net 2)',
    status: 'completed',
    sessionPrice: 300,
    venuePrice: 150,
    platformFee: 20,
    totalPrice: 470,
    createdAt: '2026-09-20'
  }
];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Siddharth Deshpande',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
    coachId: 'aditya-sharma',
    coachName: 'Aditya Sharma',
    skill: 'Badminton',
    rating: 5,
    date: '2 days ago',
    comment: 'Aditya completely reworked my rear-court jump footwork in 60 minutes. Instead of rushing, he showed me the split-second delay bounce. My smash power doubled without straining my shoulder!',
    breakdown: { teaching: 5, communication: 5, punctuality: 5, skill: 5 }
  },
  {
    id: 'rev-2',
    authorName: 'Rhea Kadam',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    coachId: 'sneha-patil',
    coachName: 'Sneha Patil',
    skill: 'Photography',
    rating: 5,
    date: '1 week ago',
    comment: 'Sneha is brilliant at demystifying manual camera settings. In just two evening sessions in KP, I stopped shooting auto and took portraits with depth I thought only pros could achieve.',
    breakdown: { teaching: 5, communication: 5, punctuality: 4.8, skill: 5 }
  },
  {
    id: 'rev-3',
    authorName: 'Nikhil Ranade',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&q=80',
    coachId: 'rohan-mehta',
    coachName: 'Rohan Mehta',
    skill: 'Cricket',
    rating: 4.8,
    date: '3 weeks ago',
    comment: 'Rohan spotted my wrist collapse on the out-swinger immediately. His drills at ACE turf are tough but super rewarding. Felt like professional club coaching.',
    breakdown: { teaching: 4.8, communication: 5, punctuality: 5, skill: 4.9 }
  },
  {
    id: 'rev-4',
    authorName: 'Pooja Varma',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
    coachId: 'meera-shah',
    coachName: 'Meera Shah',
    skill: 'Guitar',
    rating: 5,
    date: '1 month ago',
    comment: 'I spent 6 months struggling with the F barre chord on YouTube. Meera adjusted my elbow pivot and thumb pressure behind the neck — unlocked it in 15 minutes!',
    breakdown: { teaching: 5, communication: 5, punctuality: 5, skill: 5 }
  }
];

export const MOCK_PROGRESS_LIST: SkillProgressItem[] = [
  {
    id: 'sp-badminton',
    skillName: 'Badminton',
    category: 'SPORTS',
    level: 'Intermediate',
    progressPercent: 78,
    sessionsCompleted: 8,
    targetSessions: 12,
    syllabus: [
      {
        week: 1,
        title: 'Foundation & Stance',
        topics: [
          { name: 'V-Grip & Backhand thumb grip transition', completed: true },
          { name: 'Base return position & split-step bounce', completed: true }
        ]
      },
      {
        week: 2,
        title: 'Overhead Strokes & Clears',
        topics: [
          { name: 'Forehand high clear with full rotation', completed: true },
          { name: 'Backhand recovery drop shot', completed: true }
        ]
      },
      {
        week: 3,
        title: 'Service & Net Play',
        topics: [
          { name: 'Low tumble serve over tape', completed: true },
          { name: 'Hairpin net kill reaction', completed: true }
        ]
      },
      {
        week: 4,
        title: 'Power Smash & Tournament Footwork',
        topics: [
          { name: 'Scissors-jump steep smash down the line', completed: false },
          { name: 'Scramble diagonal court recovery', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sp-video-editing',
    skillName: 'Video Editing',
    category: 'DIGITAL',
    level: 'Intermediate',
    progressPercent: 52,
    sessionsCompleted: 5,
    targetSessions: 10,
    syllabus: [
      {
        week: 1,
        title: 'Workflow Setup & Pacing',
        topics: [
          { name: 'Shortcut keystroke mastery & proxy setup', completed: true },
          { name: 'Pacing on music beat & dynamic cuts', completed: true }
        ]
      },
      {
        week: 2,
        title: 'Sound Design & Layering',
        topics: [
          { name: 'Layering whooshes, risers, and room tone', completed: true },
          { name: 'Dialogue compression & EQ sweetening', completed: false }
        ]
      },
      {
        week: 3,
        title: 'Color Grading & Match',
        topics: [
          { name: 'Log conversion with CST in DaVinci', completed: false },
          { name: 'Skin tone isolation using qualifiers', completed: false }
        ]
      },
      {
        week: 4,
        title: 'Viral Reel Packaging',
        topics: [
          { name: 'Kinetic subtitle animations', completed: false },
          { name: 'Export settings for YouTube & Instagram', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sp-photography',
    skillName: 'Photography',
    category: 'CREATIVE',
    level: 'Intermediate',
    progressPercent: 64,
    sessionsCompleted: 6,
    targetSessions: 10,
    syllabus: [
      {
        week: 1,
        title: 'Exposure Triangle Decoupled',
        topics: [
          { name: 'Aperture depth vs shutter motion freeze', completed: true },
          { name: 'Native ISO grain vs digital noise floor', completed: true }
        ]
      },
      {
        week: 2,
        title: 'Natural Lighting & Framing',
        topics: [
          { name: 'Golden hour backlight & rim separation', completed: true },
          { name: 'Leading lines & negative space rules', completed: true }
        ]
      },
      {
        week: 3,
        title: 'Street Interaction & Speed',
        topics: [
          { name: 'Zone focusing for candid street frames', completed: false },
          { name: 'Subject engagement and street ethics', completed: true }
        ]
      },
      {
        week: 4,
        title: 'Raw Grading & Print',
        topics: [
          { name: 'Tone curve contrast shaping', completed: false },
          { name: 'Curating a cohesive 10-shot portfolio', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sp-football',
    skillName: 'Football',
    category: 'SPORTS',
    level: 'Beginner',
    progressPercent: 31,
    sessionsCompleted: 3,
    targetSessions: 10,
    syllabus: [
      {
        week: 1,
        title: 'Ball Control & First Touch',
        topics: [
          { name: 'Cushioned first touch with inside of boot', completed: true },
          { name: 'Body shape when receiving on the turn', completed: true }
        ]
      },
      {
        week: 2,
        title: 'Passing Weight & Vision',
        topics: [
          { name: 'Driven ground pass over 20 yards', completed: false },
          { name: 'Wall pass (one-two) in tight spaces', completed: false }
        ]
      },
      {
        week: 3,
        title: 'Dribbling & 1v1 Feints',
        topics: [
          { name: 'Body drop & outside chop', completed: false },
          { name: 'Shielding ball with low center of gravity', completed: false }
        ]
      },
      {
        week: 4,
        title: 'Striking & Volleys',
        topics: [
          { name: 'Laces drive through center of ball', completed: false },
          { name: 'Far post curling finesse shot', completed: false }
        ]
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Session Today',
    description: 'Your badminton session with Aditya Sharma at Smash Arena begins in 2 hours (6:00 PM).',
    time: '2 hours ago',
    read: false,
    type: 'session'
  },
  {
    id: 'notif-2',
    title: 'New 5-Star Review Received',
    description: 'Siddharth left a detailed review on your peer rally session: "Great court movement!"',
    time: 'Yesterday',
    read: false,
    type: 'review'
  },
  {
    id: 'notif-3',
    title: 'Skill Milestone Achieved',
    description: 'You completed Week 3 of Badminton! Intermediate mastery reached 78%.',
    time: '3 days ago',
    read: true,
    type: 'skill'
  },
  {
    id: 'notif-4',
    title: 'Booking Confirmed',
    description: 'Sneha Patil accepted your Street Photography walk for Oct 3 in Koregaon Park.',
    time: '4 days ago',
    read: true,
    type: 'booking'
  }
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-aditya',
    userId: 'aditya-sharma',
    userName: 'Aditya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    userSkill: 'Badminton Coach',
    lastMessage: 'See you today at 6 PM! I have booked Court 1 with tournament Yonex feather shuttles.',
    lastMessageTime: '4:15 PM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'aditya-sharma',
        senderName: 'Aditya Sharma',
        text: 'Hey Swetank! Reviewed your last video clips. Your elbow drop during the jump smash is costing you 20% steepness.',
        timestamp: 'Yesterday 3:30 PM',
        isSelf: false
      },
      {
        id: 'm2',
        senderId: 'swetank',
        senderName: 'Swetank Kulkarni',
        text: 'Hey Aditya! Yes, that makes sense. Looking forward to drilling the scissor kick and high contact point today.',
        timestamp: 'Yesterday 4:10 PM',
        isSelf: true
      },
      {
        id: 'm3',
        senderId: 'aditya-sharma',
        senderName: 'Aditya Sharma',
        text: 'See you today at 6 PM! I have booked Court 1 with tournament Yonex feather shuttles.',
        timestamp: 'Today 4:15 PM',
        isSelf: false,
        bookingCard: {
          skill: 'Badminton Jump Smash Technique',
          date: 'Today, 29 September',
          time: '6:00 PM – 7:00 PM',
          venue: 'Smash Arena (Court 1), Kothrud'
        }
      }
    ]
  },
  {
    id: 'chat-sneha',
    userId: 'sneha-patil',
    userName: 'Sneha Patil',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80',
    userSkill: 'Photography Mentor',
    lastMessage: 'Can we move the session to 5:00 PM so we catch the golden hour light through the banyan trees in KP?',
    lastMessageTime: '11:20 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'sm1',
        senderId: 'sneha-patil',
        senderName: 'Sneha Patil',
        text: 'Hey Swetank! Excited for the Saturday portrait walk.',
        timestamp: 'Yesterday 7:00 PM',
        isSelf: false
      },
      {
        id: 'sm2',
        senderId: 'sneha-patil',
        senderName: 'Sneha Patil',
        text: 'Can we move the session to 5:00 PM so we catch the golden hour light through the banyan trees in KP?',
        timestamp: '11:20 AM',
        isSelf: false
      }
    ]
  },
  {
    id: 'chat-rohan',
    userId: 'rohan-mehta',
    userName: 'Rohan Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    userSkill: 'Cricket Bowling Specialist',
    lastMessage: 'Thanks for the intense net session! That seam presentation on the 5th ball was textbook.',
    lastMessageTime: 'Sep 24',
    unreadCount: 0,
    messages: [
      {
        id: 'rm1',
        senderId: 'rohan-mehta',
        senderName: 'Rohan Mehta',
        text: 'Thanks for the intense net session! That seam presentation on the 5th ball was textbook.',
        timestamp: 'Sep 24, 7:15 PM',
        isSelf: false
      },
      {
        id: 'rm2',
        senderId: 'swetank',
        senderName: 'Swetank Kulkarni',
        text: 'Felt great Rohan. Working on keeping my non-bowling arm tucked in until release.',
        timestamp: 'Sep 24, 7:45 PM',
        isSelf: true
      }
    ]
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'CHOOSE A SKILL',
    desc: 'Browse 500+ skills across sports, creative crafts, digital production, and fitness. Filter by your level and city neighborhood.',
    highlight: 'Sports, Creative, Digital, Fitness'
  },
  {
    step: '02',
    title: 'FIND SOMEONE',
    desc: 'Skip generic video courses. Connect with vetted peer teachers, certified coaches, and sparring players near you in Pune.',
    highlight: 'Verified credentials & honest reviews'
  },
  {
    step: '03',
    title: 'BOOK A SESSION',
    desc: 'Reserve court time at premier arenas or meet at coach studios. Real-time availability, clear split pricing, zero hidden fees.',
    highlight: 'Courts & 1-on-1 coaching synced'
  },
  {
    step: '04',
    title: 'LEARN & GROW',
    desc: 'Follow a weekly milestone syllabus, track your XP progression from beginner to expert, and eventually teach someone else.',
    highlight: 'Turn learner into teacher'
  }
];
