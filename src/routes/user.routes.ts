import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from '../controllers/user.controller';
import { verifyJWT, upload } from '../middlewares/index';

export const userRoutes = (router: Router) => {
  router.route('/user/logout').get(verifyJWT, logoutUser);
  router.route('/user/refresh').get(refreshAccessToken);
  router.route('/user/login').post(loginUser);
  router.route('/user/register').post(
    upload.fields([
      {
        name: 'avatar',
        maxCount: 1,
      },
    ]),
    registerUser
  );
};
