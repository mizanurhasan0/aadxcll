import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';
import { verifyToken } from '@/lib/auth';

// PUT update team member (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

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

        if (!decoded || typeof decoded === 'string' || decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const { name, position, bio, image, email, linkedin, twitter, github, order, active } = await request.json();

        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (name) teamMember.name = name;
        if (position) teamMember.position = position;
        if (bio) teamMember.bio = bio;
        if (image) teamMember.image = image;
        if (email) teamMember.email = email;
        if (linkedin !== undefined) teamMember.linkedin = linkedin;
        if (twitter !== undefined) teamMember.twitter = twitter;
        if (github !== undefined) teamMember.github = github;
        if (order !== undefined) teamMember.order = order;
        if (typeof active === 'boolean') teamMember.active = active;

        await teamMember.save();

        return NextResponse.json({
            message: 'Team member updated successfully',
            teamMember
        });

    } catch (error) {
        console.error('Update team member error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE team member (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

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

        if (!decoded || typeof decoded === 'string' || decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const teamMember = await Team.findByIdAndDelete(id);
        if (!teamMember) {
            return NextResponse.json(
                { error: 'Team member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Team member deleted successfully'
        });

    } catch (error) {
        console.error('Delete team member error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
