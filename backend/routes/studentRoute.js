import { Router } from 'express';
import studentController from '../controllers/studentController.js';
const router = Router();

// GET all students
router.get('/', studentController.getAllStudents);

// GET a specific student by ID
router.get('/:id', studentController.getStudentById);

// CREATE a new student
router.post('/', studentController.createStudent);

// UPDATE a student by ID
router.put('/:id', studentController.updateStudent);

// DELETE a student by ID
router.delete('/:id', studentController.deleteStudent);

export default router