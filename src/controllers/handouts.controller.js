const Handout = require("../models/Handout");

exports.createHandout = async(req, res)=>{
    try{
        const {title, content, subject, level} = req.body;

        const {file} = req.file.filename
        if(!title||!content ||subject|| !level|| !file ){
            res.status(400).json({
                success: false,
                message: "All field must be field"
            })

        }
        const handout = await Handout.create({title, content, subject, level, file})
        if(handout){
            res.status(201).json({
                success: true,
                message:"created successfully",
                handout
            })
        }
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error
        })
    }
}
exports.deleteHandout = async (req, res) => {
  try {
    await Handout.findByIdAndDelete(req.params.id);
    res.json({ message: "Handout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getHandouts = async (req, res) => {
  try {
    const handouts = await Handout.find().sort({ createdAt: -1 });
    res.json(handouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};