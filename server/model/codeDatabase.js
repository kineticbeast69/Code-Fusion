import mongoose from "mongoose";

const codeDatabaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    html: {
      type: String,
      default: `<div>hello world</div>`,
    },

    css: {
      type: String,
      default: `body{color:red;}`,
    },
    js: {
      type: String,
      default: `console.log('Hello world')`,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

export const CodeModel = mongoose.model("Codes", codeDatabaseSchema);
