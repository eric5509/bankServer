import { Router } from "express";
import { UpdateTransfer } from "../Controller/Transfer/UpdateTransfer.js";
import { ProcessTransfer } from "../Controller/Transfer/ProcessTransfer.js";
import { Debit } from "../Controller/Transaction/Debit.js";
import { Credit } from "../Controller/Transaction/Credit.js";
import { AllTransactions } from "../Controller/Transaction/AllTransactions.js";
import { SingleTransaction } from "../Controller/Transaction/SingleTransaction.js";
import { UserTransactions } from "../Controller/Transaction/UserTransactions.js";
import { Register } from "../Controller/Account/Auth/Register.js";
import { Login } from "../Controller/Account/Auth/Login.js";
import { GetAccount } from "../Controller/Account/UserAccount/GetAccount.js";
import { UpdateTransaction } from "../Controller/Transaction/UpdateTransaction.js";
import { CreateKYC } from "../Controller/KYC/CreateKYC.js";
import { GetAllKYC } from "../Controller/KYC/GetAllKYC.js";
import { UpdateKYC } from "../Controller/KYC/UpdateKYC.js";
import { GetAccounts } from "../Controller/Account/UserAccount/GetAccounts.js";
import { UpdateAccount } from "../Controller/Account/UserAccount/UpdateAccount.js";
import { VerifyRecoveryCode } from "../Controller/Account/Password/VerifyCode.js";
import { sendEmail } from "../Lib/sendEmail.js";


export const routes = Router();

routes.post("/accounts/update/:id", UpdateAccount);
routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/account/:value", GetAccount);
routes.get("/accounts", GetAccounts);
routes.get("/email", sendEmail);

routes.post("/account/recover/update/:params", VerifyRecoveryCode);

routes.post("/transaction/debit", Debit);
routes.post("/transaction/credit", Credit);
routes.get("/transaction/:id", SingleTransaction);
routes.patch("/transaction/update/:id", UpdateTransaction);
routes.get("/transaction/user/:accountID", UserTransactions);
routes.get("/transaction", AllTransactions);

routes.post("/kyc/create/:id", CreateKYC);
routes.patch("/kyc/update/:id", UpdateKYC);
routes.get("/kyc", GetAllKYC);

routes.post("/transfer", ProcessTransfer);
routes.post("/transfer/update", UpdateTransfer);