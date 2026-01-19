const Note = require("../models/Note")

exports.createNote =(req, res)=>{
    const note = new Note({
        userId: req.body.userId,
        content:req.body.content,
        characterCount:req.body.content.lenght
    });
    note.save((err)=>{
        if (err) {
            res.status(500).json({
                message:err
            })
        }
        res.status(201).json({
            message: 'Note created successfully'
        })
    })
}
exports.getNote =(req, res)=>{
    Note.countDocuments({userId:req.query.userId}, (err, count)=>{
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            count
        })
    })
}