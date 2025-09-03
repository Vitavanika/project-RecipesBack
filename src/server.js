import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import ingredientsRouter from './routers/ingredients.js';
import categoriesRouter from './routers/categories.js';
import recipesRouter from './routers/recipes.js';
import authRouter from './routers/auth.js';
import usersRouter from './routers/users.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json' with { type: 'json' };
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { welcomeMessage } from './controllers/welcome.js';
import ctrlWrapper from './utils/ctrlWrapper.js';

export const setupServer = () => {
  const app = express();
  const corsOptions = {
    origin: [
      'http://localhost:5173',
      'https://project-recipes-front.vercel.app',
      /https:\/\/project-recipes-front-[a-zA-Z0-9]+-vitavanikas-projects\.vercel\.app/,
    ],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());

  app.use('/api/ingredients', ingredientsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/recipes', recipesRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/', ctrlWrapper(welcomeMessage));
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
