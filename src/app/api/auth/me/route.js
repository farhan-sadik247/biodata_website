import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authenticateUser } from '@/lib/auth';

export async function GET(request) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findById(auth.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
