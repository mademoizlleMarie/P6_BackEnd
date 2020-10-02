const mongoose = require('mongoose');

const UtilisateurSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

//UtilisateurSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
