import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middleware';
import { getUserWithoutPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 401 }
      );
    }

    // Return user profile (without password)
    const userProfile = getUserWithoutPassword(authResult.user!);
    
    return NextResponse.json(
      {
        message: 'Profile retrieved successfully',
        user: userProfile
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Profile retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 