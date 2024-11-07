import express from 'express'
import dotenv from 'dotenv'
import { routes } from './Routes/Routes.js'
import {ConnectToDatabase} from './Config/Config.js'
import cors from 'cors'
import { sendEmail } from './Lib/sendEmail.js'
dotenv.config()


const app = express()
const port = process.env.PORT || 4000

ConnectToDatabase()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(routes)
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
})
