import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: { type: String, minLength: 5, trim: true },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill in a valid email address",
    ],
    unique: [true, "email is registered"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  password: {
    type: String,

    minLength: [8, "password must be 8 char"],
    select: false,

    trim: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "AUTHOR"],
    default: "USER",
  },
  forgotPasswordToken: { type: String },
  forgotPasswordExpiry: { type: Date },
  isSubscribed: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.method = {
  //compare password to old password
  comparePassword: async function (planPassword) {
    return await bcrypt.compare(planPassword, this.password);
  },
  //Generate Jwt token to use jwr and valid only 7d.
  generate_JWT_TOKEN: async function () {
    return await JWT.sign(
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

  //Generate Resat token to use crypto and valid only 10 min.
  generatePasswordResatToken: async function () {
    const resatToken = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resatToken)
      .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
  },
};
const User = mongoose.model("User", userSchema);
export default User;
