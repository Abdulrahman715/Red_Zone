const mongoose = require('mongoose');

const courseContainSchema = new mongoose.Schema({
    image: {
        type: String,
        required: "true"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    doctor: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrecentage: {
        type: Number,
    },
    grade: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true
    },
    studentsEnrolled: {
        type: Number,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
    },
    coupon: {
        type: String,
        default: null
    },
    doctorDetails: {
        type: String,
    }
});

// Middleware to update the `updatedAt` field on save
courseContainSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("CourseContain", courseContainSchema);