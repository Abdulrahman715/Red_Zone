const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Course', coursesSchema);