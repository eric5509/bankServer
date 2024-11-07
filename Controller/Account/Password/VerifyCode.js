import {
  GetAccountByParams,
  hashPassword,
  sendJsonResponse,
} from "../../../Lib/helper.js";
import { Account as AccountModel } from "../../../Models/Account.js";

export const VerifyRecoveryCode = async (req, res) => {
  const { params } = req.params;
  const { code } = req.body;
  if (!code)
    return sendJsonResponse(
      res,
      400,
      "Please input the 6 digit code sent your code email"
    );
  if (!params) return sendJsonResponse(res, 400, "Please input a valid url");
  const Params = await GetAccountByParams(params);
  if (!Params) return sendJsonResponse(res, 400, "Use a valid url");
  const Account = await AccountModel.findOne({
    code,
    params,
    expiry: { $gt: Date.now() },
  });
  if (!Account) return sendJsonResponse(res, 400, "Invalid or Expired code");
  return sendJsonResponse(res, 200, "Verified");
};
