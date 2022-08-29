const router = require('express').Router();

const verify = require('../verifyToken.js');
const Movie = require('../models/Movie');

//CREATE
router.post(
    '/',
    verify, // middleware
    async (req, res) => {
        if (req.user.isAdmin) {
            const newMovie = new Movie(req.body);

            try {
                const savedMovie = await newMovie.save();
                return res.status(201).json(savedMovie);
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
                const updatedMovie = await Movie.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );

                return res.status(200).json(updatedMovie);
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
                await Movie.findByIdAndDelete(req.params.id);
                return res.status(200).json('The movies has been deleted...');
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
    '/find/:id',
    verify, // middleware
    async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            return res.status(200).json(movie);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
);

//GET ALL MOVIES
router.get(
    '/',
    verify, // middleware
    async (req, res) => {
        if (req.user) {
            try {
                const movies = await Movie.find();
                return res.status(200).json(movies.reverse());
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json('Yoy are not allowed!');
        }
    }
);

//GET RANDOM MOVIE
router.get(
    '/random',
    verify, // middleware
    async (req, res) => {
        const type = req.query.type; // for example /random?type=series
        let movie = '';

        try {
            if (type === 'series') {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } }, //колличество найденных элементов
                ]);
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } }, //колличество найденных элементов
                ]);
            }

            return res.status(200).json(movie);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
);

module.exports = router;