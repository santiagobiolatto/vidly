const express = require('express');
const router = express.Router();
const validator = require('../validators/coursesValidations');

router.get('/api/genres', (req, res)=>{
    res.send(genres);
});

router.get('/api/genres/:id', (req, res)=>{
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(400).send('There is no genre with the given id');
        return;
    };
    res.send(genre);
});

router.post('/api/genres', (req, res)=>{
    const { error } = validator.validationGenres(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    res.send(genre);
});

router.put('/api/genres/:id', (req, res)=>{
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('There is no gender with the given ID');
        return;
    }
    const { error } = validator.validationGenres(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/api/genres/:id', (req, res)=>{
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(400).send('There is no gender with the given ID');
        return;
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;