import jwt from 'jsonwebtoken';

export const genToken = async (userId) => {
    try {
        let token = await jwt.sign({id:userId},process.env.JWT ,{expiresIn:'7d'})
        return token
    } catch (error) {
        console.log("Token error");
    }
}


export const genToken1 = async (email) => {
    try {
        let token = await jwt.sign({email:email},process.env.JWT ,{expiresIn:'7d'})
        return token
    } catch (error) {
        console.log("Token error");
    }
}