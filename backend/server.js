import express from "express";
import dotenv from "dotenv" ;
import cors from "cors"  ;
import { PrismaClient } from "@prisma/client";
import meetingRoutes from "./routes/meeting.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
import { appLimiter } from "./middleware/rateLimiter.middleware.js";

dotenv.config() ;

const app = express() ;
const prisma = new PrismaClient() ;

app.use(cors()) ;
app.use(express.json()) ;


app.use("/api/meetings", meetingRoutes) ;
app.use(errorHandler) ;
app.use("/api", appLimiter) ;

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, async()=>{
    try {
        await prisma.$connect() ;
        console.log("DB connected") ;
        console.log(`server running on port ${PORT}`) ;
    } catch (error) {
        console.log("DB connection failed", error) ;
    }
}) ;
