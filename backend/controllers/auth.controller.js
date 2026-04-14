import { signupUser, loginUser } from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    await signupUser(req.body);
    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token } = await loginUser(req.body);
    res.cookie("token", token, {
      httpOnly: true,   // JS cannot access — XSS protection
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (should match with JWT expiry)
    });
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out" });
};