import {
  EmailExisits,
  sendJsonResponse,
  verification,
} from "../../../Lib/helper.js";

export const SendRecoveryCode = async (req, res) => {
  const { email } = req.params;
  const Verification = verification(10)
  const Account = await EmailExisits(email);
  if (!email) return sendJsonResponse(res, 400, "Account not found");
  Account.code = Verification.code;
  Account.params = Verification.params;
  Account.expiry = Verification.expiry;
  try {
    const newUser = await Account.save();
    return sendJsonResponse(res, 500, "", { params: newUser.params, Account });
  } catch (error) {
    return sendJsonResponse(res, 500, error.message);
  }
};
