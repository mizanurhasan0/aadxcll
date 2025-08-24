import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Package from '@/models/Package';
import { verifyToken } from '@/lib/auth';

// GET all packages (public)
export async function GET() {
    try {
        await connectDB();

        const packages = await Package.find({ active: true })
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(packages);
    } catch (error) {
        console.error('Get packages error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST new package (admin only)
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

        const { name, subtitle, price, currency, popular, features, description, order } = await request.json();

        // Validation
        if (!name || !subtitle || !price || !features || features.length === 0) {
            return NextResponse.json(
                { error: 'Name, subtitle, price, and features are required' },
                { status: 400 }
            );
        }

        const packageData = new Package({
            name,
            subtitle,
            price: parseFloat(price),
            currency: currency || 'USD',
            popular: popular || false,
            features,
            description: description || '',
            order: order || 0,
            active: true
        });

        await packageData.save();

        return NextResponse.json(
            { message: 'Package created successfully', package: packageData },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create package error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
