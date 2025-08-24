import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

// GET all blogs
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const blogs = await Blog.find({ published: true })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST new blog (admin only)
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

        const { title, content, excerpt, image, tags, published } = await request.json();

        // Validation
        if (!title || !content || !excerpt || !image) {
            return NextResponse.json(
                { error: 'Title, content, excerpt, and image are required' },
                { status: 400 }
            );
        }

        const blog = new Blog({
            title,
            content,
            excerpt,
            image,
            tags: tags || [],
            published: published || false,
            author: decoded.userId
        });

        await blog.save();

        return NextResponse.json(
            { message: 'Blog created successfully', blog },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create blog error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
