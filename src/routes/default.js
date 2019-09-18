const express = require('express')
const router = express.Router()
const Note = require('../models/note-model')

// INDEX

router.get('/', (req, res) => {
    Note.find({}, (err, notes) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.render('index', {notes: notes});
        }
    }).sort({
        _id: -1
    })
})

// NOTE

router.get('/:id', (req, res) => {
    Note.findById(req.params.id, (err, note) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.render('note', {note: note});
        }
    })
})


// TEST

router.get('/test', (req, res) => {
    Relation.find({}, (req, relations) => {
        res.send( relations )
    })
})


// CREATE NOTE

router.post('/', (req, res) => {
    const note = new Note({
        title: req.body.title,
        text: req.body.text,
    })
    note.save((err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.redirect('/');
        }
    })
})

// DELETE NOTE

router.post('/:id', (req, res) => {
    Note.remove({
        _id: req.params.id
    }, err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.redirect('/');
        }
    })
})

// 404

router.all("*", function (req, res) {
    return res.status(404).render('404')
});

module.exports = router;
