import validator from "validator";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { genToken, genToken1 } from "../config/token.js";



export const registration = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:'User already Exist'})
        }
        if(!validator.isEmail(email)){
             return res.status(400).json({message:'Provide Valid Email'})
        }
        if(password.length <8){
             return res.status(400).json({message:'Enter 8 digit password'})
        }
        let hash= await bcrypt.hash(password,10)

        const user= await User.create({name,email,password:hash})

        let token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json(user);
    } catch (error) {
        console.log("Registation Error");
        return res.status(500).json({message:`Registration Error ${error}`});
    }
}

export const login = async (req,res) => {
    try {
        let {email,password}= req.body
        let user = await User.findOne({email})
         if(!user){
            return res.status(404).json({message:'User not Exist'})
        }
        let isMatch= await bcrypt.compare(password,user.password)
          if(!isMatch){
            return res.status(404).json({message:'Incorrect Password'})
        }

        let token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json({message:'Login Success'});
    } catch (error) {
         console.log("Login Error");
        return res.status(500).json({message:`Login Error ${error}`});
    }
}

export const logout =async(req,res)=>{
    try {
        res.clearCookie("token")
             return res.status(200).json({message:'LogOut Success'});
    } catch (error) {
         console.log("Logout Error");
        return res.status(500).json({message:`Logout Error ${error}`});
    }
}

export const googleLogin =async(req,res)=>{
    try {
        let {name,email}=req.body
        let user = await User.findOne({email})
        if (!user)
        {
            user = await User.create({
                name,
                email,
            });
        }
       

        let token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
        })

        return res.status(200).json(user);
    } catch (error) {
         console.log("googleLogin Error");
        return res.status(500).json({message:`googleLogin Error ${error.message}`});
    }
}



// export const adminLogin = async (req,res) => {
//     try {
//         let {email,password}= req.body
//        if(email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWARD)
//        {
//         let token = await genToken1(email);
//         res.cookie("token",token,{
//             httpOnly:true,
//             secure:false,
//             sameSite:"lax",
//             maxAge: 7*24*60*60*1000,
//         }
//        )

//         return res.status(200).json({message:'Login Success'});
//     }
//         return res.status(400).json({message:'invalid credantials'});
//     } catch (error) {
//          console.log("Admin Error");
//         return res.status(500).json({message:`Admin Error ${error}`});
//     }
// }


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

   
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWARD) {
            
            let token = await genToken1(email);

            res.cookie("adminToken", token, {
                httpOnly: true,
            
                secure: process.env.NODE_ENV === "production", 
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });

            return res.status(200).json({ success: true, message: 'Login Success' });
        }

        return res.status(400).json({ success: false, message: 'invalid credentials' });

    } catch (error) {
        console.log("Admin Error:", error);
        return res.status(500).json({ success: false, message: `Admin Error ${error.message}` });
    }
}