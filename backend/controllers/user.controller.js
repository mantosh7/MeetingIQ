import { getMeService, passwordChangeService } from "../services/user.service.js";

export const getMe = async (req, res, next) => {
  try {
    const user = await getMeService(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const passwordChangeController = async (req, res, next) =>{
  try {
    await passwordChangeService(req.user.id, req.body) ;
    res.status(200).json({success: true, message: "Password changed successfully"}) ;
  } catch (error) {
    next(error) ;    
  }
}