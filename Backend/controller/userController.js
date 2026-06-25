import User from "../model/userModel.js"


export const getCurrentUser =async(req,res)=>{
    try {
        let user =await User.findById(req.userId).select('-password')
        if(!user){
            return res.status(500).json({message:`usernot found`});
        }
        return res.status(200).json(user);
    } catch (error) {
     console.error("getCurrentUser Core Error Check:", error); 
     return res.status(500).json({ message: "getCurrentUser Error", error: error.message });
}
}


export const getAdmin = async (req, res) => {
  try {
    const adminEmail = req.adminEmail;

    if (!adminEmail) {
      return res.status(404).json({ 
        success: false,
        message: "Admin is not found" 
      });
    }

    return res.status(200).json({
      success: true,
      email: adminEmail,
      role: 'admin'
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

