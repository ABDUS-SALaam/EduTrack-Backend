import express, { Application } from 'express';

const app: Application = express();
console.log('environment: ', process.env.NODE_ENV);

export default app;
