import { User } from '../models/index.js'
import cleanDB from './cleanDB.js'

const users = [
    {
        username: 'jess',
        email: 'jess@test.com'
    }
]

const seedData = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
}