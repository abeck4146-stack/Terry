export interface UserProfile {
  id: 'grandma' | 'alex';
  name: string;
  welcomeGreeting: string;
  avatarUrl: string;
  theme: 'cool' | 'warm';
  dateStr: string;
  vitalityScore: number;
  restingHr: number;
  bp: string;
  sleepDuration: string;
  sleepDiff: string;
}

export interface Medication {
  id: string;
  name: string;
  time: string;
  notes: string;
  dosage: string;
  iconType: 'pill' | 'medication' | 'supplement';
  status: 'pending' | 'taken';
  takenTime?: string;
}

export interface FamilyMoment {
  id: string;
  author: string;
  avatarUrl: string;
  timeAgo: string;
  type: 'check-in' | 'activity';
  steps?: number;
  mood?: string;
  text: string;
  image?: string;
  cheeredByMe: boolean;
  cheerCount: number;
  cheeredByNames: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  exercise?: {
    title: string;
    duration: string;
    type: string;
    imageUrl: string;
  };
}
