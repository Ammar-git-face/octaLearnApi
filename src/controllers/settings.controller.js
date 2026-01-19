exports.updateUser = (req, res)=>{
    try{
        const {email, userName, profilePic} = req.body
        if(email, userName, profilePic){
            
        }
    }
    catch(error){
        res.status(400).json({
            message: error
        })
    }
}