import mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
    name: string;
    position: string;
    bio: string;
    image: string;
    email: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    order: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const teamSchema = new mongoose.Schema<ITeam>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    position: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        required: true,
        maxlength: 500
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
