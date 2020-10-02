const Sauces = require('../models/Sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
                         const sauces = new Sauces({
                                                         name: req.body.title,
                                                         manufacturer: req.body.manufacturer,
                                                         description: req.body.description,
                                                         mainPepper: req.body.mainPepper,
                                                         imageUrl: req.body.sauce,
                                                         heat: req.body.heat,
                                                         userId: req.body.userId
                                                       });
                          sauces.save()
                              .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
                              .catch(error => res.status(400).json({ error }));
                      };
exports.modifySauce = (req, res, next) => {
                        const sauces = new Sauces({
                                _id: req.params.id,
                                name: req.body.title,
                                manufacturer: req.body.manufacturer,
                                description: req.body.description,
                                mainPepper: req.body.mainPepper,
                                imageUrl: req.body.sauce,
                                heat: req.body.heat,
                                userId: req.body.userId
                              });
                        Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                            .catch(error => res.status(400).json({ error }));
                    };
exports.deleteSauce = (req, res, next) => {
                          Sauces.deleteOne({ _id: req.params.id })
                              .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                              .catch(error => res.status(400).json({ error }));
                      };
exports.getOneSauce = (req, res, next) => {
                         Sauces.findOne({ _id: req.params.id })
                             .then(sauces => res.status(200).json(sauces))
                             .catch(error => res.status(404).json({ error }));
                     };
exports.getAllSauces =  (req, res, next) => {
                          Sauces.find({ _id: req.params.id })
                              .then(sauces => res.status(200).json(sauces))
                              .catch(error => res.status(404).json({ error }));
                      };

