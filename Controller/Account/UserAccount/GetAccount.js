import { MongoIdValid, sendJsonResponse } from "../../../Lib/helper.js";
import { Account } from "../../../Models/Account.js";

export const GetAccount = async (req, res) => {
  const { value } = req.params;
  let UserAccount;
  if (MongoIdValid(value)) {
    UserAccount = await Account.findById(value);
  } else {
    UserAccount = await Account.findOne({
      $or: [
        { accountNumber: value },
        { email: value },
        { imf: value },
        { phone: value },
      ],
    });
  }
  if (!UserAccount) return sendJsonResponse(res, 400, "User doesn't exist");
  return sendJsonResponse(res, 200, 'Account found', UserAccount);
};
