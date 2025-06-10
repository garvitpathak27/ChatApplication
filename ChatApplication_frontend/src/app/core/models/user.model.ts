export interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  profilePic?: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  displayName: string;
  profilePic?: string;
}
