import mongoose from'mongoose';

const FavorisSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,  // Exemple : le champ userId est de type ObjectID
        ref: 'Listing',  // Référence à un modèle d'utilisateur (le nom 'User' doit correspondre au modèle d'utilisateur que vous avez défini)
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Exemple : le champ userId est de type ObjectID
        ref: 'User',  // Référence à un modèle d'utilisateur (le nom 'User' doit correspondre au modèle d'utilisateur que vous avez défini)
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,  // Exemple : le champ customerId est de type ObjectID
        ref: 'Costumer',  // Référence à un modèle de client (le nom 'Customer' doit correspondre au modèle de client que vous avez défini)
        required: true,
    }
   
});

// Créer un modèle basé sur le schéma
const Favoris = mongoose.model('Favoris', FavorisSchema);

// Exporter le modèle pour l'utiliser ailleurs dans votre application
//module.exports = Favoris;
export default Favoris;
