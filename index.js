import express from 'express'
import dotenv from 'dotenv'
import { mongooseConnect } from './DB/mongoose.js'
import dns from 'dns'
dns.setServers(["8.8.8.8","8.8.4.4"])

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
mongooseConnect()

app.listen(port, () => { console.log("Server Start") })