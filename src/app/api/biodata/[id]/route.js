import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Biodata from '@/models/Biodata';
import { authenticateUser } from '@/lib/auth';

// GET single bio-data by ID
export async function GET(request, { params }) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const { id } = await params;

    // Connect to database
    await connectDB();

    // Find bio-data
    const biodata = await Biodata.findOne({ _id: id, userId: auth.userId });

    if (!biodata) {
      return NextResponse.json(
        { success: false, message: 'Bio-data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      biodata,
    });
  } catch (error) {
    console.error('Get bio-data error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update bio-data by ID
export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const { id } = await params;
    const data = await request.json();

    // Connect to database
    await connectDB();

    // Find and update bio-data
    const biodata = await Biodata.findOneAndUpdate(
      { _id: id, userId: auth.userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!biodata) {
      return NextResponse.json(
        { success: false, message: 'Bio-data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bio-data updated successfully',
      biodata,
    });
  } catch (error) {
    console.error('Update bio-data error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE bio-data by ID
export async function DELETE(request, { params }) {
  try {
    // Authenticate user
    const auth = await authenticateUser(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const { id } = await params;

    // Connect to database
    await connectDB();

    // Find and delete bio-data
    const biodata = await Biodata.findOneAndDelete({ _id: id, userId: auth.userId });

    if (!biodata) {
      return NextResponse.json(
        { success: false, message: 'Bio-data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bio-data deleted successfully',
    });
  } catch (error) {
    console.error('Delete bio-data error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
