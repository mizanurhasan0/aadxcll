import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { verifyToken } from '@/lib/auth';

// GET all team members
export async function GET() {
    try {
        await connectDB();

        const team = await Team.find({ active: true })
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(team);
    } catch (error) {
        console.error('Get team error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST new team member (admin only)
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // Verify admin token
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if (!decoded || decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const { name, position, bio, image, email, linkedin, twitter, github, order } = await request.json();

        // Validation
        if (!name || !position || !bio || !image || !email) {
            return NextResponse.json(
                { error: 'Name, position, bio, image, and email are required' },
                { status: 400 }
            );
        }

        const teamMember = new Team({
            name,
            position,
            bio,
            image,
            email,
            linkedin,
            twitter,
            github,
            order: order || 0,
            active: true
        });

        await teamMember.save();

        return NextResponse.json(
            { message: 'Team member added successfully', teamMember },
            { status: 201 }
        );

    } catch (error) {
        console.error('Add team member error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
