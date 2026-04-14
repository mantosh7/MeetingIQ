import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error("User detail missing");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { message: "Signup successful" };
};


export const loginUser = async ({ email, password }) => {
    if (!email || !password) throw new Error("login credentials missing");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return { token } ;
};

