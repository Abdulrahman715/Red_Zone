const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'من فضلك ادخل اسمك']
    },
    email: {
        type: String,
        required: [true, 'من فضلك ادخل ايميلك'],
        unique: true,
        validate: [validator.isEmail, 'من فضلك ادخل ايميل فعلى'],
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/duwfy7ale/image/upload/v1714772509/gbktjsj2ynk4j1xxtk8x.jpg"
    },
    role: {
        type: String,
        enum: [userRoles.Student, userRoles.doctor, userRoles.guest],
        default: userRoles.Student
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (value) {
                return /[0-9]/.test(value) && /[@#$%^&*(){}!~?><]/.test(value)
            },
            message: "password must contain at least one special number and one special character"
        },
        select: false,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value = this.password
            },
            message: "الباسوردات مش متطابقة"
        }
    },
    passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassord, userPassword) {
    
    return await bcrypt.compare(candidatePassord, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimeStamp < changedTimeStamp;
    };

    return false;
};

userSchema.pre(/^find/, function (next) {

    this.find({ active: { $ne: false } });
    next();
});

module.exports = mongoose.model('User', userSchema);