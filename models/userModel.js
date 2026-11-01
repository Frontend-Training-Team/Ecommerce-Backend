import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'customer',
    },
    addresses: [{
        type: String,
        default: 'customer',
    }],
    tokens: [{
        type: String,
        required: true,
    }]
})

let UserModel = mongoose.model('Enginee', userSchema)

export { UserModel }