import { Account } from "../../../Models/Account.js";
import {
  EmailExisits,
  PhoneNumberExisits,
  IMFExists,
  sendJsonResponse,
  hashPassword,
  randomOneToNine,
  generateUniqueAccountNumber,
  convertToDate,
  getAccountName,
  setExpiry,
  generateRandom5,
  generateRandomByte,
} from "../../../Lib/helper.js";
import { femaleAvatars, maleAvatars, validate } from "../../../Lib/validate.js";
export const Register = async (req, res) => {
  const random5 = generateRandom5();
  const params = generateRandomByte();
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    gender,
    birthDate,
    street,
    city,
    state,
    country,
    postalCode,
    imf,
    cot,
    accountType,
    pin,
    password,
  } = req.body;

  if (
    !validate({
      firstName,
      accountType,
      city,
      cot,
      country,
      birthDate,
      gender,
      email,
      imf,
      lastName,
      middleName,
      password,
      phone,
      pin,
      postalCode,
      state,
      street,
    })
  )
    return sendJsonResponse(res, 400, "Please fill in all fields");

  const accountExistsEmail = await EmailExisits(email);
  if (accountExistsEmail)
    return sendJsonResponse(res, 400, "Email already Exist");

  const phoneNumberExist = await PhoneNumberExisits(phone);
  if (phoneNumberExist)
    return sendJsonResponse(res, 400, "Phone number already Exist");

  const accountIMF = await IMFExists(imf);
  if (accountIMF) return sendJsonResponse(res, 400, "IMF already Exist");

  const accountNumber = await generateUniqueAccountNumber();

  const isAdmin = password.slice(-5) === process.env.ADMIN_SECRET;
  const hashedPassword = await hashPassword(password);
  const hashedPin = await hashPassword(pin);
  const data = {
    firstName,
    lastName,
    middleName,
    accountNumber,
    email,
    phone,
    gender,
    admin: isAdmin,
    birthDate: convertToDate(birthDate),
    residentialAddress: {
      state,
      city,
      postalCode,
      country,
      street,
    },
    postalCode,
    imf,
    cot,
    accountType,
    pin: hashedPin,
    status: isAdmin ? "successful" : "pending",
    password: hashedPassword,
    image: isAdmin
      ? "https://play-lh.googleusercontent.com/P0QkMWnVe00FSXsSc2OzkHKqGB9JTMm4sur4XRkBBkFEtO7MEQgoxO6s92LHnJcvdgc"
      : `https://avatar.iran.liara.run/public/${
          gender === "male"
            ? maleAvatars[randomOneToNine()]
            : femaleAvatars[randomOneToNine()]
        }`,
  };
  try {
    const newAccount = await Account.create(data);
    newAccount.code = random5;
    newAccount.params = params;
    newAccount.expiry = expiry;
    await newAccount.save()
    sendJsonResponse(res, 200, "Account Created Successfully", params);
  } catch (error) {
    sendJsonResponse(res, 200, error.message);
  }
};
