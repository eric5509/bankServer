import {
  GetAccountByID,
  KYCExists,
  MongoIdValid,
  sendJsonResponse,
} from "../../Lib/helper.js";

export const UpdateKYC = async (req, res) => {
  const { id } = req.params;
  if (!id) return sendJsonResponse(res, 400, "Please input Account ID");
  if (!MongoIdValid(id))
    return sendJsonResponse(res, 400, "Please input valid Account ID");
  const KYC = await KYCExists(id);
  if (!KYC) return sendJsonResponse(res, 400, "KYC ID is invalid");
  const { accountID, image, documentType, status } = req.body;

  if (accountID) {
    const Account = await GetAccountByID(accountID);
    if (!Account)
      return sendJsonResponse(res, 400, "Sorry Acount Doesn't Exist");
    KYC.firstName = Account.firstName;
    KYC.middleName = Account.middleName;
    KYC.lastName = Account.lastName;
    KYC.state = Account.residentialAddress.state;
    KYC.country = Account.residentialAddress.country;
    KYC.accountID = accountID;
  }
  if (status) KYC.status = status;
  if (image) KYC.image = image;
  if (documentType) KYC.documentType = documentType;
  try {
    const newKYC = await KYC.save();
    return sendJsonResponse(res, 201, "KYC updated successfully", {
      data: newKYC,
    });
  } catch (error) {
    return sendJsonResponse(res, 500, error.message);
  }
};
