import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';


export const test = (req, res) => {
    res.json({
        message: 'User route is working'
    });
}

export const updateUser = async (req, res) => {
    if(req.user.id !== req.params.id) {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            {
                new: true,
            }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}