import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { addUser, findUserByEmail, getUserWithoutPassword, User } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword, fullName, dateOfBirth, gender } = body;

    // Validation
    if (!email || !password || !confirmPassword || !fullName || !dateOfBirth || !gender) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Validate date of birth
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date of birth' },
        { status: 400 }
      );
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other', 'prefer-not-to-say'];
    if (!validGenders.includes(gender.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid gender selection' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      fullName,
      dateOfBirth: birthDate,
      gender: gender.toLowerCase(),
      createdAt: new Date()
    };

    addUser(newUser);

    // Return success response (don't include password)
    const userWithoutPassword = getUserWithoutPassword(newUser);
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 