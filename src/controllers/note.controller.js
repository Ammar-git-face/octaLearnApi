const Note = require("../models/Note")

exports.createNote =async(req, res)=>{
    const {title, content} = req.body;
    const note =await Note.create({title, content})
    res.status(201).json({message: 'Note created', note, user: req.user.userName})
}
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({user:req.user});
    res.status(200).json(notes);
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
