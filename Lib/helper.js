import { Account } from "../Models/Account.js";
import { Transfer } from "../Models/Transfer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Transaction } from "../Models/Transaction.js";
import { KYC } from "../Models/KYC.js";
import crypto from "crypto";

export const generateUniqueAccountNumber = async () => {
  const allAccount = await Account.find();
  const allAccountNumbers = allAccount.map((account) => account.accountNumber);
  const getRandomNumber = () => {
    return (
      "5" +
      Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0")
    );
  };
  let newAccountNumber = getRandomNumber();
  while (allAccountNumbers.includes(newAccountNumber))
    newAccountNumber = getRandomNumber();
  return newAccountNumber;
};

export const GetAccountByID = async (id) => {
  const account = await Account.findById(id);
  return account || null;
};
export const GetTransactionByID = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction || null;
};
export const GetAccountByParams = async (params) => {
  const account = await Account.findOne({ params });
  return account || null;
};

export const setExpiry = (minutes) => {
  return Date.now() + minutes * 60 * 1000;
};
export const AccountNumberExists = async (accountNumber) => {
  const account = await Account.findOne({ accountNumber });
  return account || null;
};
export const KYCExists = async (id) => {
  const account = await KYC.findById(id);
  return account || null;
};

export const MongoIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const EmailExisits = async (email) => {
  const account = await Account.findOne({ email: email.trim() });
  return account ? account : null;
};

export const signJWT = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};


export const verification = (minutes) => {
  const expiry = setExpiry(minutes);
  const code = generateRandom5();
  const params = generateRandomByte();
  return {
    params,
    code, 
    expiry
  }

}

export const covertToFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};


export const generateRandomByte = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateRandom5 = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const verifyJWT = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return null;
  }
};

export const PhoneNumberExisits = async (phone) => {
  const account = await Account.findOne({ phone: phone.trim() });
  return account ? account : null;
};

export const IMFExists = async (imf) => {
  const account = await Account.findOne({ imf: imf.trim() });
  return account ? account : null;
};

export const TransferExists = async (transferId) => {
  const transfer = await Transfer.findOne({ transferId });
  return transfer || false;
};

export const ConvertToNumber = (value) => {
  return Number(value);
};

export const trimValue = (data) => {
  const dataa = `${data}`;
  return dataa.trim();
};
export const toLowerCaseTrimmed = (data) => {
  return data.trim().toLowerCase();
};

export const getAccountName = (firstName, middleName, lastName) => {
  return `${firstName} ${middleName} ${lastName}`;
};

export const convertToDate = (date) => {
  const delimiter = /[-,/.\s]/;
  const trimmedDate = date.trim();
  const parts = trimmedDate.split(delimiter);
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const randomOneToNine = () => {
  return Math.floor(Math.random() * 10);
};

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const passwordMatch = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const sendJsonResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    message,
    ...(data && { data }),
  });
};
export const sendResponse = (status, message, data) => {
  return  {
    message,
    status,
    ...(data && { data }),
  }
};
