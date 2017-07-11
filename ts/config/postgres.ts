export const pgOpt = {
    database: "postgres",
    username: "postgres",
    password: "123456",
    options: {
        dialect: "postgres",
        host: "192.168.0.103",
        port: 5533,
        timezone: "+8:00",
        pool: {
            maxConnections: 5,
            minConnections: 0,
            maxIdleTime: 100000
        }
    }
}
