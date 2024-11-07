import { verification } from "../../../Lib/helper.js";
import {
  PhoneNumberExisits,
  sendJsonResponse,
  trimValue,
  passwordMatch,
  getAccountName,
  signJWT,
} from "../../../Lib/helper.js";

export const Login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone.trim() || !password.trim())
    return sendJsonResponse(res, 400, "Please fill in all fields");

  const UserAccount = await PhoneNumberExisits(trimValue(phone));

  if (!UserAccount) return sendJsonResponse(res, 400, "Invalid Credentials");

  const PasswordMatch = await passwordMatch(password, UserAccount.password);
  if (!PasswordMatch) return sendJsonResponse(res, 400, "Invalid Credentials");

  if (UserAccount.blocked)
    return sendJsonResponse(
      res,
      400,
      "Sorry, Your account has been blocked, contact support to regain access"
    );

  if (!UserAccount.verified) {
    const Verification = verification(10);
    UserAccount.code = Verification.code;
    UserAccount.params = Verification.params;
    UserAccount.expiry = Verification.expiry;
    try {
      await UserAccount.save();
      sendJsonResponse(res, 200, 'Verify your account', UserAccount.params);
    } catch (error) {
      return sendJsonResponse(res, 400, error.message);
    }
  }

  if (UserAccount.otpLogin) {
    const Verification = verification(10);
    UserAccount.code = Verification.code;
    UserAccount.params = Verification.params;
    UserAccount.expiry = Verification.expiry;
    try {
      await UserAccount.save();
      sendJsonResponse(res, 200, 'Enter the code sent to your email', UserAccount.params);
    } catch (error) {
      return sendJsonResponse(res, 400, error.message);
    }
  }

  const tokenData = {
    id: UserAccount._id,
    admin: UserAccount.admin,
    fullname: getAccountName(
      UserAccount.firstName,
      UserAccount.middleName,
      UserAccount.lastName
    ),
    phone: UserAccount.phone,
    image: UserAccount.image,
    email: UserAccount.email,
  };

  try {
    const token = signJWT(tokenData)
    return sendJsonResponse(res, 500, 'Login Successful', token);
  } catch (error) {
    return sendJsonResponse(res, 500, error.message);
  }

};
