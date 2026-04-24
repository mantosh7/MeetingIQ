import express from "express" ;
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMe, passwordChangeController } from "../controllers/user.controller.js";

const router = express.Router() ;

router.get("/me", authMiddleware, getMe);
router.post("/change-password", authMiddleware, passwordChangeController) ;

export default router ;