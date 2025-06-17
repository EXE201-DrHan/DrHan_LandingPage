import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, TokenPayload, findUserById } from './auth';

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const authenticateRequest = async (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'Missing or invalid authorization header', user: null };
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { authenticated: false, error: 'Invalid or expired token', user: null };
  }

  const user = findUserById(decoded.userId);
  if (!user) {
    return { authenticated: false, error: 'User not found', user: null };
  }

  return { authenticated: true, error: null, user };
}; 