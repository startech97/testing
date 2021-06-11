
const express = require('express')
const sequelize = require('./connect.js')
const searchRouter = require('./routes/searchRouter')
const path = require('path')
require("dotenv").config()
const app = express()

app.use(express.json())
app.use('/', searchRouter)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`...Server started...`))
    } catch (e) {
        console.log(e)
    }
}


start()