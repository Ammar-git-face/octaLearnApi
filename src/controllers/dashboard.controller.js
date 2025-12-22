exports.dashboard =async (req, res)=>{
    try{
        res.status(200).json({
            user: req.user
        })
    }
    catch(error){
        res.status(400).json({
            error
        })
    }
}