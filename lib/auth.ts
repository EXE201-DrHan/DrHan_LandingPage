// User interface
export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  createdAt: Date;
}

// In-memory user store (In production, this would be a database)
export const users: User[] = [];

// Helper function to find user by email
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// Helper function to find user by ID
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper function to add a new user
export const addUser = (user: User): void => {
  users.push(user);
};

// Helper function to get user without password
export const getUserWithoutPassword = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// JWT Secret - In production, this should be in environment variables
export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Token payload interface
export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
} 