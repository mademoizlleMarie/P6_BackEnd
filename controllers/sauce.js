const Sauces = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
    const sauceToCreate = JSON.parse(req.body.sauce);
    delete sauceToCreate._id;
    const saucesRequest = new Sauces({
        ...sauceToCreate,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    saucesRequest.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    const saucesToModify = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Sauces.updateOne({_id: req.params.id}, {...saucesToModify, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({
        _id: req.params.id
    }).then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(
            error => res.status(500).json({error})
        );
};

exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({
        _id: req.params.id
    }).then(
        sauce => {
            res.status(200).json(sauce);
        }
    ).catch(
        error => res.status(404).json({error: error})
    );
};

exports.getAllSauces =  (req, res, next) => {
    Sauces.find().then(
        sauces => {
            res.status(200).json(sauces);
        }
    ).catch(
        error => res.status(400).json({error: error})
    );
};

