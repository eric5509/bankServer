import {
  AccountNumberExists,
  convertToDate,
  EmailExisits,
  GetAccountByID,
  hashPassword,
  IMFExists,
  MongoIdValid,
  PhoneNumberExisits,
  sendJsonResponse,
  trimValue,
} from "../../../Lib/helper.js";

export const UpdateAccount = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    street,
    state,
    city,
    postalCode,
    country,
    birthDate,
    gender,
    accountNumber,
    imf,
    cot,
    currentBalance,
    availableBalance,
    image,
    accountType,
    pin,
    password,
    status,
    admin,
    blocked,
    code,
  } = req.body;

  if (!MongoIdValid(id))
    return sendJsonResponse(res, 400, "Please input a valid Account ID");

  const Account = await GetAccountByID(id);

  if (!Account) return sendJsonResponse(res, 404, "No account found");

  if (firstName) Account.firstName = firstName;
  if (middleName) Account.middleName = middleName;
  if (lastName) Account.lastName = lastName;
  if (city) Account.city = city;
  if (state) Account.state = state;
  if (country) Account.country = country;
  if (street) Account.street = street;
  if (postalCode) Account.postalCode = postalCode;
  if (gender) Account.gender = gender;
  if (cot) Account.cot = cot;
  if (currentBalance) Account.currentBalance = currentBalance;
  if (availableBalance) Account.availableBalance = availableBalance;
  if (image) Account.image = image;
  if (accountType) Account.accountType = accountType;
  if (status) Account.status = status;
  if (admin) Account.admin = admin;
  if (blocked) Account.blocked = blocked;
  if (code) Account.code = code;

  if (email) {
    if (await EmailExisits(trimValue(email)))
      return sendJsonResponse(res, 400, "Sorry Email already exists");
    Account.email = email;
  }
  if (phone) {
    if (await PhoneNumberExisits(trimValue(phone)))
      return sendJsonResponse(res, 400, "Sorry Phone Number already exists");
    Account.phone = phone;
  }
  if (imf) {
    if (await IMFExists(trimValue(imf)))
      return sendJsonResponse(res, 400, "Sorry IMF already exists");
    Account.imf= imf;
  }
  if (accountNumber) {
    if (await AccountNumberExists(trimValue(accountNumber)))
      return sendJsonResponse(res, 400, "Sorry Account Number already exists");
    Account.accountNumber = accountNumber;
  }

  if (pin) Account.pin = hashPassword(pin);
  if (password) Account.password = hashPassword(password);
  if(birthDate) Account.birthDate = convertToDate(birthDate)
    try {
        const UpdatedAccount = await Account.save()
        return sendJsonResponse(res, 200, 'Info updated Successfully', UpdateAccount)
    } catch (error) {
        return sendJsonResponse(res, 500, error.message)
    }
};
