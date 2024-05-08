import express from "express";
import bodyParser from "body-parser";
import User from "../models/user.js";


const router = express.Router();
router.use(bodyParser.json());


router.post("/token",async (req,res)=>{
    const andriodId = req.body.androidId;
    const fcmToken = req.body.fcmToken;
    try {
        const user = new User({
            androidID: andriodId,
            fcmToken: fcmToken,
        });
        await user.save();
        return res.status(200).json({ id: user._id, msg: 'User Data Saved Successfully' }); 
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.patch("/token",async (req,res)=>{
    const andriodId = req.body.androidId;
    const fcmToken = req.body.fcmToken;
    try {
        const user = await User.findOne({ androidID: andriodId });
        if(user){
            await User.findByIdAndUpdate(user._id, { fcmToken: fcmToken });
            return res.status(200).json({ id: user._id, msg: 'User Data Updated Successfully' });
        }else{
            throw new Error("User Data Not Found");
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
});

export default router;