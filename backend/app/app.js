import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from './errorHandler.js'
import routes from './routes.js'

const app = express()

// MB-TODO: What are middlewares in Express?
// MB-TODO: What these middlewares do?
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('tiny'))

app.use(routes)

app.use(errorHandler)

export default app
