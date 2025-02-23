const express = require('express');
const { addCourse, getCourses } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/add', authMiddleware, upload.single('file'), addCourse); // Formulaire d'ajout de cours
router.get('/', authMiddleware, getCourses); // Récupérer tous les cours

module.exports = router;
