import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Biodata from '@/models/Biodata';
import { authenticateUser } from '@/lib/auth';

// GET all bio-datas for logged-in user
export async function GET(request) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    // Connect to database
    await connectDB();

    // Get all bio-datas for user
    const biodatas = await Biodata.find({ userId: auth.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: biodatas.length,
      biodatas,
    });
  } catch (error) {
    console.error('Get bio-datas error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new bio-data
export async function POST(request) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const data = await request.json();

    // Connect to database
    await connectDB();

    // Create bio-data
    const biodata = await Biodata.create({
      userId: auth.userId,
      ...data,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Bio-data created successfully',
        biodata,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create bio-data error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
