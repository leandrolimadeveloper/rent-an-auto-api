import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

if (process.env.ORM === 'prisma') {
    prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'dev' ? ['query'] : []
    })
}

export { prisma }
