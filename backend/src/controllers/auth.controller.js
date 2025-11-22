import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const Organisation = db.Organisation;
const User = db.User;

export const register = async (req, res) => {
    const {orgName, name, email, password} = req.body;
    try {
        if (!orgName.trim() || !name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({error: "All fields are required"});
        }
        if (password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"});
        }
        const organisationExists = await Organisation.findOne({where: {name: orgName}});
        if (organisationExists) {
            return res.status(400).json({error: "Organisation already exists"});
        }
        const userExists = await User.findOne({where: {email}});
        if (userExists) {
            return res.status(400).json({error: "Email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const organisation = await Organisation.create({name: orgName});
        const user = await User.create({
            organisationId: organisation.id,
            name,
            email,
            passwordHash: hashedPassword
        });
        const token = jwt.sign({userId: user.id, orgId: organisation.id}, process.env.JWT_SECRET, {expiresIn: "8h"});
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true,
        });
        res.status(201).json({message: "Organisation registered successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Registration Failed"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({error: "Email and password are required" });
        }
        const user = await User.findOne({where: {email}});
        if(!user) return res.status(400).json({error: "Invalid credentials"});
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) return res.status(400).json({error: "Invalid credentials"});
        const token = jwt.sign({userId: user.id, orgId: user.organisationId}, process.env.JWT_SECRET, {expiresIn: '8h'});
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true,
        });
        res.json({message: "Login successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Login failed"});
    }
}