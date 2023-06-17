import { comparePass, hashPassword } from "../helpers/authHelper.js";
import Usermodel from "../models/Usermodel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, phone, password, address, question } = req.body;
        //  validations 
        if (!name) {
            return res.send({ error: 'Name is required!' });
        }
        if (!email) {
            return res.send({ error: 'Email is required!' });
        }
        if (!phone) {
            return res.send({ error: 'Phone No. is required!' });
        }
        if (!password) {
            return res.send({ error: 'Password is required!' });
        }
        if (!address) {
            return res.send({ error: 'Address is required!' });
        }

        const existingUser = await Usermodel.findOne({ email });
        // existing user 
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already register please Login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new Usermodel({ name, email, phone, address, password: hashedPassword, question }).save();
        res.status(201).send({
            success: true,
            message: 'User register succesfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}


//Login route
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid username or password'
            })
        }

        //check user
        const user = await Usermodel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePass(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //Token creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).send({
            success: true,
            message: "Login successfully!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

// Forgot Password

export const forgotController = async (req, res) => {
    try {
        const { email, question, newpassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!question) {
            res.status(400).send({ message: "Question is required" });
        }
        if (!newpassword) {
            res.status(400).send({ message: "New Password is required" });
        }

        // checking starts 

        const user = await Usermodel.findOne({ email });

        //validation 

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            })
        }

        const hashed = await hashPassword(newpassword)
        await Usermodel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password set succesfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong !",
            error
        })
    }

}

//test controller
export const testController = (req, res) => {
    res.send(`Protected Route`);
}