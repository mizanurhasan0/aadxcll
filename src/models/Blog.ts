import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
    title: string;
    content: string;
    excerpt: string;
    author: mongoose.Types.ObjectId;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 300
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    published: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);
