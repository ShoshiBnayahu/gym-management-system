import axios from 'axios';
import config from '../config/config';

export async function validateEmail(email: string): Promise<boolean> {
    email = email.trim();
    try {
        const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${config.apiKey}&email=${email}`);
        return response.data.deliverability === 'DELIVERABLE';
    } catch (error) {
        console.error(`Error validating email ${email}: ${error}`);
        return false;
    }
}