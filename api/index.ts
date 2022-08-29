import {register, login} from "./src/routes/auth"
// import express from 'express'

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// const authRoute = require('./routes/auth')
const userRoute = require('./src/routes/users')
const movieRoute = require('./src/routes/movies')
const listRoute = require('./src/routes/lists')

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connection Success!'))
    .catch((err: Error) => console.error(err))

const app = express()
app.listen(8800, () => {
    console.log('Backend server is running!!!')
})

app.use(express.json())
// app.use('/api/auth', authRoute)
app.use('/api/auth', [register, login])
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)