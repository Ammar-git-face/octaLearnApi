const Note = require("../models/Note")
const logActivity = require("../utilis/activity.log");
exports.createNote =async(req, res)=>{
  const userId = req.user._id
    const {title, content} = req.body;
    const note =await Note.create({title, content, userId})
    await logActivity(userId, "AI", "Created note");
    res.status(201).json({message: 'Note created', note, user: req.user._id})
}
exports.getNotes = async (req, res) => {
  try {
    const user = req.user._id
    const notes = await Note.find({userId:user});
    res.status(200).json({
      success:true,
      notes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Count total characters in all notes of a user
exports.getCharacter = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });

    // Sum all characters from note content
    const totalCharacters = notes.reduce((sum, note) => {
      // Assuming your note content is stored in note.content
      return sum + (note.content ? note.content.length : 0);
    }, 0);

    res.status(200).json({ totalCharacters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
