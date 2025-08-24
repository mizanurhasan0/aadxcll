import mongoose from 'mongoose';

export interface ISettings extends mongoose.Document {
    logoLight: string;
    logoDark: string;
    favicon: string;
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
    updatedAt: Date;
}

const settingsSchema = new mongoose.Schema<ISettings>({
    logoLight: {
        type: String,
        required: true,
        default: '/projects/logolight.png'
    },
    logoDark: {
        type: String,
        required: true,
        default: '/projects/logodark.png'
    },
    favicon: {
        type: String,
        required: true,
        default: '/projects/facicon.png'
    },
    siteName: {
        type: String,
        required: true,
        default: 'Aadxcelit'
    },
    siteDescription: {
        type: String,
        required: true,
        default: 'Your trusted partner in digital solutions'
    },
    contactEmail: {
        type: String,
        required: true,
        default: 'info@aadxcelit.com'
    },
    contactPhone: {
        type: String,
        required: true,
        default: '+1 (555) 123-4567'
    },
    address: {
        type: String,
        required: true,
        default: '123 Business Street, City, Country'
    },
    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        github: String
    }
}, {
    timestamps: true
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', settingsSchema);
