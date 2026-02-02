const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true }
}, { timestamps: true });


// password hashing & comparison methods
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const SetSchema = new mongoose.Schema({
    setNumber: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    completed: { type: Boolean, default: true }
}, { _id: false });

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orderIndex: { type: Number, default: 0 },
    sets: [SetSchema]
}, { _id: false });


const WorkoutSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    title: { type: String, default: 'Workout' },
    notes: { type: String },
    exercises: [ExerciseSchema]
}, { timestamps: true });








const userModel = mongoose.model('users', UserSchema)
const workoutSessionModel = mongoose.model('workoutSessions', WorkoutSessionSchema)

module.exports = {workoutSessionModel, userModel};