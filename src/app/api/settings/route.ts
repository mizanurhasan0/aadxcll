import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { verifyToken } from '@/lib/auth';

// GET settings
export async function GET() {
    try {
        await connectDB();

        let settings = await Settings.findOne();

        // If no settings exist, create default ones
        if (!settings) {
            settings = new Settings();
            await settings.save();
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update settings (admin only)
export async function PUT(request: NextRequest) {
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

        const updateData = await request.json();

        let settings = await Settings.findOne();

        // If no settings exist, create new ones
        if (!settings) {
            settings = new Settings(updateData);
        } else {
            // Update existing settings
            Object.assign(settings, updateData);
        }

        await settings.save();

        return NextResponse.json({
            message: 'Settings updated successfully',
            settings
        });

    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
