// pages/api/login.js
import bcrypt from 'bcryptjs';
import { generateToken } from './utils/jwt';
import users from './data/users';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Find user
        const user = users.find(user => user.userName === username);
        if (!user) {
            return res.status(400).json({ result: false, response: 'Invalid username!' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ result: false, response: 'Invalid password!' });
        }

        // Generate a token
        const token = generateToken({ id: user.id, username: user.userName });

        res.status(200).json({ result: true, response: {user: user, token: token} });
    } else {
        res.status(405).json({ result: false, response: 'Method not allowed' });
    }
}
