import { sendJsonResponse } from "../../Lib/helper.js"
import { KYC } from "../../Models/KYC.js"

export const GetAllKYC = async (req, res) => {
    const allKYC = await KYC.find()
    return sendJsonResponse(res, 200, 'KYCs found', allKYC)
}