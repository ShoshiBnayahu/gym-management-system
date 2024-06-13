import { UserModel } from "../models/userModel";

class User {
    username: string;
    password: string;
    email: string;
    role: 'admin' | 'user';

    constructor(username: string, password: string, email: string, role: 'admin' | 'user') {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    async save() {
        try {
            const user = new UserModel({
                username: this.username,
                password: this.password,
                email: this.email,
                role: this.role
            });
            await user.save();
            return user;
        } catch (error) {
            console.error('Failed to save user:', error);
            throw new Error('Failed to save user');
        }
    }
}

export default User;