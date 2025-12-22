const isAdmin = (req, res, next)=>{
    try {
        if (!req.body) {
            return res.status(401).json({
                message:"Unauthorised: No user info"
            })
        }
        if (req.body.role !== 'admin') {
            return res.status(403).json({message:"Forbidden: You are not allow"})
       }
        next()
    } catch (error) {
        return res.status(500).json({message: "server error", error: error.message})
    }
}

module.exports = isAdmin