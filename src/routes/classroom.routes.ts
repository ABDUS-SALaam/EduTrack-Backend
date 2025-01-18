import { Router } from 'express';
import { verifyJWT } from '../middlewares/index';
import {
  createClassroom,
  getCreatedClassrooms,
  addUserToClassroom,
} from '../controllers/classroom.controller';
export const classroomRoutes = (router: Router) => {
  router.route('/classroom').post(verifyJWT, createClassroom);
  router.route('/classroom').get(verifyJWT, getCreatedClassrooms);
  router.route('/classroom/add-user').post(verifyJWT, addUserToClassroom);
};
