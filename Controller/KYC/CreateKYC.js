import {
  GetAccountByID,
  MongoIdValid,
  sendJsonResponse,
} from "../../Lib/helper.js";
import { KYC } from "../../Models/KYC.js";

export const CreateKYC = async (req, res) => {
  const { id } = req.params;
  if (!id) return sendJsonResponse(res, 400, "Please input Account ID");
  if (!MongoIdValid(id))
    return sendJsonResponse(res, 400, "Please input valid Account ID");
  const { image, documentType, status } = req.body;
  const KYCStatus = status || "pending";
  if (!image || !documentType)
    return sendJsonResponse(res, 400, "Please fill in all fields");
  const Account = await GetAccountByID(id);
  if (!Account) return sendJsonResponse(res, 400, "Account not found");

  const data = {
    firstName: Account.firstName,
    middleName: Account.middleName,
    lastName: Account.lastName,
    accountID: Account._id,
    state: Account.residentialAddress.state,
    country: Account.residentialAddress.country,
    documentType,
    image,
    status: KYCStatus
  };

  try {
    await KYC.create(data);
    return sendJsonResponse(res, 201, "KYC created successfully", data);
  } catch (error) {
    return sendJsonResponse(res, 500, error.message);
  }
};
