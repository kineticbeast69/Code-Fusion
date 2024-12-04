import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema(
  {
    username: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
export const userModel = mongoose.model("Users", userModelSchema);
