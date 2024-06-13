const config = {
    database: {
        url: process.env.DB_URL || 'mongodb://localhost/gym-management',
        // options: {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
    },
    server: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
    },
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
    // ,
    // logging: {
    //     level: process.env.LOGGING_LEVEL || 'debug',
    //     format: process.env.LOGGING_FORMAT || 'json'
    // }
    // Add more settings as needed
};

export default config;