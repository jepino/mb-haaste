import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from './errorHandler.js'
import routes from './routes.js'

const app = express()

/**
 * MB-DONE: What are middlewares in Express?
 * 
 * "Middleware functions are functions that have access to the request object (req), the response object (res), 
 *  and the next middleware function in the application’s request-response cycle." - https://expressjs.com/en/guide/using-middleware.html
 * 
 * Middlewares perform a specific task such as handling user authentication, writing response headers or fetching data from a database.
 * In an express app, they are chained to form pipelines that contain all the necessary logic to handle incoming requests. 
 */

// MB-DONE: What do these middlewares do?

// Parses the body of incoming requests with json payload (`Content-Type: application/json`)
// and populates the request object with a `body` field containing the parsed data.
app.use(express.json())

// Parses the body of incoming requests with url encoded form data (`Content-Type: x-www-form-urlencoded`)
// and populates the request object with a `body` field containing the parsed data.
app.use(express.urlencoded({ extended: true }))

// Sets response object headers that help secure the application.
app.use(helmet())
// Logs incoming HTTP requests to STDOUT in the predefined tiny format.
app.use(morgan('tiny'))
// Attaches route handling middlewares that fetch requested data and populate response objects with it.
app.use(routes)
// Handles errors from other middlewares.
app.use(errorHandler)

export default app
