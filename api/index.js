const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/users')
const movieRoute = require('./src/routes/movies')
const listRoute = require('./src/routes/lists')

//.ENV
dotenv.config()

//MONGODB
mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connection Success!'))
    .catch((err) => console.error(err))

//EXPRESS
app.listen(8800, () => {
    console.log('Backend server is running!!!')
})

app.use(cors())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
// }))

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)