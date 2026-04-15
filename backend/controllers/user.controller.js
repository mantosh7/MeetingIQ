import { getMeService } from "../services/user.service.js";

export const getMe = async (req, res, next) => {
  try {
    const user = await getMeService(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};