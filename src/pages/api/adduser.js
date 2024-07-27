
import bcrypt from 'bcryptjs';
import { generateToken } from './utils/jwt';
import users from './data/users'

export default async function  handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, userName } = req.body;

        // Let check to see if username already is in the data array
        const existingUser = users.find(user => user.userName === userName);
        if (existingUser) {
            return res.status(400).json({ result: false, response: 'User already exists' });
        }

        // Use their username as password and hash it
        const hashedPassword = await bcrypt.hash('1234', 10);

        const newUser = {
            id: users.length + 1,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashedPassword,
            role: 'user'
        };

        users.unshift(newUser);

        res.status(200).json({ result: true, response: users });

    } else {

        res.status(405).json({ message: 'Method not allowed' });
    }
}
