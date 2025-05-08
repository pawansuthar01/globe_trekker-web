import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, minLength: 5, trim: true },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email address",
      ],
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      trim: true,
    },
    avatar: {
      secure_url: { type: String },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "AUTHOR"],
      default: "USER",
    },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    isSubscribed: { type: Boolean, default: true },

    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: { type: Date }, // Date of Birth
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
    },
    travelAchievements: [
      {
        key: { type: String, required: true }, // unique identifier
        title: { type: String, required: true },
        description: { type: String },
        icon: { type: String },
        achievedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Hash password if modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Custom instance methods
userSchema.methods = {
  comparePassword: async function (planPassword) {
    return await bcrypt.compare(planPassword, this.password);
  },

  generate_JWT_TOKEN: function () {
    return JWT.sign(
      {
        email: this.email,
        id: this._id,
        role: this.role,
        isSubscribed: this.isSubscribed,
        phoneNumber: this.phoneNumber,
        avatar: this.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
  },

  generatePasswordResatToken: function () {
    const resatToken = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resatToken)
      .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
    return resatToken;
  },
};

const User = mongoose.model("User", userSchema);
export default User;
