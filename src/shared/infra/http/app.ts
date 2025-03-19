import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import '@shared/container'

import upload from '@config/upload'
import createConnection from '@shared/infra/typeorm'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../../../swagger.json'
import { AppError } from './errors/AppError'
import { routes } from './routes'

createConnection()

const app = express()

app.use(express.json())

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error: ${err.message}`
    })
})

export { app }
