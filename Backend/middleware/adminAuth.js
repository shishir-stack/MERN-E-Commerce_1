import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    
    const { adminToken } = req.cookies;

    if (!adminToken) {
      return res.status(401).json({ 
        success: false,
        message: "Not Authorized. Login Again" 
      });
    }

    const verifyToken = jwt.verify(adminToken, process.env.JWT);

    if (!verifyToken) {
      return res.status(401).json({ 
        success: false,
        message: "Not Authorized. Login Again, Invalid token" 
      });
    }

    
    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ 
        success: false,
        message: "Access Denied. You are not an Admin!" 
      });
    }

    req.adminEmail = verifyToken.email;
    next();

  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(401).json({ 
      success: false,
      message: "Not Authorized. Login Again, Invalid token" 
    });
  }
};

export default adminAuth;




// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res.status(401).json({ 
//         message: "Not Authorized. Login Again" 
//       });
//     }

//     const verifyToken = jwt.verify(token, process.env.JWT);

//     if (!verifyToken) {
//       return res.status(401).json({ 
//         message: "Not Authorized. Login Again, Invalid token" 
//       });
//     }

//     if (verifyToken.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ 
//         message: "Access Denied. You are not an Admin!" 
//       });
//     }

   
//     req.adminEmail = verifyToken.email;
//     next();

//   } catch (error) {
//     return res.status(401).json({ 
//       message: "Not Authorized. Login Again, Invalid token" 
//     });
//   }
// };

// export default adminAuth;