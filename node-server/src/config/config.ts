const config = {
    database: {
        url: process.env.DB_URL || 'mongodb://localhost/gym-management',
    },
    server: {
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
    },
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
    apiKey: process.env.API_KEY  ||  '9ccc7e6d6db24982ad8131b5aa6f0f76'
};

export default config;