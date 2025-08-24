import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    popular: {
        type: Boolean,
        default: false
    },
    features: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
packageSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);

export default Package;
