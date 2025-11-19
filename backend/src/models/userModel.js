import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessRole: { type: String, required: true, enum: ['owner', 'customer'] },
    systemRole: { type: String, enum: ['Admin', 'Staff'] },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// The pre-save password hashing middleware has been removed to prevent hanging issues.
// Hashing is now handled directly in the authController.

const User = mongoose.model('User', userSchema);

export default User;