// Simulate this data coming from the Database
import users from './data/users'

export default function handler(req, res) {
    res.status(200).json({data: users})
}