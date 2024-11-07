import {
  AccountNumberExists,
  ConvertToNumber,
  sendJsonResponse,
  toLowerCaseTrimmed,
  trimValue,
} from "../../Lib/helper.js";
import { Transfer } from "../../Models/Transfer.js";

export const ProcessTransfer = async (req, res) => {
  let transfer;
  let Recipient;
  const {
    senderAccountName,
    senderAccountNumber,
    recipientAccountName,
    recipientAccountNumber,
    recipientBankName,
    description,
    amount,
  } = req.body;

  if (
    !trimValue(senderAccountName) ||
    !trimValue(senderAccountNumber) ||
    !trimValue(recipientAccountName) ||
    !trimValue(recipientBankName) ||
    !trimValue(recipientAccountNumber) ||
    !trimValue(description) ||
    !trimValue(amount)
  )
    return sendJsonResponse(res, 400, "Please fill in all fields");

  if (isNaN(senderAccountNumber))
    return sendJsonResponse(res, 400, "Please Input a Valid Account Number");
  if (isNaN(recipientAccountNumber))
    return sendJsonResponse(res, 400, "Please Input a Valid Account Number");
  if (senderAccountNumber.length !== 10 )
    return sendJsonResponse(res, 400, "Please Input a Valid Account Number");
  if (recipientAccountNumber.length !== 10 )
    return sendJsonResponse(res, 400, "Please Input a Valid Account Number");

  const Sender = await AccountNumberExists(senderAccountNumber);

  if (!Sender) return sendJsonResponse(res, 400, "Sender account not valid");

  const normalizedBankName = toLowerCaseTrimmed(recipientBankName);
  const bankNameEnv = toLowerCaseTrimmed(process.env.BANK_NAME);

  if (normalizedBankName === bankNameEnv)
    Recipient = await AccountNumberExists(recipientAccountNumber);

  if (normalizedBankName === bankNameEnv && !Recipient)
    return sendJsonResponse(res, 400, "Incorrect Bank Details for Recipient");

  if (Sender.status !== "successful")
    return sendJsonResponse(res, 400, "Please verify your account to continue");

  if (senderAccountNumber === recipientAccountNumber)
    return sendJsonResponse(
      res,
      400,
      "Sender and recipient account numbers cannot be the same."
    );

  if (Sender.blocked)
    return sendJsonResponse(
      res,
      400,
      "Your account has been restricted from making transfers, contact the support team to opend your account"
    );
  const numberAmount = ConvertToNumber(amount);
  if (Sender.balance < numberAmount)
    return sendJsonResponse(
      res,
      400,
      "Insufficient Balance, please top up your account to continue"
    );

  Sender.balance -= numberAmount;

  if (Recipient && recipientBankName === "first union") {
    Recipient.balance += numberAmount;
    transfer = {
      senderAccountName,
      senderAccountNumber,
      recipientAccountName,
      recipientAccountNumber,
      recipientBankName,
      description,
      amount: numberAmount,
      senderId: Sender._id,
      recipientId: Recipient._id,
    };
  } else {
    transfer = {
      senderAccountName,
      senderAccountNumber,
      recipientAccountName,
      recipientAccountNumber,
      recipientBankName,
      description,
      amount,
      senderId: Sender._id,
    };
  }

  try {
    await Sender.save();
    await Transfer.create(transfer);
    if (Recipient) await Recipient.save();
    return sendJsonResponse(
      res,
      200,
      "Transfer completed successfully",
      Recipient
    );
  } catch (error) {
    console.log(error);
    return sendJsonResponse(res, 500, "Server Error, please try again later");
  }
};
