import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';

// GET single project
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const project = await Project.findById(params.id);

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update project (admin only)
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

        const { title, category, image, description, technologies, client, projectUrl, githubUrl, featured, order, active } = await request.json();

        // Validation
        if (!title || !category || !image) {
            return NextResponse.json(
                { error: 'Title, category, and image are required' },
                { status: 400 }
            );
        }

        const updatedProject = await Project.findByIdAndUpdate(
            params.id,
            {
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
                active: active !== undefined ? active : true,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedProject) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Project updated successfully',
            project: updatedProject
        });

    } catch (error) {
        console.error('Update project error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE project (admin only)
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

        const deletedProject = await Project.findByIdAndDelete(params.id);

        if (!deletedProject) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Project deleted successfully',
            project: deletedProject
        });

    } catch (error) {
        console.error('Delete project error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
