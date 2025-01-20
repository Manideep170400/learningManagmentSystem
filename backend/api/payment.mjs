import {  Router } from "express";
import payment from "../models/payment.models.mjs"


const router = Router();
router.post("/payment",async (req,res)=> {
    console.log("reqBody",req.body)
    let sessionresponse = null
    try {
       
         sessionresponse = await payment.createSession(req.body)
        res.status(200).json({
            message : 'payment is created',
            session : sessionresponse
        })
    } catch (error) {
        console.error('error',error);
        res.status(500).json({
            message : "payment is not  crreated",
            session : sessionresponse
        })
    }
   
})

export default router