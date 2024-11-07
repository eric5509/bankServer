import mongoose from "mongoose";
import { sendJsonResponse } from "../../Lib/helper.js";
import { Transaction as TransactionModel } from "../../Models/Transaction.js";

export const UserTransactions = async (req, res) => {
  const { accountID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(accountID))
    return sendJsonResponse(res, 400, "Please input a valid ID");
  const Transactions = await TransactionModel.find({ accountID });
  const newTransactions = Transactions.map((transaction) => {
    return {
      ...transaction,
      date: covertToFormattedDate(transaction.date),
    };
  });
  return sendJsonResponse(res, 200, "Transaction Fetched", newTransactions);
};
