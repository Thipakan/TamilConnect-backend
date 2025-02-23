const express = require('express');
const path = require('path');
const sequelize = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

// Servir les fichiers PDF depuis le dossier "cours"
app.use("/cours", express.static(path.join(__dirname, "cours")));

// Endpoint pour récupérer la liste des cours depuis la base de données avec Sequelize
app.get("/api/cours", async (req, res) => {
    try {
        const courses = await Course.findAll();  // Utilise Sequelize pour récupérer les cours
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des cours" });
    }
});

// Synchronisation de la base de données
sequelize.sync({ force: false })  // force: false pour éviter d'effacer les données existantes
    .then(() => {
        console.log('Base de données synchronisée');
        app.listen(5000, () => {
            console.log('Serveur démarré sur le port 5000');
        });
    })
    .catch(err => console.log(err));
