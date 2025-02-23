const Course = require('../models/Course');
const User = require('../models/User');

const addCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file.path; // Assure-toi de configurer multer pour l'upload
        const newCourse = await Course.create({
            title,
            description,
            file,
            teacherId: req.userId,  // Associe l'enseignant à ce cours
        });
        res.status(201).json({ message: "Cours ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du cours", error });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [{ model: User, as: 'teacher' }],
        });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des cours", error });
    }
};

module.exports = { addCourse, getCourses };
