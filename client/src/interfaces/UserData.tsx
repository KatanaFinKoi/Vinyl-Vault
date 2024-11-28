export interface UserData {
  id: number;  // Remove the | null
  username: string;  // Remove the | null
  exp?: number;  // Optional expiration time
  iat?: number;  // Optional issued at time
}