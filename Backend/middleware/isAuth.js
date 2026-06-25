
import jwt from "jsonwebtoken";

const isAuth= async(req,res,next)=>{
    try {
        let token =req.cookies.token;
        if(!token){
            return res.status(400).json({message:`user not token`});
        }
        let verifyToken = jwt.verify(token,process.env.JWT)
        if(!verifyToken){
            return res.status(400).json({message:`Not valid token`});
        }
        req.userId= verifyToken.id;
        next()

    }catch (error) {
     console.error("isAuth Core Error Check:", error); 
     return res.status(500).json({ message: "isAuth Error", error: error.message });
}
}

export default isAuth