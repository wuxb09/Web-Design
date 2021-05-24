const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user: req.user._id})
    .populate('user').populate('dishes').
    then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id}, (err, favorite) => {
        if(favorite == null) {
            var tmp = {};
            tmp.user = req.user._id;
            tmp.dishes = req.body;
            Favorites.create(tmp)
            .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            req.body.forEach((dish) => {
                if(favorite.dishes.indexOf(dish._id) == -1) {
                    favorite.dishes.push(dish);
                }
            });
            favorite.save()
            .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/:dishID');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id}, (err, favorite) => {
        if(favorite == null) {
            var tmp = {};
            tmp.user = req.user._id;
            tmp.dishes = [req.params.dishId];
            Favorites.create(tmp)
            .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            if(favorite.dishes.indexOf(req.params.dishId) == -1) {
                favorite.dishes.push(req.params.dishId);
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Created ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
                .catch((err) => next(err));
            }
            else {
                res.statusCode = 403;
                res.end('POST operation find dishID already exists on /favorites/:dishID');
            }
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/:dishID');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id}, (err, favorite) => {
        if(favorite == null) {
            res.statusCode = 403;
            res.end('Delete operation cannot find document on /favorites/:dishID');
        } else {
            if(favorite.dishes.indexOf(req.params.dishId) != -1) {
                favorite.dishes = favorite.dishes.filter((dishID) => (!dishID.equals(req.params.dishId)));
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Created ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
                .catch((err) => next(err));
            } else {
                res.statusCode = 403;
                res.end('Delete operation cannot find dishID on /favorites/:dishID');
            }
        }
    });
});

module.exports = favoriteRouter;