import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            db_rentacar: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
        })
    )
}
