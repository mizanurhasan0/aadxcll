import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aadxcelit';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Add a type for the cached object
type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Use a symbol to avoid polluting the global namespace and to avoid type errors
const globalWithMongoose = global as typeof globalThis & {
    _mongooseCache?: MongooseCache;
};

let cached: MongooseCache = globalWithMongoose._mongooseCache || { conn: null, promise: null };

if (!globalWithMongoose._mongooseCache) {
    globalWithMongoose._mongooseCache = cached;
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
