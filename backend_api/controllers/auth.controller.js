import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // console.log(username, email, password);

        if(!username || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExists = await User.findOne({ username });

        if(userExists){
            return res.status(400).json({message: 'Username is already taken'});
        } 

        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, avatar:`https://avatar.iran.liara.run/username?username=${username}` });
        
        // console.log("User signed up", newUser)

        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(email, password);

        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExists = await User.findOne({ email });

        if(!userExists){
            return res.status(400).json({message: 'User does not exist'});
        } 

        const validPassword = await bcryptjs.compare(password, userExists.password);

        if(!validPassword){
            return res.status(400).json({message: 'Incorrect password'});
        }

        // console.log("User logged in", userExists);
        
        const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);
        return res.cookie('nextestate_token', token, { httpOnly: true }).status(200).json(userExists);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
}


export const logout = (req, res) => {
    try {
        res.clearCookie('nextestate_token');
        res.status(200).json({});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}