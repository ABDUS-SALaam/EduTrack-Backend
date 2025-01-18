import { Router } from 'express';
import {
  addSubject,
  getSubjects,
  deleteSubjects,
} from '../controllers/subject.controller';
import { verifyJWT } from '../middlewares/index';

export const subjectRoutes = (router: Router) => {
  router.route('/subject').post(verifyJWT, addSubject);
  router.route('/subject').get(verifyJWT, getSubjects);
  router.route('/subject').delete(verifyJWT, deleteSubjects);
};
