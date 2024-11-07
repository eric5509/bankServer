import {
  GetAccountByID,
  hashPassword,
  passwordMatch,
  sendJsonResponse,
} from "../../../Lib/helper";

export const ChangePassword = async (req, res) => {
  const { id } = req.params;
  if (!id) return sendJsonResponse(res, 400, "Please input Account ID");
  if (!MongoIdValid(id))
    return sendJsonResponse(res, 400, "Please input valid Account ID");
  const Account = await GetAccountByID(id);
  if (!Account) return sendJsonResponse(res, 400, "Account not found");
  const { oldPassword, newPassword } = req.body;
  const Match = await passwordMatch(oldPassword, Account.password);
  if (!Match) return sendJsonResponse(res, 400, "Incorrect Password");
  Account.password = await hashPassword(newPassword);
  try {
    await Account.save();
    return sendJsonResponse(res, 400, "Password changed successfully");
  } catch (error) {
    return sendJsonResponse(res, 400, error.message);
  }
};
