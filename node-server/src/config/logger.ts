import log4js from 'log4js';

log4js.configure({
    appenders: { 
        everything: { type: 'file', filename: './logs/all-the-logs' } 
    },
    categories: { 
        default: { appenders: ['everything'], level: 'debug' }
    }
});

const logger = log4js.getLogger();
export default logger;