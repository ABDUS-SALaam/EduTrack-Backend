import { Router } from 'express';
import {
  createAssessment,
  getAllAssessments,
  deleteAssessment,
} from '../controllers/assessment.controller';
import { verifyJWT } from '../middlewares/index';

export const assessmentRoutes = (router: Router) => {
  router.route('/assessment').post(verifyJWT, createAssessment);
  router.route('/assessment').get(verifyJWT, getAllAssessments);
  router.route('/assessment').delete(verifyJWT, deleteAssessment);
};

// Todo - add patch request
