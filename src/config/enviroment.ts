const dotenv = require("dotenv");

dotenv.config();

const configEnvironment = () => {
    const token = process.env.BOT_TOKEN;

    if (!token)
        throw new Error(`
        CONFIGURATION INCOMPLETE
Add the token of the @botfather give you and add to the environment BOT_TOKEN.
Example: BOT_TOKEN=523yeryh89r2849ncqcaxw
    `);

    const environment = process.env.NODE_ENV || '';

    return { token, environment };
}

export { configEnvironment }