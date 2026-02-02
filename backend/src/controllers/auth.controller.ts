import { Request, Response } from 'express'
import Blogger from '../models/blogger.model'
import { sendToken } from '../utils/generateToken'

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, adminCode } = req.body;

        console.log("Debug Register:", {
            sentAdminCode: adminCode,
            envSecret: process.env.ADMIN_SECRET_KEY,
            details: "Checking admin code match..."
        });

        const userExists = await Blogger.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Blogger already exists' });
        }

        let role = 'blogger';
        if (process.env.ADMIN_SECRET_KEY && adminCode === process.env.ADMIN_SECRET_KEY) {
            console.log("Admin Code Matched! Setting role to admin.");
            role = 'admin';
        } else {
            console.log("Admin Code did NOT match.");
        }

        const blogger = await Blogger.create({ name, email, password, role });


        const token = sendToken(res, String(blogger._id), blogger.role);

        return res.status(201).json({
            id: blogger._id,
            name: blogger.name,
            email: blogger.email,
            role: blogger.role,
            token
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const blogger = await Blogger.findOne({ email });

        if (!blogger) {
            return res.status(401).json({ message: 'invalid credentials' })
        }

        const isMatch = await (blogger as any).comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = sendToken(res, String(blogger._id), blogger.role);

        res.json({
            id: blogger._id,
            name: blogger.name,
            email: blogger.email,
            role: blogger.role,
            token
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (_req: Request, res: Response) => {

    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};