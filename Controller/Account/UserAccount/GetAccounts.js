import { sendJsonResponse } from "../../../Lib/helper.js";
import { Account } from "../../../Models/Account.js";

export const GetAccounts = async (req, res) => {
  const UserAccounts = await Account.find()
  return sendJsonResponse(res, 200, 'Accounts found', UserAccounts)
};
