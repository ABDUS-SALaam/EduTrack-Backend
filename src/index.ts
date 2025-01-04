import dotenv from 'dotenv';
import path from 'path';
import dbConnect from './db/index';
import app from './app';

dotenv.config({
  path: path.resolve(
    __dirname,
    `../.env.${process.env.NODE_ENV || 'development'}`
  ),
});

const init = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
};

init();
