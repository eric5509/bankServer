import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Please input Account ID"],
    },
    firstName: {
      type: String,
      required: [true, "Please input your first name"],
    },
    middleName: {
      type: String,
      required: [true, "Please input your middle name"],
    },
    lastName: {
      type: String,
      required: [true, "Please input your last name"],
    },
    image: {
      type: String,
      required: [true, "Please input your Document Image"],
    },
    documentType: {
      type: String,
      required: [true, "Please input your Document Type"],
    },
    state: {
      type: String,
      required: [true, "Please input your state"],
    },
    country: {
      type: String,
      required: [true, "Please input your country"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "successful"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const KYC = mongoose.model("KYC", KYCSchema);
