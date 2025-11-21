import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const Organisation = db.Organisation;
const User = db.User;

export const register = async (req, res) => {
    try {
        const {orgName, name, email, password} = req.body;
        const organisation = await Organisation.create({name: orgName});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            organisationId: organisation.id,
            name,
            email,
            passwordHash: hashedPassword
        });
        const token = jwt.sign({userId: user.id, orgId: organisation.id}, process.env.JWT_SECRET, {expiresIn: "8h"});
        res.status(201).json({message: "Organisation registered successfully", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Registration Failed"});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) return res.status(404).json({error: "User not found"});
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) return res.status(401).json({error: "Invalid password"});
        const token = jwt.sign({userId: user.id, orgId: user.organisationId}, process.env.JWT_SECRET, {expiresIn: '8h'});
        res.json({message: "Login successful", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Login failed"});
    }
}