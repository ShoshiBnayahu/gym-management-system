import axios from 'axios';
import config from '../config/config';

export async function validateEmail(email: string): Promise<string> {
    email = email.trim();
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${config.apiKey}&email=${email}`);
        return `Email ${email} is ${response.data.deliverability}`;
    } catch (error) {
        return `Error validating email ${email}: ${error}`;
    }
}