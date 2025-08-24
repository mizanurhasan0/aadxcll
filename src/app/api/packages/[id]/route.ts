import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Package from '@/models/Package';
import { verifyToken } from '@/lib/auth';

// GET single package
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const packageData = await Package.findById(params.id);

        if (!packageData) {
            return NextResponse.json(
                { error: 'Package not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(packageData);
    } catch (error) {
        console.error('Get package error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update package (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const { name, subtitle, price, currency, popular, features, description, order, active } = await request.json();

        // Validation
        if (!name || !subtitle || !price || !features || features.length === 0) {
            return NextResponse.json(
                { error: 'Name, subtitle, price, and features are required' },
                { status: 400 }
            );
        }

        const updatedPackage = await Package.findByIdAndUpdate(
            params.id,
            {
                name,
                subtitle,
                price: parseFloat(price),
                currency: currency || 'USD',
                popular: popular || false,
                features,
                description: description || '',
                order: order || 0,
                active: active !== undefined ? active : true,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedPackage) {
            return NextResponse.json(
                { error: 'Package not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Package updated successfully',
            package: updatedPackage
        });

    } catch (error) {
        console.error('Update package error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE package (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const deletedPackage = await Package.findByIdAndDelete(params.id);

        if (!deletedPackage) {
            return NextResponse.json(
                { error: 'Package not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Package deleted successfully',
            package: deletedPackage
        });

    } catch (error) {
        console.error('Delete package error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
