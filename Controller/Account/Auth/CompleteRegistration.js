import {
  GetAccountByParams,
  sendJsonResponse,
  signJWT,
} from "../../../Lib/helper";

export const CompleteRegistration = async (req, res) => {
  const { params } = req.params;
  const { code } = req.body;
  if (!params) return sendJsonResponse(res, 400, "Please input url");
  const Params = await GetAccountByParams(params);
  if (!Params) return sendJsonResponse(res, 400, "Invalid url");
  if (!code)
    return sendJsonResponse(
      res,
      400,
      "Please the 6 digits code that was sent to your email"
    );
  const Account = await AccountModel.findOne({
    code,
    params,
    expiry: { $gt: Date.now() },
  });
  if (!Account) return sendJsonResponse(res, 400, "Invalid or Expired code");
  try {
    Account.isVerified = true;
    await Account.save();
    const tokenData = {
      id: Account._id,
      admin: Account.admin,
      fullname: getAccountName(
        Account.firstName,
        Account.middleName,
        Account.lastName
      ),
      phone: Account.phone,
      image: Account.image,
      email: Account.email,
      verified: Account.verified,
    };
    signJWT(tokenData);
    sendJsonResponse(res, 200, "Login Successful", tokenData);
  } catch (error) {
    sendJsonResponse(res, 200, error.message);
  }
};
