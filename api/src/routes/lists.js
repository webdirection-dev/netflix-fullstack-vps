const router = require('express').Router();
const verify = require('../verifyToken.js');
const List = require('../models/List');

//CREATE
router.post(
    '/',
    verify, // middleware
    async (req, res) => {
        if (req.user.isAdmin) {
            const newList = new List(req.body);

            try {
                const savedList = await newList.save();
                return res.status(201).json(savedList);
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json('Yoy are not allowed!');
        }
    }
);

//UPDATE
router.put(
    '/:id',
    verify, // middleware
    async (req, res) => {
        if (req.user.isAdmin) {
            try {
                const updatedList = await List.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );

                return res.status(200).json(updatedList);
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json('Yoy are not allowed!');
        }
    }
);

//DELETE
router.delete(
    '/:id',
    verify, // middleware
    async (req, res) => {
        if (req.user.isAdmin) {
            try {
                await List.findByIdAndDelete(req.params.id);
                return res.status(201).json('The list has been deleted.');
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json('Yoy are not allowed!');
        }
    }
);

//GET
router.get(
    '/',
    verify, // middleware
    async (req, res) => {
        let list = [];
        const typeQuery = req.query.type;
        const genreQuery = req.query.genre;

        try {
            if (typeQuery) {
                if (genreQuery) {
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery, genre: genreQuery } },
                    ]);
                } else
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery } },
                    ]);
            } else list = await List.aggregate([{ $sample: { size: 10 } }]);

            return res.status(201).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
);

module.exports = router;
