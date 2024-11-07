import { Transfer } from "../../Models/Transfer.js";
import { convertToDate} from '../../Lib/helper.js'
export const UpdateTransfer = async (req, res) => {
  let data;
  const admin = true;
  const {
    senderAccountName,
    senderAccountNumber,
    recipientAccountName,
    transactionDate,
    recipientAccountNumber,
    recipientBankName,
    description,
    amount,
    transferId,
  } = req.body;

  if (transferId)
    return res.status(400).json({ message: "Please input the transfer ID" });

  const transfer = Transfer.findOne(transferId);
  if (!transfer)
    return res.status(400).json({
      message: "Sorry the Transfer with the provided ID doesnt exist ",
    });

  if (!admin)
    return res.status(400).json({
      message: "Sorry you cant perform this action",
    });


};
