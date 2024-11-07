import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema(
  {
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
    email: {
      type: String,
      required: [true, "Please input your email address"],
      unique: [true, "Account with this Email already exists"],
      match: [/.+\@.+\..+/, "Please input a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Please input your phone number"],
      unique: [true, "Account with this Phone Number already exists"],
    },
    residentialAddress: {
      street: {
        type: String,
        required: [true, "Please input your street address"],
      },
      city: {
        type: String,
        required: [true, "Please input your city"],
      },
      state: {
        type: String,
        required: [true, "Please input your state"],
      },
      country: {
        type: String,
        required: [true, "Please input your country"],
      },
      postalCode: {
        type: String,
        required: [true, "Please input your postal code"],
      },
    },
    birthDate: {
      type: Date,
      required: [true, "Please input your Date of Birth"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "rather not say"],
      required: [true, "Please input your Gender"],
    },
    accountNumber: {
      type: String,
      unique: true,
    },
    imf: {
      type: String,
      unique: [true, "Account with this IMF already exists"],
      required: [true, "Please input your IMF number"],
    },
    cot: {
      type: String,
      required: [true, "Please input your COT"],
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ["checking", "savings"],
      required: [true, "Please select an Account Type"],
    },
    pin: {
      type: String,
      required: [true, "Please input a PIN"],
    },
    password: {
      type: String,
      required: [true, "Please input a password"],
    },
    status: {
      type: String,
      default: "pending",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", AccountSchema);
