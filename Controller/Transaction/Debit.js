import {
  AccountNumberExists,
  sendJsonResponse,
  trimValue,
  getAccountName,
} from "../../Lib/helper.js";
import { Transaction } from "../../Models/Transaction.js";

export const Debit = async (req, res) => {
  const { amount, accountNumber, description, status } = req.body;
  let transactionStatus = status || "pending";
  if (
    !trimValue(amount) ||
    !trimValue(accountNumber) ||
    !trimValue(description)
  )
    return sendJsonResponse(res, 400, "Please fill in all fields");
  if (isNaN(amount))
    return sendJsonResponse(res, 400, "Please enter a valid Number");
  const Account = await AccountNumberExists(accountNumber);
  if (!Account) return sendJsonResponse(res, 400, "Account does not exist");
  if(Number(amount) > Account.currentBalance) return sendJsonResponse(res, 400, "Balance not up to amount")
  Account.currentBalance -= Number(amount);

  const data = {
    accountID: Account._id,
    amount,
    accountNumber,
    description,
    transactionType: "debit",
    status: transactionStatus,
    accountName: getAccountName(
      Account.firstName,
      Account.lastName,
      Account.lastName
    ),
  };
  try {
    await Account.save();
    const newlyCreatedTransaction = await Transaction.create(data);
    return sendJsonResponse(res, 200,'Transaction Created successfully', { Transaction: newlyCreatedTransaction });
  } catch (error) {
    return sendJsonResponse(res, 400, error.message);
  }
};
