const express = require('express');
const Notes = require('../modules/Notes')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/featchUser')

router.get('/fetchalllnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})


router.post('/addNotes', fetchUser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "description must have 8 charecters").isLength({ min: 8 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})

router.put('/updateNotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the node to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) {
        return req.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id ,{$set:newNote},{new:true})
    res.json({note})
})

router.delete('/delateNotes/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user.id) {
        return req.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Notes has been delated",note:note})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})
module.exports = router