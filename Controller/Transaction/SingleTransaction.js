import mongoose from "mongoose";
import { covertToFormattedDate, sendJsonResponse } from "../../Lib/helper.js";
import { Transaction as TransactionModel } from "../../Models/Transaction.js";

export const SingleTransaction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return sendJsonResponse(res, 400, "Please input a valid ID");
  let Transaction = await TransactionModel.findById(id);
  if (!Transaction) return sendJsonResponse(res, 400, "Transaction not found");
  const newTransaction = {...Transaction, date: covertToFormattedDate(Transaction.date)}
  return sendJsonResponse(res, 200, 'Transaction Fetched', newTransaction);
};
