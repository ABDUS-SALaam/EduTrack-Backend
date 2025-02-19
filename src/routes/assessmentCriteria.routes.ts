import { Router } from 'express';
import { verifyJWT } from '../middlewares/index';
import {
  addAssessmentCriteria,
  getAssessmentCriteria,
} from '../controllers/assessmentCriteria.controller';

export const assessmentCriteriaRoutes = (router: Router) => {
  router.route('/assessment-criteria').post(verifyJWT, addAssessmentCriteria);
  router.route('/assessment-criteria').get(verifyJWT, getAssessmentCriteria);
};

export default assessmentCriteriaRoutes;
