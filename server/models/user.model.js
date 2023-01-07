const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
        default: "https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/null/external-user-avatar-social-media-smashingstocks-isometric-smashing-stocks-2.png",
    },

},
    {
        timestamps: true,
        createdAt: 'created_at',
    });

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Bcrypt password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const RNuser = mongoose.model('RNuser', userSchema);
module.exports = RNuser;