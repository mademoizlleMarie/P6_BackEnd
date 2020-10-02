const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces.js');

mongoose.connect('mongodb+srv://Marie_Sylvestre:CapucinE1*@cluster0.q2lux.mongodb.net/<Marie_Sylvestre>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//const Utilisateur = require('./models/utilisateur');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);

/*app.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const utilisateur = new Utilisateur({
        ...req.body
    });
    utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.post('/api/auth/login', (req, res, next) => {
    delete req.body._id;
    const utilisateur = new Utilisateur({
        ...req.body
    });
    utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});
*/

module.exports = app;
