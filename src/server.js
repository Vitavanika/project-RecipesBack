import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.js';
import recipesRouter from './routers/recipes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json' with { type: 'json' };
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/recipes', recipesRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(notFoundHandler);
  app.use(errorHandler);

  // глобальний обробник помилок (важливо, щоб був в кінці)
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message || "Server error",
    data: null,
  });
});

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

