import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.role);

        // Remove password from response
        const userResponse = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        return NextResponse.json({
            message: 'Login successful',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
