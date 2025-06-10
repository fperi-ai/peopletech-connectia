
export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  EMPLOYEE = 'Employee',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string; // URL or path to avatar
  password?: string; // Only for demo purposes, not for production
  bio?: string;
  skills?: string[];
  teamIds?: string[]; // IDs of teams the user is a member of
  firstLogin?: boolean;
  joinTimestamp?: number; // Timestamp of when the user joined/was created
  roleDescription?: string;
  quote?: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole?: UserRole;
  content: string;
  imageUrl?: string;
  timestamp: number; // Unix timestamp
  reactions: { [emoji: string]: string[] }; // emoji: [userIds]
  comments: Comment[];
  isAiGenerated?: boolean;
  isCorporate?: boolean;
  teamId?: string; // ID of the team this post belongs to, if any
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: number;
  isOfficial?: boolean;
}

export interface Challenge {
  id:string;
  title: string;
  description: string;
  points: number;
  isCompleted?: (user: User) => boolean; // Function to check completion for demo
  progress?: (user: User) => number; // 0-100 for demo
  actionLink?: string;
  icon?: React.ReactNode;
}

export type TeamCategory = 'department' | 'social' | 'project' | 'hobby' | 'general';

export interface Team {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  isPrivate: boolean;
  bannerUrl?: string;
  icon?: string; // emoji or small image
  creatorId: string; // ID of the user who created the team
  category: TeamCategory;
  accentColor?: string; // Optional accent color for team page
}

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  boxCount: number; // Number of text boxes
}

// Gemini API related types
export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
  // other types of chunks can be added here
}

export interface GroundingMetadata {
  webSearchQueries?: string[];
  groundingChunks?: GroundingChunk[];
  searchEntryPoint?: {
    web?: {
      encodedResponse: string;
    }
  }
}