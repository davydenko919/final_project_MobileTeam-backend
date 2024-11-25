import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import contactsRoutes from './routers/contacts.js';
import authRoutes from "./routers/auth.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { auth } from './middlewares/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {

const app = express();

app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());

app.use(cors());

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

app.use(cookieParser());

app.use('/contacts', auth, contactsRoutes);

app.use('/auth', authRoutes);

app.use('*', notFoundHandler);

app.use(errorHandler);

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);

});
};
