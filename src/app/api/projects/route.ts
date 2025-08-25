import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';

// GET all projects (public)
export async function GET() {
    try {
        await connectDB();

        const projects = await Project.find({ active: true })
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST new project (admin only)
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

        if (!decoded || typeof decoded === 'string' || decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Admin access required' },
                { status: 403 }
            );
        }

        const { title, category, image, description, technologies, client, projectUrl, githubUrl, featured, order } = await request.json();

        // Validation
        if (!title || !category || !image) {
            return NextResponse.json(
                { error: 'Title, category, and image are required' },
                { status: 400 }
            );
        }

        const project = new Project({
            title,
            category,
            image,
            description: description || '',
            technologies: technologies || [],
            client: client || '',
            projectUrl: projectUrl || '',
            githubUrl: githubUrl || '',
            featured: featured || false,
            order: order || 0,
            active: true
        });

        await project.save();

        return NextResponse.json(
            { message: 'Project created successfully', project },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create project error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
