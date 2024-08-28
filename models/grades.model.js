const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
        enum: ["الاولى", "الثانية", "الثالثة", "الرابعة"],
        default:"الاولى"
    }
});

module.exports = mongoose.model('Grade', gradesSchema);