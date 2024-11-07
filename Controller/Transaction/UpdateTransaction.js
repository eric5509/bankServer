import {
  AccountNumberExists,
  convertToDate,
  getAccountName,
  GetTransactionByID,
  MongoIdValid,
  sendJsonResponse,
  trimValue,
} from "../../Lib/helper.js";

export const UpdateTransaction = async (req, res) => {
  const { id } = req.params;
  const {
    accountNumber,
    transactionType,
    description,
    amount,
    transferDate,
    accountID,
    status,
  } = req.body;
  if (!MongoIdValid(id))
    return sendJsonResponse(res, 400, "Please input a valid Transaction ID");
  const Transaction = await GetTransactionByID(id);
  if (!Transaction)
    return sendJsonResponse(res, 400, "Transaction does not exist");
  if (accountNumber) {
    const Account = await AccountNumberExists(trimValue(accountNumber));
    if (!Account) {
      return sendJsonResponse(
        res,
        400,
        "No User is attached to this Account Number"
      );
    } else {
      Transaction.accountNumber = accountNumber;
      Transaction.accountName = getAccountName(
        Account.firstName,
        Account.middleName,
        Account.lastName
      );
    }
  }
  if (transactionType) Transaction.transactionType = transactionType;
  if (description) Transaction.description = description;
  if (amount) {
    if (isNaN(amount))
      return sendJsonResponse(res, 400, "Pleae input a valid amount");
    Transaction.amount = Number(amount);
  }
  if (transferDate) Transaction.transferDate = convertToDate(transferDate);
  if (status) Transaction.status = status;
  if (accountID) Transaction.accountID = accountID;
  try {
    await Transaction.save();
    return sendJsonResponse(res, 200, "Transaction Updated Succesfully");
  } catch (error) {
    return sendJsonResponse(res, 400, error.message);
  }
};
